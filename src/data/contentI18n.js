// Deep-content translation layer.
//
// UI_TEXT (src/data/i18n.js) covers short chrome strings (nav labels,
// buttons, alerts) and is enforced 100%-complete by `npm run i18n:check`.
// This file covers long-form LESSON CONTENT — Constitution articles,
// landmark case write-ups, quiz questions, historical events — which lives
// in per-language dictionaries under src/data/translations/, keyed by the
// same `id` each item already has in polityData.js / constitutionContent.js.
//
// A language with no entry for a given id silently falls back to the
// English source (never a blank screen). As each translation batch lands,
// its ids get added to the relevant dictionary — see
// src/data/translations/README.md for the batch plan and status.

import hi from './translations/hi';
import kn from './translations/kn';
import ta from './translations/ta';
import te from './translations/te';
import bn from './translations/bn';
import mr from './translations/mr';

const DICTS = { hi, kn, ta, te, bn, mr };

const lookup = (kind, id, language) => DICTS[language]?.[kind]?.[id] || null;

// A Constitution/DPSP/Parliament "concept" — { id, title, content, examTips, keywords }.
export const translateConcept = (concept, language) => {
  if (!concept) return concept;
  const t = lookup('concepts', concept.id, language);
  return t ? { ...concept, ...t } : concept;
};

// A landmark case — { id, significance, facts, judgment, impact }. Case
// names (e.g. "Kesavananda Bharati v. State of Kerala (1973)") stay in
// English/Roman script across every language, matching how they're cited in
// Indian legal and exam materials generally, so `title` is not translated.
export const translateCase = (caseItem, language) => {
  if (!caseItem) return caseItem;
  const t = lookup('cases', caseItem.id, language);
  return t ? { ...caseItem, ...t } : caseItem;
};

// A quiz question — { id, question, options, explanation }.
export const translateQuestion = (question, language) => {
  if (!question) return question;
  const t = lookup('questions', question.id, language);
  return t ? { ...question, ...t } : question;
};

// A historical event — { id, title, description, significance, location }.
// Mirrors localizeEvent() in i18n.js (which reads an inline
// `event.translations` map already present on a couple of events); this
// version reads the same per-language dictionaries as everything else here.
export const translateEvent = (event, language) => {
  if (!event) return event;
  const t = lookup('events', event.id, language);
  if (!t) return event;
  return {
    ...event,
    ...t,
    location: t.locationName ? { ...event.location, name: t.locationName } : event.location,
  };
};

// The Preamble's highlighted-span content (constitutionContent.js) has its
// own shape: an array of { text, highlight? } run segments, because the
// screen renders it with certain phrases bolded. Falls back to the English
// span array.
export const translatePreambleSpans = (englishSpans, language) => {
  const t = lookup('preambleSpans', 'preamble', language);
  return t || englishSpans;
};

// True if `id` has a real translation for `language` (as opposed to an
// English fallback) — useful for screens that want to show a "translated"
// badge or hide a language-not-ready notice.
export const hasTranslation = (kind, id, language) => !!lookup(kind, id, language);

// A constitutionContent.js article — { id, title, description, content, keyPoints? }.
// Falls back to the English source article for any field not present in the
// translation (e.g. an article without a `description` in the dictionary).
export const translateArticle = (article, language) => {
  if (!article) return article;
  const t = lookup('articles', article.id, language);
  return t ? { ...article, ...t } : article;
};

// A ConstitutionScreen 'Part' tile — { id, title, description, articles }
// (the 'articles' field is a short label like 'Articles 1-4', not the
// article list itself). Covers the 6 Preamble/Part I-IVA cards.
export const translateSection = (section, language) => {
  if (!section) return section;
  const t = lookup('sections', section.id, language);
  return t ? { ...section, ...t } : section;
};

// An INDIAN_CONSTITUTION category's own title (e.g. 'Fundamental Rights'),
// looked up by the category's object key in polityData.js (not an id field
// — categories are keyed by their position in INDIAN_CONSTITUTION).
export const translateCategoryTitle = (categoryKey, fallbackTitle, language) => {
  const t = lookup('categories', categoryKey, language);
  return t?.title || fallbackTitle;
};

// An INDIAN_CONSTITUTION topic — { id, title, description, concepts }.
// Preserves `concepts` (and any other fields) untouched via the spread;
// only title/description are ever present in the translation dictionary.
export const translateTopic = (topic, language) => {
  if (!topic) return topic;
  const t = lookup('topics', topic.id, language);
  return t ? { ...topic, ...t } : topic;
};

// The short list-card summary shown under an 'important article' entry on
// ConstitutionScreen (distinct from the full article content, which is
// translated separately via translateConcept/translateArticle).
export const translateArticleSummary = (id, fallbackDescription, language) => {
  const t = lookup('articleSummaries', id, language);
  return t?.description || fallbackDescription;
};

// A constitutional amendment — { id, title, description }.
export const translateAmendment = (amendment, language) => {
  if (!amendment) return amendment;
  const t = lookup('amendments', amendment.id, language);
  return t ? { ...amendment, ...t } : amendment;
};

// A Government-screen topic — { id, title, subtitle, content }.
export const translateGovernmentTopic = (topic, language) => {
  if (!topic) return topic;
  const t = lookup('government', topic.id, language);
  return t ? { ...topic, ...t } : topic;
};

// A Judiciary-screen topic — { id, title, subtitle, content }.
export const translateJudiciaryTopic = (topic, language) => {
  if (!topic) return topic;
  const t = lookup('judiciary', topic.id, language);
  return t ? { ...topic, ...t } : topic;
};

// A Judiciary-screen landmark case — { id, description, impact }.
// Case titles (e.g. "Kesavananda Bharati (1973)") stay English, matching
// how they are cited in Indian legal and exam materials.
export const translateLandmarkCase = (caseItem, language) => {
  if (!caseItem) return caseItem;
  const t = lookup('judiciaryLandmarkCases', caseItem.id, language);
  return t ? { ...caseItem, ...t } : caseItem;
};
