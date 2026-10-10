# Prompt: create a new section type

```
You are editing Nilay Patel's personal site. First read AGENTS.md (recipe 4) and all of STYLE.md.

I want a new home section type: [describe it, e.g. "a 'quote' section with one big quote and an author"].
Fields it needs: [list them]
Where it goes on the home page: [after which section]
Content for it: [the actual text]

Rules:
- First check whether an existing type (prose, stats, timeline, chips, card-grid, links, media, collection-feed, bands) can do this. If one can, use it instead and tell me.
- Otherwise copy src/sections/_Example.astro and src/sections/_Example.schema.ts to src/sections/<Name>.astro and <Name>.schema.ts.
- Style only with tokens from src/styles/tokens.css and the classes and components listed in STYLE.md. No hex colors, no px, no font names.
- Reuse the motion kit (reveal, tilt, spotlight, ...) instead of writing new animation code.
- Add one entry to `sections` in src/site.config.ts.
- Run `npm run check`, fix anything it reports, and describe the new section.
```
