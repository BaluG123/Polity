# Content translation plan

This folder holds Rajakiya's deep lesson-content translations — Constitution
articles, landmark case write-ups, historical events, quiz questions — kept
separate from `../i18n.js` because it's a much bigger, denser body of text
that needs its own batch plan and its own completeness check.

## Why this is separate from `i18n.js`

`../i18n.js` (`UI_TEXT`) covers **chrome** — nav labels, buttons, alerts —
and is 100% translated across all 7 languages, enforced by
`npm run i18n:check`. Content is a different job: thousands of lines of
dense constitutional/legal text per language, so it gets its own pass and
its own completeness check (`npm run content-i18n:check`) rather than being
crammed into `i18n.js`.

## How it's shaped

Each non-English language has one file here (`hi.js`, `kn.js`, `ta.js`,
`te.js`, `bn.js`, `mr.js` — English needs no file, it *is* the source data),
a flat dictionary keyed by the same `id` the item already carries in
`../polityData.js` / `../constitutionContent.js`:

```js
// src/data/translations/hi.js
export default {
  concepts:      { article_14: { title, content, examTips }, ... },
  cases:         { kesavananda_bharati: { significance, facts, judgment, impact }, ... },
  preambleSpans: { preamble: [ { text, highlight? }, ... ] },
  articles:      { art14: { title, description?, content, keyPoints? }, ... },
  // future batches add `events` and `questions` here too
};
```

`../contentI18n.js` reads these dictionaries and exposes one lookup helper
per kind — `translateConcept`, `translateCase`, `translateArticle`,
`translatePreambleSpans`, `translateEvent` (events, once translated),
`translateQuestion` (quiz, once translated) — each falling back to the
English source object untouched when a translation is missing, so a screen
never renders a blank field.

Case titles (e.g. "Kesavananda Bharati v. State of Kerala (1973)") stay in
English/Roman script in every language, matching standard Indian legal and
exam citation practice — only the surrounding fields are translated.

## Batch status

1. **Constitution — done.** All 17 `INDIAN_CONSTITUTION` concepts (Preamble,
   Articles 14-22, President, DPSP, Parliament), both `LANDMARK_CASES`
   entries, the Preamble's 13-span highlight array, and all 16
   `constitutionContent.js` articles (Parts I-IVA) are translated into
   Hindi, Kannada, Tamil, Telugu, Bengali and Marathi, wired into
   `ConstitutionScreen`, `ConceptDetailScreen`, `TopicDetailScreen`,
   `CaseStudiesScreen` and `CaseStudyDetailScreen`.
2. **Historical events** — not started (45 of 46 `HISTORICAL_EVENTS` still
   English-only; one already had an inline `translations` map from before
   this system existed).
3. **Quiz questions** — not started (`QUIZ_QUESTIONS`, 114 items). Needs
   extra care: a mistranslated option changes a correct answer. The Quiz tab
   and `QuizScreen.js` have been removed from the app for now (data in
   `polityData.js` is untouched) so non-English users never hit English-only
   quiz content; re-add the screen and its nav entry once this batch lands.
4. **Government & Judiciary screens** — `GovernmentScreen.js` and
   `JudiciaryScreen.js` still hold their lesson content as large inline
   arrays with no `id`-keyed data file backing them; that needs extracting
   into a real data file (mirroring `constitutionContent.js`) before it can
   be translated at all.

## Rule: no partial languages

Every batch must land for all 6 non-English languages at once, or not at
all. A screen translated into 4 languages and English-only in the other 2
is worse than staying English-first everywhere, because it reads as a bug
rather than a roadmap. `npm run content-i18n:check` enforces this the same
way `i18n:check` enforces it for chrome strings.

## Verifying a batch when it lands

Run `npm run content-i18n:check` — it walks every dictionary in this folder
and asserts, for each kind (`concepts`, `cases`, `articles`,
`preambleSpans`), that every language has an entry for every id the English
source data defines, with no empty fields.
