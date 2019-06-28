export function getDescendants(pagesDict, currentPageId) {
  const { pages } = pagesDict[currentPageId];

  if (!pages) return [];

  const descendants = pages.reduce((acc, childId) => {
    acc.push(...getDescendants(pagesDict, childId));
    return acc;
  }, []);

  return [currentPageId, ...pages, ...descendants];
}
