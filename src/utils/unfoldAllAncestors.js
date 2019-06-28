export function unfoldAllAncestors(pages, currentPageId) {
  let currentPage = pages[currentPageId];
  while (currentPage) {
    currentPage.unfolded = true;
    currentPage = pages[currentPage.parentId];
  }
}
