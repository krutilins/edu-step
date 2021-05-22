export function findChangedItem<T extends { id: string }>(items: T[], id: string): T | undefined {
  return items.find(item => item.id === id);
}
