import React, { useContext } from "react";
import { SectionsContext } from "../../contexts/SectionsContext";

export function List({ pages }) {
  const { anchorsDict, pagesDict, currentPage, onCurrentPageChange } = useContext(SectionsContext);

  return (
    <div>
      {pages.map(pageId => {
        const { title, url, pages, level, anchors } = pagesDict[pageId];

        return (
          <div key={pageId} style={{ marginLeft: level * 16 }}>
            <a onClick={() => onCurrentPageChange(pageId)} href={url}>
              {title}
            </a>
            {pages && <List pages={pages} />}
            {anchors &&
              anchors.map(anchorId => {
                const { anchor, title, url } = anchorsDict[anchorId];

                return (
                  <a
                    key={anchorId}
                    href={url + anchor}
                    style={{ marginLeft: 16, display: "block" }}
                  >
                    {title}
                  </a>
                );
              })}
          </div>
        );
      })}
    </div>
  );
}
