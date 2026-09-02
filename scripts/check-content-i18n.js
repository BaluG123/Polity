#!/usr/bin/env node
/**
 * Content-translation-completeness gate (the `../translations/` dictionaries).
 *
 * Companion to check-i18n.js, but for deep lesson content instead of chrome
 * strings. Fails (exit 1) if, for any kind this script knows how to check
 * (concepts / cases / articles / preambleSpans), a non-English language is
 * missing an id that the English source data defines, or has an entry with
 * an empty required field. Run this after adding or extending a batch under
 * src/data/translations/, and see that folder's README.md for the batch
 * plan and the "no partial languages" rule this enforces.
 *
 * Usage: npm run content-i18n:check
 */

const fs = require('fs');
const path = require('path');
const Module = require('module');

const ROOT = path.join(__dirname, '..');
const LANGS = ['hi', 'kn', 'ta', 'te', 'bn', 'mr'];

// Dependency-free ESM->CJS load, same trick as check-i18n.js: strip the
// `export` keywords and eval in a CommonJS wrapper so this script needs no
// Babel/transpile step to run standalone via `node`.
function loadModule(relPath, exportNames) {
  const filePath = path.join(ROOT, relPath);
  const src = fs
    .readFileSync(filePath, 'utf8')
    .replace(/export default/g, 'const __default__ =')
    .replace(/export const/g, 'const');
  const wrapped = `${src}\nmodule.exports = {};\n${exportNames
    .map(n => (n === 'default' ? `module.exports.default = __default__;` : `module.exports.${n} = ${n};`))
    .join('\n')}`;
  const m = new Module(filePath, module);
  m.filename = filePath;
  m.paths = Module._nodeModulePaths(path.dirname(filePath));
  m._compile(wrapped, filePath);
  return m.exports;
}

function collectConceptIds(indianConstitution) {
  const ids = [];
  Object.values(indianConstitution).forEach(category => {
    (category.topics || []).forEach(topic => {
      (topic.concepts || []).forEach(concept => ids.push(concept.id));
    });
  });
  return ids;
}

function collectArticleIds(constitutionContent) {
  const ids = new Set();
  Object.entries(constitutionContent).forEach(([key, value]) => {
    if (value && Array.isArray(value.articles)) {
      value.articles.forEach(article => ids.add(article.id));
    } else if (value && typeof value === 'object' && /^art/.test(key)) {
      ids.add(key);
    }
  });
  return [...ids];
}

// Category keys are the object keys of INDIAN_CONSTITUTION itself (there is
// no separate id field -- 'fundamentalRights', 'dpsp', etc. ARE the ids).
function collectCategoryIds(indianConstitution) {
  return Object.keys(indianConstitution);
}

function collectTopicIds(indianConstitution) {
  const ids = [];
  Object.values(indianConstitution).forEach(category => {
    (category.topics || []).forEach(topic => ids.push(topic.id));
  });
  return ids;
}

// These three live only as hardcoded arrays inside ConstitutionScreen.js
// (not in a data file this script can introspect), so their id lists are
// kept in sync here by hand. Update them if ConstitutionScreen.js's own
// constitutionParts / importantArticles / amendments arrays ever change.
const SECTION_IDS = ['preamble', 'part1', 'part2', 'part3', 'part4', 'part4a'];
const ARTICLE_SUMMARY_IDS = ['art14', 'art15', 'art19', 'art21', 'art44'];
const AMENDMENT_IDS = ['amend42', 'amend73'];

function main() {
  const { INDIAN_CONSTITUTION, LANDMARK_CASES } = loadModule('src/data/polityData.js', [
    'INDIAN_CONSTITUTION',
    'LANDMARK_CASES',
  ]);
  const { constitutionContent } = loadModule('src/data/constitutionContent.js', ['constitutionContent']);

  const sourceIds = {
    concepts: collectConceptIds(INDIAN_CONSTITUTION),
    cases: LANDMARK_CASES.map(c => c.id),
    articles: collectArticleIds(constitutionContent),
    sections: SECTION_IDS,
    categories: collectCategoryIds(INDIAN_CONSTITUTION),
    topics: collectTopicIds(INDIAN_CONSTITUTION),
    articleSummaries: ARTICLE_SUMMARY_IDS,
    amendments: AMENDMENT_IDS,
  };
  const requiredFields = {
    concepts: ['title', 'content', 'examTips'],
    cases: ['significance', 'facts', 'judgment', 'impact'],
    articles: ['title', 'content'],
    sections: ['title', 'description', 'articles'],
    categories: ['title'],
    topics: ['title', 'description'],
    articleSummaries: ['description'],
    amendments: ['title', 'description'],
  };
  const preambleLength = constitutionContent.preamble.content.length;

  const dicts = {};
  LANGS.forEach(code => {
    dicts[code] = loadModule(`src/data/translations/${code}.js`, ['default']).default;
  });

  let hasProblem = false;
  const report = [];

  LANGS.forEach(code => {
    const dict = dicts[code];
    const problems = [];

    Object.keys(sourceIds).forEach(kind => {
      const bucket = dict[kind] || {};
      sourceIds[kind].forEach(id => {
        const entry = bucket[id];
        if (!entry) {
          problems.push(`${kind}.${id}: missing`);
          return;
        }
        requiredFields[kind].forEach(field => {
          if (!entry[field] || (typeof entry[field] === 'string' && !entry[field].trim())) {
            problems.push(`${kind}.${id}.${field}: empty`);
          }
        });
      });
    });

    const spans = dict.preambleSpans && dict.preambleSpans.preamble;
    if (!spans || spans.length !== preambleLength) {
      problems.push(`preambleSpans.preamble: expected ${preambleLength} spans, got ${spans ? spans.length : 0}`);
    }

    if (problems.length) {
      hasProblem = true;
      report.push({ code, problems });
    }
  });

  const totalIds = Object.values(sourceIds).reduce((sum, arr) => sum + arr.length, 0);

  if (!hasProblem) {
    console.log(
      `✅ content-i18n:check passed — all ${LANGS.length} languages cover all ${totalIds} content ids (concepts/cases/articles/sections/categories/topics/articleSummaries/amendments) plus the preamble.`
    );
    process.exit(0);
  }

  console.error('❌ content-i18n:check failed — some languages are missing or incomplete content translations.\n');
  report.forEach(({ code, problems }) => {
    console.error(`  [${code}] (${problems.length} issue${problems.length === 1 ? '' : 's'})`);
    problems.forEach(p => console.error(`    ${p}`));
  });
  console.error('\nAdd the missing translations under src/data/translations/ before shipping (see its README.md).');
  process.exit(1);
}

main();
