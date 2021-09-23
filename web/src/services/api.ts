import axios from 'axios';

export const getUrl = () => {
  let url;

  if (process.env.NODE_ENV === 'development') {
    url = 'http://localhost:7000/api/nlclassroom/';
  }

  if (process.env.NODE_ENV === 'production') {
    url = 'https://stackoverflow.com/';
  }

  return url;
};

const api = axios.create({
  baseURL: getUrl(),
});

export default api;
