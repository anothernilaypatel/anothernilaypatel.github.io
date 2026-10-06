#!/usr/bin/env node
// Usage:
//   npm run new-post project "My post title"   -> src/content/projects/my-post-title.mdx
//   npm run new-post daily [YYYY-MM-DD]          -> src/content/daily/<date>.md (defaults to today)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const [type, ...rest] = process.argv.slice(2);
const usage = 'Usage:\n  npm run new-post project "My post title"\n  npm run new-post daily [YYYY-MM-DD]';

const fail = (msg) => {
  console.error(msg);
  process.exit(1);
};

const today = () => {
  const d = new Date();
  return [d.getFullYear(), d.getMonth() + 1, d.getDate()].map((n) => String(n).padStart(2, '0')).join('-');
};

const template = (name) => fs.readFileSync(path.join(root, 'src/content/templates', name), 'utf8');

function write(file, body, hints) {
  if (fs.existsSync(file)) fail(`Already exists: ${path.relative(root, file)}`);
  fs.writeFileSync(file, body);
  console.log(`Created ${path.relative(root, file)}`);
  hints.forEach((h) => console.log(h));
}

if (type === 'project') {
  const title = rest.join(' ').trim();
  if (!title) fail(usage);
  const slug = title
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  if (!slug) fail('Could not make a file name from that title. Use some letters or numbers.');
  const body = template('project.mdx')
    .replace(/^title: .*$/m, `title: ${JSON.stringify(title)}`)
    .replace(/^date: .*$/m, `date: ${today()}`)
    .replaceAll('your-post-slug', slug);
  write(path.join(root, 'src/content/projects', `${slug}.mdx`), body, [
    `Images (optional): put them in src/content/projects/${slug}/`,
    `Preview: npm run dev, then open /projects/${slug}/`,
  ]);
} else if (type === 'daily') {
  const date = rest[0] ?? today();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) fail('Date must look like 2026-10-05.');
  const body = template('daily.md').replace(/^date: .*$/m, `date: ${date}`);
  write(path.join(root, 'src/content/daily', `${date}.md`), body, ['Preview: npm run dev, then open /daily/']);
} else {
  fail(usage);
}
