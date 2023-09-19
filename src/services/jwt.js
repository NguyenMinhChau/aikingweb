import jwtDecode from 'jwt-decode';
import {SCREEN_NAVIGATE} from '../components/routersConfig/General.config';
import {
  getAsyncCacheAccessToken,
  removeAsyncCache,
  setAsyncCacheAccessToken,
} from '../utils/cache.services';
import {axiosGetNoToken} from '../utils/axios/axiosInstance';
import axios from 'axios';

const {ToastShow} = require('../utils/Toast');
const {TYPE_TOAST} = require('../utils/toast.config');

const isValidToken = accessToken => {
  if (!accessToken) {
    ToastShow({
      type: TYPE_TOAST.INFO,
      propsMessage: {
        message: 'Vui lòng đăng nhập lại!',
        action: 'isValidToken',
        pathFile: 'services/jwt.js',
      },
    });

    return false;
  }
  const decoded = jwtDecode(accessToken);

  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

const handleTokenExpired = (exp, navigation, dispatch) => {
  let expiredTimer;

  const currentTime = Date.now();

  //? Test token expires after 10s
  // const timeLeft = currentTime + 10000 - currentTime // ~10s

  const timeLeft = exp * 1000 - currentTime;

  clearTimeout(expiredTimer);

  expiredTimer = setTimeout(() => {
    ToastShow({
      type: TYPE_TOAST.WARNING,
      propsMessage: {
        message: 'Hết phiên đăng nhập!',
        action: 'handleTokenExpired',
        pathFile: 'services/jwt.js',
      },
    });

    removeAsyncCache();

    navigation.navigate(SCREEN_NAVIGATE.Login_Screen);
  }, timeLeft);
};

const setSession = async (accessToken, navigation, dispatch) => {
  if (accessToken) {
    await setAsyncCacheAccessToken({accessToken});
    await getAsyncCacheAccessToken(dispatch);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    // This function below will handle when token is expired
    const {exp} = jwtDecode(accessToken); // ~5 days by minimals server

    handleTokenExpired(exp, navigation, dispatch);
  } else {
    await removeAsyncCache();
    delete axios.defaults.headers.common.Authorization;
  }
};

export const errorMessage = error => {
  const errRaw = error?.response?.data?.errors || [];

  const errList = Array.isArray(errRaw) ? errRaw : [errRaw];

  const fMessage = item => {
    return item?.msg || item?.param || item?.message;
  };

  const msg = errList?.map(i => fMessage(i)).join(', ');

  return msg;
};

const processToken = async (
  accessToken,
  login = false,
  navigation,
  dispatch,
) => {
  setSession(accessToken, navigation, dispatch);

  try {
    // TODO:
    const response = await axiosGetNoToken('auth/get-info-user-by-token');

    const user = {
      ...response?.metadata,
    };

    return user;
  } catch (error) {
    const msg = error?.errors?.message || errorMessage(error);

    ToastShow({
      type: TYPE_TOAST.ERROR,
      propsMessage: {
        message: msg,
        action: 'processToken',
        pathFile: 'services/jwt.js',
      },
    });
  }
};

export {isValidToken, processToken, setSession};
