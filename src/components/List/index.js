import React, { useContext } from "react";
import cn from "classnames";

import { SectionsContext } from "../../contexts/SectionsContext";
import "./index.css";

export function List({ pages }) {
  const { anchorsDict, pagesDict, currentPage, onCurrentPageChange } = useContext(SectionsContext);

  return (
    <div className="tree">
      {pages.map(pageId => {
        const { title, url, pages, level, anchors, unfolded } = pagesDict[pageId];
        const isCurrentPage = pageId === currentPage;

        const titleClassName = cn({
          tree__title: true,
          tree__title_foldable: pages,
          tree__title_unfolded: unfolded,
          tree__title_active: isCurrentPage,
          [`tree__title_level${level}`]: true,
        });

        const sectionClassName = cn({
          tree__section: true,
          tree__section_current: isCurrentPage,
        });

        return (
          <div key={pageId}>
            <div className={sectionClassName}>
              <a onClick={() => onCurrentPageChange(pageId)} className={titleClassName}>
                {title}
              </a>
              {isCurrentPage &&
                anchors &&
                anchors.map(anchorId => {
                  const { title, url } = anchorsDict[anchorId];
                  const anchorClassName = cn({
                    tree__title: true,
                    [`tree__title_level${level + 1}`]: true,
                  });

                  return (
                    <a key={anchorId} className={anchorClassName}>
                      {title}
                    </a>
                  );
                })}
            </div>
            {pages && unfolded && <List pages={pages} />}
          </div>
        );
      })}
    </div>
  );
}
