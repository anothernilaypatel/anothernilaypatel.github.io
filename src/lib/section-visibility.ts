/** Whether a (validated) section entry has anything to show. */

const LIST_KEYS = ['items', 'groups', 'paragraphs', 'feeds'];

/** Hidden if `hidden: true`, or if every list it has (items/groups/paragraphs/feeds) is empty. */
export function isVisible(entry: Record<string, unknown>) {
  if (entry.hidden) return false;
  const lists = LIST_KEYS.filter((k) => Array.isArray(entry[k])).map((k) => entry[k] as unknown[]);
  if (lists.length === 0) return true;
  return lists.some((list) =>
    list.some((item) => {
      if (item && typeof item === 'object' && Array.isArray((item as { items?: unknown[] }).items)) {
        return (item as { items: unknown[] }).items.length > 0;
      }
      return !!item;
    }),
  );
}
