#!/usr/bin/env node
/**
 * Style guardrails. Fails when code drifts from the design system:
 *   - raw colors (hex, rgb/hsl, named colors) outside src/styles/tokens.css
 *   - px values in CSS outside tokens.css (except in @media breakpoints)
 *   - raw font families instead of var(--serif|--sans|--mono)
 *   - internal links written as href="/..." instead of url('/...') (breaks the base path)
 *
 * Escape hatch for a genuine exception: put `style-ok: <reason>` in a comment on the same line.
 * Run: npm run lint:style
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const TOKENS = 'src/styles/tokens.css';
const NAMED = 'white|black|red|green|blue|gray|grey|orange|yellow|purple|pink|brown|navy|teal|silver|gold';

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
    const p = path.join(dir, d.name);
    if (d.isDirectory()) return d.name === 'content' && dir.endsWith('src') ? [] : walk(p);
    return /\.(astro|css|ts|mjs|js)$/.test(d.name) ? [p] : [];
  });
}

/** Line ranges (1-based, inclusive) that hold CSS: <style> blocks in .astro, whole .css files. */
function cssRanges(file, lines) {
  if (file.endsWith('.css')) return [[1, lines.length]];
  if (!file.endsWith('.astro')) return [];
  const ranges = [];
  let start = 0;
  lines.forEach((l, i) => {
    if (/<style[\s>]/.test(l)) start = i + 2;
    if (/<\/style>/.test(l) && start) {
      ranges.push([start, i]);
      start = 0;
    }
  });
  return ranges;
}

const problems = [];
const report = (file, line, msg, hint) => problems.push({ file, line, msg, hint });

for (const abs of walk(path.join(root, 'src'))) {
  const file = path.relative(root, abs);
  if (file === TOKENS) continue;
  const lines = fs.readFileSync(abs, 'utf8').split('\n');
  const css = cssRanges(file, lines);
  const inCss = (n) => css.some(([a, b]) => n >= a && n <= b);
  const isAstro = file.endsWith('.astro');
  let inFrontmatter = false;

  lines.forEach((text, i) => {
    const n = i + 1;
    if (isAstro && text.trim() === '---') inFrontmatter = !inFrontmatter;
    if (/style-ok:/.test(text)) return;
    const code = text.replace(/\/\*.*?\*\//g, '').replace(/(^|\s)\/\/.*$/, '');

    if (inCss(n)) {
      for (const m of code.matchAll(/#[0-9a-fA-F]{3,8}\b/g))
        report(file, n, `hardcoded color ${m[0]}`, 'use a color token, e.g. var(--accent), var(--ink), var(--line)');
      if (/\b(rgba?|hsla?)\(/.test(code)) report(file, n, 'hardcoded rgb()/hsl() color', 'use a token, or color-mix(in srgb, var(--accent) 20%, transparent)');
      const named = code.match(new RegExp(`:\\s*[^;]*\\b(${NAMED})\\b`));
      if (named && !/var\(--/.test(named[0].split(named[1])[0].slice(-6))) report(file, n, `named color "${named[1]}"`, 'use a color token');
      if (!/^\s*@(media|container)/.test(code))
        for (const m of code.matchAll(/(?<![\w-])-?\d*\.?\d+px\b/g))
          report(file, n, `hardcoded ${m[0]}`, 'use a token from src/styles/tokens.css (e.g. var(--hairline), var(--radius-card)) or rem');
      const ff = code.match(/font-family:\s*([^;]+)/);
      if (ff && !/^(var\(--(serif|sans|mono)\)|inherit)\s*$/.test(ff[1].trim())) report(file, n, `raw font-family "${ff[1].trim()}"`, 'use var(--serif), var(--sans), or var(--mono)');
      if (/(^|\s|;)font:\s/.test(code) && !/var\(--/.test(code)) report(file, n, 'font shorthand with raw values', 'use font-family: var(--…) plus font-size');
    } else {
      if (/(Fraunces|JetBrains|Inter Variable|Georgia|Helvetica|Arial|Times New Roman)/.test(code) && !/@fontsource/.test(code))
        report(file, n, 'raw font name in code', 'read the font from CSS: getComputedStyle(document.documentElement).getPropertyValue("--mono")');
      if (isAstro && !inFrontmatter) {
        for (const m of code.matchAll(/(?:fill|stroke|color|content|bgcolor)="(#[0-9a-fA-F]{3,8})"/g))
          report(file, n, `hardcoded color ${m[1]} in markup`, 'use currentColor or var(--token)');
        if (/\shref="\/(?!\/)/.test(code)) report(file, n, 'internal link written as href="/…"', "use href={url('/…')} from src/lib/url.ts so the base path is kept");
      }
    }
  });
}

if (problems.length) {
  console.error(`\n✖ Style check failed: ${problems.length} problem${problems.length === 1 ? '' : 's'}\n`);
  for (const p of problems) console.error(`  ${p.file}:${p.line}  ${p.msg}\n      → ${p.hint}`);
  console.error('\nDesign values live in src/styles/tokens.css (see STYLE.md). For a real exception, add a `style-ok: reason` comment on that line.\n');
  process.exit(1);
}
console.log('✓ Style check passed (no hardcoded colors, px values, fonts, or base-less links).');
