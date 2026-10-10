# Prompt: add a post type

```
You are editing Nilay Patel's personal site. First read AGENTS.md (recipe 5, "Add a post type").

Add a new post type:
- name (URL): [e.g. notes]
- layout: [article (titled posts) | journal (dated entries)]
- title shown on its page: [e.g. Notes]
- one-sentence intro: [...]
- show in the top nav? [yes/no]
- show on the home page? [no | in the "Latest" feed | as a big band link]
- first post: [title and content]

Rules:
- Add one entry to src/collections.mjs. Create the first post with `npm run new-post <name> ...`.
- If it should be on the home page, edit the `collection-feed` or `bands` entry in src/site.config.ts.
- Don't edit anything in src/lib, src/pages, or src/layouts.
- Run `npm run check`, fix anything it reports, and list the new URLs.
```
