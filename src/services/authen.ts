import axios from 'axios';
import routers from '@/routers/routers';
import { setData } from '@/appState/reducer';
import {
  getStore,
  setStore,
  removeStore,
} from '@/helpers/localStore/localStore';
// AUTHENTICATION
export const authInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_URL_SERVER}auth/`,
  withCredentials: true,
});

export const authPost = async (path: string, options = {}) => {
  const res = await authInstance.post(path, options);
  return res.data;
};
export const authGet = async (path: string, options = {}) => {
  const res = await authInstance.get(path, options);
  return res.data;
};

// REGISTER USER
export const authRegisterSV = async (props: any) => {
  const { email, password, username, history, setIsProcess, setSnackbar } =
    props;
  const resPost = await authPost('register', {
    email: email,
    password: password,
    username: username,
  });
  switch (resPost.status) {
    case 201:
      setIsProcess(false);
      setSnackbar({
        open: true,
        type: 'success',
        message: resPost?.message || 'Đăng ký thành công',
      });
      history(routers.login);
      break;
    case 1:
    case 2:
    case 304:
    case 500:
      setIsProcess(false);
      setSnackbar({
        open: true,
        type: 'error',
        message: resPost?.message || 'Đăng ký thất bại',
      });
      break;
    default:
      break;
  }
};
// LOGIN AUTHEN
export const authLoginSV = async (props: any) => {
  const { username, password, setSnackbar, history, dispatch, setIsProcess } =
    props;
  const resPost = await authPost('login', {
    username: username,
    password: password,
  });
  switch (resPost.status) {
    case 200: {
      await setStore({
        token: resPost.metadata?.token,
        username: resPost.metadata?.user?.payment?.username,
        email: resPost.metadata?.user?.payment?.email,
        rule: resPost.metadata?.user?.payment?.rule,
        rank: resPost.metadata?.user?.rank,
        id: resPost.metadata?.user?._id,
        balance: resPost.metadata?.user?.Wallet?.balance,
      });
      await dispatch(
        setData({
          currentUser: getStore(),
        })
      );
      setIsProcess(false);
      setSnackbar({
        open: true,
        type: 'success',
        message: resPost?.message || 'Đăng nhập thành công',
      });
      history(routers.home);
      break;
    }
    case 500:
      setIsProcess(false);
      setSnackbar({
        open: true,
        type: 'error',
        message: resPost?.message || 'Đăng nhập thất bại',
      });
      break;
    default:
      break;
  }
};
// LOGOUT AUTHEN
export const authLogoutSV = async (props: any) => {
  const { email, history, setSnackbar, dispatch } = props;
  const resGet = await authPost(`logout/${email}`, {});
  switch (resGet.status) {
    case 200:
      await removeStore();
      await dispatch(
        setData({
          currentUser: null,
        })
      );
      setSnackbar({
        open: true,
        type: 'success',
        message: resGet?.message || 'Đăng xuất thành công',
      });
      history(routers.home);
      break;
    case 1:
    case 2:
    case 304:
    case 500:
      setSnackbar({
        open: true,
        type: 'error',
        message: resGet?.message || 'Đăng xuất thất bại',
      });
      break;
    default:
      break;
  }
};
