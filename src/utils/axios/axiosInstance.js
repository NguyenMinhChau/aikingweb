import axios from 'axios';
import jwtDecode from 'jwt-decode';
import {URL_SERVER} from '@env';
import {getAsyncCacheAccessTokenKEY} from '../cache.services';
import {ToastShow} from '../Toast';
import {TYPE_TOAST} from '../toast.config';
import {isValidToken} from '../../services/jwt';

const HOST_SERVER = `${URL_SERVER}/`;

//?! AXIOS SERVER: https://api.teslaacademy.shop/
export const axiosInstance = axios.create({
  baseURL: `${HOST_SERVER}`,
});
export const axiosInstanceNoToken = axios.create({
  baseURL: `${HOST_SERVER}`,
});

// ? AUTO ADD TOKEN TO HEADER WHEN CALL API
axiosInstance.interceptors.request.use(
  async config => {
    const accessToken = await getAsyncCacheAccessTokenKEY();
    const tokenAccess = accessToken?.accessToken;
    if (tokenAccess && isValidToken(tokenAccess)) {
      const decoded = await jwtDecode(accessToken?.accessToken);
      config.headers.Authorization = `Bearer ${tokenAccess}`;
      config.headers['client-id'] = decoded?.userId;
    } else {
      ToastShow({
        type: TYPE_TOAST.ERROR,
        props: {
          message: 'Hết phiên đăng nhập. Vui lòng đăng xuất và đăng nhập lại!',
        },
      });
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export const axiosGet = async (path, options = {}, others = {}) => {
  const res = await axiosInstance.get(path, options, others);
  console.log('HOST_SERVER GET: ', `${HOST_SERVER}/${path}`);
  return res.data;
};

export const axiosPost = async (path, options = {}, others = {}) => {
  const res = await axiosInstance.post(path, options, others);
  console.log('HOST_SERVER POST: ', `${HOST_SERVER}/${path}`);
  return res.data;
};

export const axiosPut = async (path, options = {}, others = {}) => {
  const res = await axiosInstance.put(path, options, others);
  console.log('HOST_SERVER PUT: ', `${HOST_SERVER}/${path}`);
  return res.data;
};

export const axiosDelete = async (path, options = {}, others = {}) => {
  const res = await axiosInstance.delete(path, options, others);
  console.log('HOST_SERVER DELETE: ', `${HOST_SERVER}/${path}`);
  return res.data;
};

export const axiosGetNoToken = async (path, options = {}, others = {}) => {
  const res = await axiosInstanceNoToken.get(path, options, others);
  console.log('HOST_SERVER GET NO TOKEN: ', `${HOST_SERVER}/${path}`);
  return res.data;
};

export const axiosPostNoToken = async (path, options = {}, others = {}) => {
  const res = await axiosInstanceNoToken.post(path, options, others);
  console.log('HOST_SERVER POST NO TOKEN: ', `${HOST_SERVER}/${path}`);
  return res.data;
};

export const axiosPutNoToken = async (path, options = {}, others = {}) => {
  const res = await axiosInstanceNoToken.put(path, options, others);
  console.log('HOST_SERVER PUT NO TOKEN: ', `${HOST_SERVER}/${path}`);
  return res.data;
};

export const axiosDeleteNoToken = async (path, options = {}, others = {}) => {
  const res = await axiosInstanceNoToken.delete(path, options, others);
  console.log('HOST_SERVER DELETE NO TOKEN: ', `${HOST_SERVER}/${path}`);
  return res.data;
};
