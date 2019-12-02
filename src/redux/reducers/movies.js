import * as ActionTypes from '../actionTypes';

let initialState = {
  popular: {
    data: [],
    pageNumber: 1,
    totalPages: null,
    hasMore: true,
  },
  all: {
    data: [],
    pageNumber: 1,
    totalPages: null,
    hasMore: true,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.Movies.SAVE_ALL_MOVIES:
      return {
        ...state,
        all: {
          ...state.all,
          data: action.payload.results,
          pageNumber: action.payload.page,
          totalPages: action.payload.total_pages,
          hasMore: action.payload.page < action.payload.total_pages,
        },
      };
    case ActionTypes.Movies.SAVE_POPULAR_MOVIES:
      return {
        ...state,
        popular: {
          ...state.all,
          data: action.payload.results,
          pageNumber: action.payload.page,
          totalPages: action.payload.total_pages,
          hasMore: action.payload.page < action.payload.total_pages,
        },
      };
    default:
      return state;
  }
};
