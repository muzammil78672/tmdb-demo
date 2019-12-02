import * as ActionTypes from '../actionTypes';
import Axios from '../../config/axios';
import Api from '../../constants/api';

const saveAllMovies = data => ({
  type: ActionTypes.Movies.SAVE_ALL_MOVIES,
  payload: data,
});

const savePopularMovies = data => ({
  type: ActionTypes.Movies.SAVE_POPULAR_MOVIES,
  payload: data,
});

const getAllMovies = (search, loadMore) => {
  return async (dispatch, getState) => {
    try {
      let params = {
        query: search,
      };

      if (loadMore) {
        params.page = getState().movies.all.pageNumber + 1;
      }

      let response = await Axios(Api.moviesBaseUrl).get(Api.searchMovie, {
        params,
      });

      let data = response.data;

      if (loadMore) {
        data.results = getState().movies.all.data.concat(data.results);
      }

      dispatch(saveAllMovies(data));
    } catch (error) {
      console.log(error);
    }
  };
};

const getPopularMovies = loadMore => {
  return async (dispatch, getState) => {
    try {
      let params = {};

      console.log(loadMore);

      if (loadMore) {
        params.page = getState().movies.popular.pageNumber + 1;
      }

      let response = await Axios(Api.moviesBaseUrl).get(Api.popularMovies, {
        params,
      });

      let data = response.data;

      if (loadMore) {
        data.results = getState().movies.popular.data.concat(data.results);
      }
      dispatch(savePopularMovies(data));
    } catch (error) {
      console.log(error);
    }
  };
};

const addMovie = data => {
  return async (dispatch, getState) => {
    try {
      await Axios(Api.baseUrl).post(Api.movie, data, {
        headers: {
          authorization: `Bearer ${getState().user.token}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export default {
  getAllMovies,
  getPopularMovies,
  saveAllMovies,
  addMovie,
};
