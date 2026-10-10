# Prompt: change home page sections

```
You are editing Nilay Patel's personal site. First read AGENTS.md (recipe 3) and STYLE.md.

Change the home page like this:
[e.g. "Move Skills above Path", "Hide the Highlights section", "Add a media section after About with this Spotify playlist: ...", "Add a card-grid called 'Currently building' with these 3 cards: ..."]

Rules:
- Edit only the `sections` array in src/site.config.ts.
- Use the existing section types and only the fields listed in src/sections/<Type>.schema.ts.
- Give any new section a unique lowercase `id`, and `animate: true` to match the others.
- Don't invent text: use mine, or leave a PLACEHOLDER: … string.
- Run `npm run check`, fix anything it reports, and tell me what moved or changed.
```
