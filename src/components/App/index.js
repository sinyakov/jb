import React, { useReducer, useCallback, useEffect } from "react";
import "./index.css";
import { getHelpTOC } from "../../api/getHelpTOC";
import { reducer } from "./reducer";
import * as types from "./constants";

const initState = {
  loading: true,
  currentPage: null,
  topLevelIds: null,
  anchors: null,
  pages: null,
};

export function App() {
  const [state, dispatch] = useReducer(reducer, initState);

  const fetchData = useCallback(async function() {
    try {
      const {
        entities: { anchors, pages },
        topLevelIds,
      } = await getHelpTOC();

      dispatch({
        type: types.LOAD_DATA_SUCCESS,
        payload: {
          topLevelIds,
          anchors,
          pages,
        },
      });
    } catch (e) {
      console.log(e);
      dispatch({
        type: types.LOAD_DATA_FAILURE,
      });
    }
  });

  useEffect(() => {
    fetchData();
  }, []);

  const { loading, currentPage, topLevelIds, anchors, pages } = state;

  return loading ? "Loading" : topLevelIds.map(id => <div key={id}>{id}</div>);
}
