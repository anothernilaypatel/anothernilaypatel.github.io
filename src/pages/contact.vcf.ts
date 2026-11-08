import type { APIRoute } from 'astro';
import { contact, site } from '../site.config';
import { absoluteUrl } from '../lib/url';

/** Escape a vCard 3.0 TEXT value (RFC 2426 §5). URI values are left as they are. */
const text = (s: string) => s.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/([,;])/g, '\\$1');

/** Fold content lines longer than 75 characters onto continuation lines that start with a space. */
const fold = (line: string) => {
  const parts = [];
  for (let i = 0; i < line.length; i += i === 0 ? 75 : 74) parts.push(line.slice(i, i + (i === 0 ? 75 : 74)));
  return parts.join('\r\n ');
};

export const GET: APIRoute = ({ site: siteUrl }) => {
  const [first, ...rest] = site.name.split(' ');
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${text(rest.join(' '))};${text(first)};;;`,
    `FN:${text(site.name)}`,
    contact.org && `ORG:${text(contact.org)}`,
    contact.title && `TITLE:${text(contact.title)}`,
    contact.email && `EMAIL;TYPE=INTERNET,PREF:${contact.email}`,
    contact.phone && `TEL;TYPE=CELL:${contact.phone}`,
    `URL:${absoluteUrl('/', siteUrl!)}`,
    // Apple Contacts shows the X-ABLabel next to its grouped URL; other apps still read the URL.
    ...(contact.linkedin ? [`item1.URL:${contact.linkedin}`, 'item1.X-ABLabel:LinkedIn'] : []),
    'END:VCARD',
  ].filter((l): l is string => !!l);

  return new Response(lines.map(fold).join('\r\n') + '\r\n', {
    headers: { 'Content-Type': 'text/vcard; charset=utf-8' },
  });
};
