import axios from 'axios';

const token = localStorage.getItem('@nlclassroom/access_token');

const headers = token
  ? {
      Authorization: `Bearer ${token}`,
    }
  : undefined;

const apimg = axios.create({
  baseURL: 'https://graph.microsoft.com/v1.0/',
  headers,
});

export default apimg;
