export function unfoldAllAncestors(pagesDict, currentPageId) {
  const updated = { ...pagesDict };
  let currentId = currentPageId;

  while (currentId) {
    updated[currentId] = {
      ...updated[currentId],
      unfolded: true,
    };
    currentId = updated[currentId].parentId;
  }

  return updated;
}
