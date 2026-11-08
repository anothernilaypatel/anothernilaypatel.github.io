// Prints the built /resume/ page to dist/resume.pdf with headless Chrome.
// Run after `npm run build`: `npm run resume:pdf`. Set CHROME_PATH if Chrome isn't `google-chrome`.
import { spawn, execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { setTimeout as sleep } from 'node:timers/promises';

const chrome = process.env.CHROME_PATH || 'google-chrome';
const base = new URL(process.env.SITE_URL || 'https://anothernilaypatel.github.io/nilaypatel.github.io/').pathname;
const port = 4398;
const page = `http://127.0.0.1:${port}${base.replace(/\/?$/, '/')}resume/`;
const out = 'dist/resume.pdf';

if (!existsSync('dist/index.html')) {
  console.error('dist/ is missing; run `npm run build` first.');
  process.exit(1);
}

const server = spawn('npx', ['astro', 'preview', '--host', '127.0.0.1', '--port', String(port)], {
  stdio: 'ignore',
  detached: true,
});
const stop = () => {
  try {
    process.kill(-server.pid);
  } catch {}
};

try {
  let up = false;
  for (let i = 0; i < 60 && !up; i++) {
    up = await fetch(page).then((r) => r.ok, () => false);
    if (!up) await sleep(500);
  }
  if (!up) throw new Error(`preview server never served ${page}`);

  // A throwaway profile, so Chrome never hands the job to an already-running browser.
  const profile = mkdtempSync(join(tmpdir(), 'resume-pdf-'));
  execFileSync(chrome, [
    '--headless',
    `--user-data-dir=${profile}`,
    '--no-sandbox',
    '--disable-gpu',
    '--no-pdf-header-footer',
    '--run-all-compositor-stages-before-draw',
    '--virtual-time-budget=5000',
    `--print-to-pdf=${out}`,
    page,
  ], { stdio: 'inherit', timeout: 60_000 });
  if (!existsSync(out)) throw new Error('Chrome did not write the PDF');
  console.log(`Wrote ${out}`);
} finally {
  stop();
}
