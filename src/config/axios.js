import Axios from 'axios';
import Api from '../constants/api';

export default baseURL => {
  const axios = Axios.create({
    baseURL: baseURL,
    timeout: 1000,
  });

  axios.interceptors.request.use(
    config => {
      console.log('Request', config);
      if (config.baseURL === Api.moviesBaseUrl) {
        config.params = config.params || {};
        config.params.api_key = 'cfa55204cd04389ec663d4e1ee3cad20';
      }
      return config;
    },
    error => {
      console.log('Request Error', error);
      if (error.message) {
        alert(error.message);
      }
      return Promise.reject(error);
    },
  );

  axios.interceptors.response.use(
    response => {
      console.log('Response', response);
      return response;
    },
    error => {
      console.log('Response Error', error);
      if (error.message) {
        alert(error.message);
      }
      return Promise.reject(error);
    },
  );

  return axios;
};
