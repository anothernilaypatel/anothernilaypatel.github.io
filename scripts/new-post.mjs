#!/usr/bin/env node
// Usage: npm run new-post "My post title"
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const title = process.argv.slice(2).join(' ').trim();

if (!title) {
  console.error('Usage: npm run new-post "My post title"');
  process.exit(1);
}

const slug = title
  .toLowerCase()
  .normalize('NFKD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '');

if (!slug) {
  console.error('Could not make a file name from that title. Use some letters or numbers.');
  process.exit(1);
}

const blogDir = path.join(root, 'src/content/blog');
const file = path.join(blogDir, `${slug}.mdx`);
if (fs.existsSync(file)) {
  console.error(`Already exists: ${path.relative(root, file)}`);
  process.exit(1);
}

const now = new Date();
const date = [now.getFullYear(), now.getMonth() + 1, now.getDate()].map((n) => String(n).padStart(2, '0')).join('-');

const template = fs.readFileSync(path.join(root, 'src/content/post-template.mdx'), 'utf8');
const body = template
  .replace(/^title: .*$/m, `title: ${JSON.stringify(title)}`)
  .replace(/^date: .*$/m, `date: ${date}`)
  .replaceAll('your-post-slug', slug);

fs.writeFileSync(file, body);
console.log(`Created ${path.relative(root, file)}`);
console.log(`Images (optional): put them in src/content/blog/${slug}/`);
console.log(`Preview: npm run dev, then open http://localhost:4321/blog/${slug}/`);
