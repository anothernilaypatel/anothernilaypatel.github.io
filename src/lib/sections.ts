/**
 * Section component registry: every src/sections/<Name>.astro (except "_" files) becomes
 * type '<name>' in kebab-case. Each one must have a matching <Name>.schema.ts.
 * Only the home page imports this file.
 */
import type { AstroComponentFactory } from 'astro/runtime/server/index.js';
import { definitions, typeFromFile, sectionTypes, type ParsedSection } from './section-schemas';
import { isVisible } from './section-visibility';

const modules = import.meta.glob<{ default: AstroComponentFactory }>(['../sections/*.astro', '!../sections/_*.astro'], { eager: true });
export const registry: Record<string, AstroComponentFactory> = Object.fromEntries(
  Object.entries(modules).map(([file, mod]) => [typeFromFile(file), mod.default]),
);

const missingSchema = Object.keys(registry).filter((t) => !definitions[t]);
const missingComponent = sectionTypes.filter((t) => !registry[t]);
if (missingSchema.length || missingComponent.length) {
  throw new Error(
    [
      ...missingSchema.map((t) => `Section type "${t}" has a component but no schema: add src/sections/${pascal(t)}.schema.ts (copy _Example.schema.ts).`),
      ...missingComponent.map((t) => `Section type "${t}" has a schema but no component: add src/sections/${pascal(t)}.astro (copy _Example.astro).`),
    ].join('\n'),
  );
}

function pascal(t: string) {
  return t.replace(/(^|-)([a-z])/g, (_, __, c: string) => c.toUpperCase());
}

export const componentFor = (entry: ParsedSection) => registry[entry.type];
export { isVisible };
