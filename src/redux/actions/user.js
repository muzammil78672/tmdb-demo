import * as ActionTypes from '../actionTypes';
import Axios from '../../config/axios';
import Api from '../../constants/api';
import Helper from '../../common/helper';
import Navigation from '../../common/navigation';

const saveUser = data => ({
  type: ActionTypes.User.SAVE_USER,
  payload: data,
});

const saveToken = data => ({
  type: ActionTypes.User.SAVE_TOKEN,
  payload: data,
});

const saveLikedMovies = data => ({
  type: ActionTypes.User.SAVE_LIKED_MOVIES,
  payload: data,
});

const saveDislikedMovies = data => ({
  type: ActionTypes.User.SAVE_DISLIKED_MOVIES,
  payload: data,
});

const login = formValues => {
  return async dispatch => {
    try {
      let response = await Axios(Api.baseUrl).post(Api.login, formValues);
      dispatch(saveUser(response.data.user));
      dispatch(saveToken(response.data.token));
      Helper.storeData('user', response.data.user);
      Helper.storeData('token', response.data.token);
      Navigation.navigate('Landing');
    } catch (error) {
      console.log(error);
    }
  };
};

const register = formValues => {
  return async dispatch => {
    try {
      let response = await Axios(Api.baseUrl).post(Api.register, formValues);
      dispatch(saveUser(response.data.user));
      dispatch(saveToken(response.data.token));
      Helper.storeData('user', response.data.user);
      Helper.storeData('token', response.data.token);
      Navigation.navigate('Landing');
    } catch (error) {
      console.log(error);
    }
  };
};

const logout = () => {
  return dispatch => {
    try {
      Navigation.navigate('Onboarding');
      dispatch(saveUser({}));
      dispatch(saveToken(''));
      Helper.clearData();
    } catch (error) {
      console.log(error);
    }
  };
};

const getMovies = () => {
  return async (dispatch, getState) => {
    try {
      let response = await Axios(Api.baseUrl).get(Api.movie, {
        headers: {
          authorization: `Bearer ${getState().user.token}`,
        },
      });
      let {movies} = response.data;
      dispatch(saveLikedMovies(movies.filter(movie => movie.type === 'like')));
      dispatch(
        saveDislikedMovies(movies.filter(movie => movie.type === 'dislike')),
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
};

export default {
  saveUser,
  saveToken,
  saveLikedMovies,
  saveDislikedMovies,
  login,
  register,
  logout,
  getMovies,
};
