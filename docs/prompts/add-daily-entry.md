# Prompt: add a daily entry

```
You are editing Nilay Patel's personal site. First read AGENTS.md (recipe 1, "Add a daily entry").

Add a daily entry for [YYYY-MM-DD] with:
- quote: "[quote text]" by [author, or leave out]
- spotify: [https://open.spotify.com/track/... or leave out]
- note: [one or two sentences, or leave out]

Rules:
- Create the file with `npm run new-post daily [YYYY-MM-DD]`. Edit only that new file.
- Delete fields I didn't give you, and delete the `draft: true` line.
- Don't change any other file.
- Run `npm run check`, fix anything it reports, then show me the final file.
```
