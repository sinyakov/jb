import * as types from "./constants";
import { foldAllDescendants } from "../../utils/foldAllDescendants";
import { getDescendants } from "../../utils/getDescendants";

export function reducer(state, { type, payload }) {
  switch (type) {
    case types.LOAD_DATA_SUCCESS:
      return {
        loading: false,
        ...payload,
      };
    case types.TOGGLE_PAGE_UNFOLDED:
      if (state.pagesDict[payload].unfolded) {
        return {
          ...state,
          pagesDict: foldAllDescendants(state.pagesDict, getDescendants(state.pagesDict, payload)),
        };
      }
      return {
        ...state,
        pagesDict: {
          ...state.pagesDict,
          [payload]: {
            ...state.pagesDict[payload],
            unfolded: true,
          },
        },
      };

    default:
      return state;
  }
}
