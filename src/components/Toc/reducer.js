import * as types from "./constants";

export function reducer(state, { type, payload }) {
  switch (type) {
    case types.LOAD_DATA_SUCCESS:
      return {
        loading: false,
        ...payload,
      };
    case types.TOGGLE_PAGE_UNFOLDED:
      return {
        ...state,
        currentPage: payload,
        pagesDict: {
          ...state.pagesDict,
          [payload]: {
            ...state.pagesDict[payload],
            unfolded: !state.pagesDict[payload].unfolded,
          },
        },
      };

    default:
      return state;
  }
}
