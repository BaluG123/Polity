#!/usr/bin/env node
/**
 * Translation-completeness gate.
 *
 * Fails (exit 1) if any language in LANGUAGES is missing a key that exists
 * in another language's UI_TEXT block, or has an extra key that doesn't
 * exist in the others. Run this after touching src/data/i18n.js, and wire it
 * into CI so a screen can never ship a string in English only.
 *
 * Usage: npm run i18n:check
 */

const path = require('path');

function loadI18n() {
  // The source file is an ES module (export const ...); transpile-free load
  // by stripping the `export ` keywords and eval'ing in a CommonJS wrapper.
  // This keeps the check dependency-free (no Babel needed to run it).
  const fs = require('fs');
  const filePath = path.join(__dirname, '..', 'src', 'data', 'i18n.js');
  const src = fs.readFileSync(filePath, 'utf8').replace(/export const/g, 'const');
  const wrapped = `${src}\nmodule.exports = { LANGUAGES, UI_TEXT };`;
  const Module = require('module');
  const m = new Module(filePath, module);
  m.filename = filePath;
  m.paths = Module._nodeModulePaths(path.dirname(filePath));
  m._compile(wrapped, filePath);
  return m.exports;
}

function main() {
  const { LANGUAGES, UI_TEXT } = loadI18n();
  const codes = LANGUAGES.map(l => l.code);
  const allKeys = new Set();
  codes.forEach(code => Object.keys(UI_TEXT[code] || {}).forEach(k => allKeys.add(k)));

  let hasProblem = false;
  const report = [];

  codes.forEach(code => {
    const keys = new Set(Object.keys(UI_TEXT[code] || {}));
    const missing = [...allKeys].filter(k => !keys.has(k));
    const emptyValues = [...keys].filter(k => typeof UI_TEXT[code][k] === 'string' && UI_TEXT[code][k].trim() === '');

    if (missing.length || emptyValues.length) {
      hasProblem = true;
      report.push({ code, missing, emptyValues });
    }
  });

  if (!hasProblem) {
    console.log(`✅ i18n:check passed — all ${codes.length} languages (${[...allKeys].length} keys each) are in sync.`);
    process.exit(0);
  }

  console.error('❌ i18n:check failed — some languages are out of sync with UI_TEXT.\n');
  report.forEach(({ code, missing, emptyValues }) => {
    console.error(`  [${code}]`);
    if (missing.length) console.error(`    missing keys: ${missing.join(', ')}`);
    if (emptyValues.length) console.error(`    empty values: ${emptyValues.join(', ')}`);
  });
  console.error('\nAdd the missing translations to src/data/i18n.js before shipping.');
  process.exit(1);
}

main();
