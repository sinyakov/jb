import React, { useReducer, useCallback, useEffect } from "react";
import "./index.css";
import { getHelpTOC } from "../../api/getHelpTOC";
import { reducer } from "./reducer";
import * as types from "./constants";
import { SectionsContext } from "../../contexts/SectionsContext";
import { List } from "../List";

const initState = {
  loading: true,
  currentPage: null,
  topLevelIds: null,
  anchorsDict: null,
  pagesDict: null,
};

export function App() {
  const [state, dispatch] = useReducer(reducer, initState);

  const fetchData = useCallback(async function() {
    try {
      const { entities, topLevelIds } = await getHelpTOC();
      const { anchors: anchorsDict, pages: pagesDict } = entities;

      dispatch({
        type: types.LOAD_DATA_SUCCESS,
        payload: {
          topLevelIds,
          anchorsDict,
          pagesDict,
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
    // TODO:
    // 1. change currentPage
    // 2.1 unfold current page
    // 2.2 fold current page and descendants
  });

  useEffect(() => {
    fetchData();
  }, []);

  const { loading, currentPage, topLevelIds, anchorsDict, pagesDict } = state;

  return (
    <SectionsContext.Provider
      value={{
        anchorsDict,
        pagesDict,
        currentPage,
        onCurrentPageChange,
      }}
    >
      {loading ? "Loading" : <List pages={topLevelIds} />}
    </SectionsContext.Provider>
  );
}
