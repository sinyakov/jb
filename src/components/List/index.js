import React, { useContext } from "react";
import { Link } from "react-router-dom";
import useReactRouter from "use-react-router";
import cn from "classnames";

import { SectionsContext } from "../../contexts/SectionsContext";
import "./index.css";

export function List({ pages }) {
  const { anchorsDict, pagesDict, onCurrentPageChange, prefix } = useContext(SectionsContext);
  const { match, location } = useReactRouter();
  const { currentPage } = match.params;
  const { hash } = location;

  return (
    <div className="tree">
      {pages.map(pageId => {
        const { title, url, pages, level, anchors, unfolded } = pagesDict[pageId];

        const isCurrentPage = url === currentPage;

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
              <Link
                onClick={() => onCurrentPageChange(pageId)}
                to={`${prefix}/${url || pages[0].url}`}
                className={titleClassName}
              >
                {title}
              </Link>
              {isCurrentPage &&
                anchors &&
                anchors.map(anchorId => {
                  const { anchor, title } = anchorsDict[anchorId];
                  const anchorClassName = cn({
                    tree__title: true,
                    tree__title_active: anchor === hash,
                    [`tree__title_level${level + 1}`]: true,
                  });

                  return (
                    <Link
                      key={anchorId}
                      className={anchorClassName}
                      to={`${prefix}/${url}${anchor}`}
                    >
                      {title}
                    </Link>
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
