export function foldAllDescendants(pagesDict, descendants) {
  if (descendants.length === 0) {
    return pagesDict;
  }

  const updated = { ...pagesDict };

  descendants.forEach(id => {
    updated[id] = {
      ...updated[id],
      unfolded: false,
    };
  });

  return updated;
}
