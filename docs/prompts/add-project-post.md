# Prompt: add or publish a project post

```
You are editing Nilay Patel's personal site. First read AGENTS.md (recipe 2) and STYLE.md.

Write a [project | idea | accolade] post titled "[Title]".
Content to use (don't invent facts beyond this):
[paste notes, bullet points, or a draft]
Images (optional): [file names already saved in src/content/projects/<slug>/]

Rules:
- Create it with `npm run new-post projects "[Title]"` (or, to finish an existing draft, edit src/content/projects/[slug].mdx and replace every PLACEHOLDER).
- Set `kind:` and a one-sentence `description:`. Use ## headings and short paragraphs.
- Images go on their own line: ![alt text](./<slug>/<file> "Caption").
- Delete `draft: true` only if I said to publish: [publish now? yes/no].
- Edit only that post file (and its image folder).
- Run `npm run check`, fix anything it reports, and summarize what you wrote.
```
