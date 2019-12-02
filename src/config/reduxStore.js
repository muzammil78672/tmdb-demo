import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';

import * as Reducers from '../redux/reducers';

const rootReducer = combineReducers({
  movies: Reducers.Movies,
  user: Reducers.User,
});

export default () => {
  return createStore(rootReducer, applyMiddleware(thunk));
};
