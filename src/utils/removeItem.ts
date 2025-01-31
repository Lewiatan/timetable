type ItemType = 'teachers' | 'grades' | 'classes' | 'lectures' | 'rooms';

export const removeItem = (
  key: ItemType,
  id: string,
  items: any[],
  setItems: (items: any[]) => void
) => {
  const updatedItems = items.filter((item) => item.id !== id);
  setItems(updatedItems);
  localStorage.setItem(key, JSON.stringify(updatedItems));
};