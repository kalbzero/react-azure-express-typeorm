import apimg from '../services/apimg';

const username = '@nlclassroom/username';
const name = '@nlclassroom/name';
const access_token = '@nlclassroom/access_token';
const tenantId = '@nlclassroom/tenantId';
let url = 'http://localhost:7000/api/nlclassroom/';
// const apimg = 'https://graph.microsoft.com/v1.0/';
const host_name = 'treinamento_nl_com_br/';

export const logout = () => {
  localStorage.removeItem(username);
  localStorage.removeItem(name);
};

export const isLogin = () => {
  if (localStorage.getItem(username)) {
    return true;
  }
  return false;
};

export const getName = () => localStorage.getItem(name);
export const setName = (name2: string) => localStorage.setItem(name, name2);
export const getUsername = () => localStorage.getItem(username);
export const setUsername = (username2: string) =>
  localStorage.setItem(username, username2);
export const getAccessToken = () => localStorage.getItem(access_token);
export const setAccessToken = (newAccessToken: string) => {
  localStorage.setItem(access_token, newAccessToken);
  apimg.defaults.headers.Authorization = `Baerer ${newAccessToken}`;
};
export const getTenantId = () => localStorage.getItem(tenantId);
export const setTenantId = (tenantId2: string) =>
  localStorage.setItem(tenantId, tenantId2);

export const getUrl = () => {
  if (process.env.NODE_ENV === 'development') {
    url = 'http://localhost:7000/api/nlclassroom/';
  }

  if (process.env.NODE_ENV === 'production') {
    url = 'https://stackoverflow.com/';
  }
  return url;
};

export const getApiMG = () => apimg;
export const getHostName = () => host_name;
