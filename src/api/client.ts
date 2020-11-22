import axios from 'axios';
import applyConverters from 'axios-case-converter';

const baseURL = 'https://store-api-figgs.herokuapp.com/api/';

const axiosInstance = applyConverters(
  axios.create({
    baseURL,
    timeout: 10000,
    headers: {
      Accept: 'application/json',
    },
  })
);

export default axiosInstance;
