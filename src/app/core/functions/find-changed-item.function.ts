// TODO: Should I implement this function in service? What about cases, when I can't use dependency injection then?
// For example in files with reducers
export function findChangedItem<T extends { id: string }>(items: T[], id: string): T | undefined {
  return items.find(item => item.id === id);
}
