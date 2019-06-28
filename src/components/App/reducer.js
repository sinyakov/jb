import * as types from "./constants";

export function reducer(state, { type, payload }) {
  switch (type) {
    case types.LOAD_DATA_SUCCESS:
      return {
        loading: false,
        ...payload,
      };
    default:
      return state;
  }
}
