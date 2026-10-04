/**
 * Turns a paragraph that contains only an image into
 * <figure class="fig"><img/><figcaption>title</figcaption></figure>,
 * so `![alt](./chart.png "Caption")` in Markdown/MDX becomes a captioned figure.
 */
const isBlank = (n) => n.type === 'text' && !n.value.trim();

function isImage(n) {
  if (n.type === 'element') return n.tagName === 'img';
  return (n.type === 'mdxJsxTextElement' || n.type === 'mdxJsxFlowElement') && /img|image/i.test(n.name ?? '');
}

function takeTitle(img) {
  if (img.type === 'element') {
    const t = img.properties?.title;
    if (t) delete img.properties.title;
    return t ? String(t) : '';
  }
  const attr = img.attributes?.find((a) => a.name === 'title');
  if (!attr || typeof attr.value !== 'string') return '';
  img.attributes = img.attributes.filter((a) => a !== attr);
  return attr.value;
}

function transform(node) {
  if (!node.children) return;
  node.children = node.children.map((child) => {
    if (child.type === 'element' && child.tagName === 'p') {
      const kids = child.children.filter((k) => !isBlank(k));
      if (kids.length === 1 && isImage(kids[0])) {
        const img = kids[0];
        const caption = takeTitle(img);
        const children = [img];
        if (caption) children.push({ type: 'element', tagName: 'figcaption', properties: {}, children: [{ type: 'text', value: caption }] });
        return { type: 'element', tagName: 'figure', properties: { className: ['fig'] }, children };
      }
    }
    transform(child);
    return child;
  });
}

export default function rehypeFigure() {
  return (tree) => transform(tree);
}
