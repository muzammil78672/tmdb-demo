import * as ActionTypes from '../actionTypes';

let initialState = {
  user: {},
  token: '',
  likedMovies: [],
  dislikedMovies: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.User.SAVE_USER:
      return {
        ...state,
        user: action.payload,
      };
    case ActionTypes.User.SAVE_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case ActionTypes.User.SAVE_LIKED_MOVIES:
      return {
        ...state,
        likedMovies: action.payload,
      };
    case ActionTypes.User.SAVE_DISLIKED_MOVIES:
      return {
        ...state,
        dislikedMovies: action.payload,
      };
    default:
      return state;
  }
};
