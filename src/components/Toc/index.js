import React, { useReducer, useCallback, useEffect } from "react";
import "./index.css";
import { getHelpToc } from "../../api/getHelpToc";
import { reducer } from "./reducer";
import * as types from "./constants";
import { SectionsContext } from "../../contexts/SectionsContext";
import { List } from "../List";
import { unfoldAllAncestors } from "../../utils/unfoldAllAncestors";

const initState = {
  loading: true,
  topLevelIds: null,
  anchorsDict: null,
  pagesDict: null,
};

export function Toc({ match }) {
  const [state, dispatch] = useReducer(reducer, initState);

  const fetchData = useCallback(async function() {
    try {
      const { entities, topLevelIds } = await getHelpToc();
      const { anchors: anchorsDict, pages: pagesDict } = entities;

      const { currentPage } = match.params;
      const page = currentPage
        ? Object.values(pagesDict).find(({ url }) => url === currentPage)
        : null;

      dispatch({
        type: types.LOAD_DATA_SUCCESS,
        payload: {
          topLevelIds,
          anchorsDict,
          pagesDict: unfoldAllAncestors(pagesDict, page ? page.id : null),
        },
      });
    } catch (e) {
      console.log(e);
      dispatch({
        type: types.LOAD_DATA_FAILURE,
      });
    }
  });

  const onCurrentPageChange = useCallback(function(id) {
    dispatch({
      type: types.TOGGLE_PAGE_UNFOLDED,
      payload: id,
    });
  });

  useEffect(() => {
    fetchData();
  }, []);

  const { loading, currentPage, topLevelIds, anchorsDict, pagesDict } = state;

  return (
    <div className="toc-wrapper">
      <SectionsContext.Provider
        value={{
          anchorsDict,
          pagesDict,
          currentPage,
          onCurrentPageChange,
          prefix: "/toc",
        }}
      >
        {loading ? "Loading" : <List pages={topLevelIds} />}
      </SectionsContext.Provider>
    </div>
  );
}
