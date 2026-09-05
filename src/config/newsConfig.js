// ═══════════════════════════════════════════════════════════════
// RAJAKIYA — NEWS CONTENT CONFIGURATION
// ═══════════════════════════════════════════════════════════════
//
// This file connects the app to your public GitHub content repo.
//
// SETUP (one-time):
//   1. Create a PUBLIC GitHub repo (e.g. "rajakiya-content")
//   2. Push the content/ folder with meta.json + language JSONs
//   3. Replace GITHUB_OWNER below with your GitHub username
//   4. (Optional) change GITHUB_REPO if you used a different name
//
// See the sample files in the repo template for the exact format.
// ═══════════════════════════════════════════════════════════════

export const NEWS_CONFIG = {
  /** Your GitHub username (e.g. 'balugoudi') */
  GITHUB_OWNER: 'BaluG123',

  /** Repository name that holds the content/ folder */
  GITHUB_REPO: 'rajakiya-content',

  /** Branch to fetch from */
  BRANCH: 'main',
};

/** Raw-content base URL — built once from the config above. */
export const RAW_BASE =
  `https://raw.githubusercontent.com/${NEWS_CONFIG.GITHUB_OWNER}/${NEWS_CONFIG.GITHUB_REPO}/${NEWS_CONFIG.BRANCH}`;

/** Convenience helpers */
export const contentUrl = (lang) => `${RAW_BASE}/content/${lang}.json`;
export const metaUrl    = ()     => `${RAW_BASE}/content/meta.json`;
