import AsyncStorage from '@react-native-async-storage/async-storage';
import { contentUrl, metaUrl } from '../config/newsConfig';

const CACHE   = 'rajakiya.news';      // per-language article cache
const VER_KEY = 'rajakiya.news.ver';   // last-seen content version

/**
 * Thin service that fetches multilingual news articles from a public
 * GitHub repo, caches them locally for offline use, and exposes a
 * lightweight version-check so the app can notify when new content
 * lands.
 *
 * Content layout expected in the repo:
 *   content/meta.json        — { "version": <int> }
 *   content/<lang>.json      — { "version": <int>, "articles": [...] }
 */
class NewsService {
  /* ── public ──────────────────────────────────────────── */

  /**
   * Fetch articles for `language`.
   * • On success → caches + returns { articles, version, fromCache: false }
   * • On 404 for a non-English language → falls back to English
   * • On network failure → returns cached data (fromCache: true)
   */
  static async fetchArticles(language = 'en') {
    const key = `${CACHE}.${language}`;

    try {
      const res = await fetch(contentUrl(language), {
        headers: { 'Cache-Control': 'no-cache', Pragma: 'no-cache' },
      });

      if (!res.ok) {
        // language file missing → try English as fallback
        if (language !== 'en') return this.fetchArticles('en');
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();
      await AsyncStorage.setItem(key, JSON.stringify(data));
      if (data.version) {
        await AsyncStorage.setItem(VER_KEY, String(data.version));
      }

      return { articles: data.articles || [], version: data.version || 0, fromCache: false };
    } catch (_) {
      return this._cached(key);
    }
  }

  /**
   * Quick version check against meta.json.
   * Returns { hasUpdate: true, newVersion } when the remote version
   * is higher than the locally stored one; { hasUpdate: false } otherwise.
   * Never throws — network failures are swallowed.
   */
  static async checkForUpdates() {
    try {
      const res = await fetch(metaUrl(), {
        headers: { 'Cache-Control': 'no-cache', Pragma: 'no-cache' },
      });
      if (!res.ok) return { hasUpdate: false };

      const { version } = await res.json();
      const stored = parseInt((await AsyncStorage.getItem(VER_KEY)) || '0', 10);

      if (version > stored) return { hasUpdate: true, newVersion: version };
      return { hasUpdate: false };
    } catch (_) {
      return { hasUpdate: false };
    }
  }

  /* ── private ─────────────────────────────────────────── */

  static async _cached(key) {
    try {
      const raw = await AsyncStorage.getItem(key);
      if (raw) {
        const d = JSON.parse(raw);
        return { articles: d.articles || [], version: d.version || 0, fromCache: true };
      }
    } catch (_) { /* corrupt cache — treat as empty */ }
    return { articles: [], version: 0, fromCache: true };
  }
}

export default NewsService;
