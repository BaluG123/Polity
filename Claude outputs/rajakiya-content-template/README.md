# Rajakiya Content Repository

This repo powers the "Rajakiya" news feed inside the Rajakiya app.

## Setup (one-time)

1. Create a **PUBLIC** GitHub repo named `rajakiya-content` (or any name; if you change it, also change `GITHUB_REPO` in the app's `src/config/newsConfig.js`).
2. Copy this `content/` folder and this `images/` folder into it.
3. In the app, open `src/config/newsConfig.js` and set `GITHUB_OWNER` to your GitHub username.

That's it — the app will start fetching from `https://raw.githubusercontent.com/<you>/rajakiya-content/main/content/…`.

## Folder layout

```
content/
  meta.json        ← version marker (bump when you publish new content)
  en.json          ← English articles
  hi.json          ← Hindi articles
  kn.json, ta.json, te.json, bn.json, mr.json
images/
  parliament-01.jpg, sc-01.jpg, …   ← your AI-generated images
```

## Article format

Every language file is `{ "version": <int>, "articles": [ … ] }`. Each article is:

```json
{
  "id": "2026-09-05-parliament-monsoon-session",
  "category": "parliament",
  "date": "2026-09-05",
  "image": "https://raw.githubusercontent.com/<you>/rajakiya-content/main/images/parliament-01.jpg",
  "title": "Headline in plain language",
  "summary": "3–5 sentences of context. This is what people read in the feed."
}
```

**Rules**

- `id` — a unique, stable slug. The app uses this as the FlatList key, so once an article is published, don't change its id.
- `category` — one of `parliament`, `judiciary`, `election`, `policy`, `amendment`, `general`. Anything else falls back to `general` (globe icon).
- `date` — ISO date (`YYYY-MM-DD`). The app formats it for the reader's language.
- `image` — full HTTPS URL. Put the file in `images/` and use the raw.githubusercontent.com URL. Keep images under ~500 KB — big files kill scroll performance.
- `title` — one line, ~60 chars max. The card allows 3 lines.
- `summary` — 3–5 sentences (~50–100 words). No markdown, no HTML — plain text only.

## Publishing new content — the loop

1. Add or edit articles in one or more language JSONs.
2. Bump the `version` number inside every language file you touched (and in `meta.json`).
3. `git add . && git commit -m "…" && git push`.
4. Next time the app opens, `NewsService.checkForUpdates()` sees the new `meta.json` version and fires a local push notification. Existing readers see the new articles when they open the Rajakiya tab.

## Translation strategy

- Start English-only. Missing language files fall back to English automatically (the app handles the 404 gracefully).
- When you translate an article to Hindi, add a corresponding entry with the **same `id`** to `hi.json`.
- Use the same `id` across languages so a reader who switches language keeps reading the same article.

## AI image tips

- Aspect ratio: 3:2 (portrait mode → landscape crop). The card shows the top 42% of the screen so avoid text at the very bottom.
- Style: consistent across articles for a coherent feed. A photorealistic Indian-context look works well.
- Never depict a real politician in a misleading scene. Prefer symbolic imagery: the Parliament building, a courtroom, a ballot box, a document, a map.

## Cache behaviour (for reference)

- The app caches the whole language JSON in AsyncStorage under `rajakiya.news.<lang>`.
- On network failure, the cached version is shown with a `fromCache: true` flag so you know it's offline data.
- `meta.json` is checked once per app launch (from `AppNavigator.setupApp`).
