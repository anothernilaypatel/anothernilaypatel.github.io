#!/usr/bin/env node
// Usage:
//   npm run new-post projects "My post title"   -> src/content/projects/my-post-title.mdx
//   npm run new-post daily [YYYY-MM-DD]           -> src/content/daily/<date>.md (defaults to today)
// Works for any collection in src/collections.mjs, based on its layout.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { collections } from '../src/collections.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const aliases = { project: 'projects' };
const [rawType, ...rest] = process.argv.slice(2);
const type = aliases[rawType] ?? rawType;

const usage = [
  'Usage:',
  ...collections.map((c) =>
    c.layout === 'article' ? `  npm run new-post ${c.name} "My post title"` : `  npm run new-post ${c.name} [YYYY-MM-DD]`,
  ),
].join('\n');

const fail = (msg) => {
  console.error(msg);
  process.exit(1);
};

const today = () => {
  const d = new Date();
  return [d.getFullYear(), d.getMonth() + 1, d.getDate()].map((n) => String(n).padStart(2, '0')).join('-');
};

const config = collections.find((c) => c.name === type);
if (!config) fail(usage);

const dir = path.join(root, 'src/content', config.name);
fs.mkdirSync(dir, { recursive: true });

function write(file, body, hints) {
  if (fs.existsSync(file)) fail(`Already exists: ${path.relative(root, file)}`);
  fs.writeFileSync(file, body);
  console.log(`Created ${path.relative(root, file)}`);
  hints.forEach((h) => console.log(h));
}

const template = (name) => fs.readFileSync(path.join(root, 'src/content/templates', name), 'utf8');

if (config.layout === 'article') {
  const title = rest.join(' ').trim();
  if (!title) fail(usage);
  const slug = title
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  if (!slug) fail('Could not make a file name from that title. Use some letters or numbers.');
  let body = template('article.mdx')
    .replace(/^title: .*$/m, `title: ${JSON.stringify(title)}`)
    .replace(/^date: .*$/m, `date: ${today()}`)
    .replaceAll('your-collection', config.name)
    .replaceAll('your-post-slug', slug);
  body = config.defaultKind ? body.replace(/^kind: \S+/m, `kind: ${config.defaultKind}`) : body.replace(/^kind: .*\n/m, '');
  write(path.join(dir, `${slug}.mdx`), body, [
    `Images (optional): put them in src/content/${config.name}/${slug}/`,
    `Preview: npm run dev, then open /${config.name}/${slug}/`,
    'It starts as a draft: delete the `draft: true` line to publish. Then run npm run check.',
  ]);
} else {
  const date = rest[0] ?? today();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) fail('Date must look like 2026-10-05.');
  write(path.join(dir, `${date}.md`), template('journal.md').replace(/^date: .*$/m, `date: ${date}`), [
    `Preview: npm run dev, then open /${config.name}/`,
    'It starts as a draft: delete the `draft: true` line to publish. Then run npm run check.',
  ]);
}
