import axios from 'axios';
import jwt_decode from 'jwt-decode';
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
  let resPost = null;
  try {
    resPost = await authPost('register', {
      email: email,
      password: password,
      username: username,
    });
    if (resPost.status === 201) {
      setIsProcess(false);
      setSnackbar({
        open: true,
        type: 'success',
        message: resPost?.message || 'Đăng ký thành công',
      });
      history(routers.login);
    }
  } catch (e: any) {
    setIsProcess(false);
    setSnackbar({
      open: true,
      type: 'error',
      message: e?.response?.data?.message || 'Đăng ký thất bại',
    });
  }
};
// LOGIN AUTHEN
export const authLoginSV = async (props: any) => {
  const { username, password, setSnackbar, history, dispatch, setIsProcess } =
    props;
  let resPost = null;
  try {
    resPost = await authPost('login', {
      username: username,
      password: password,
    });
    if (resPost.status === 200) {
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
    }
  } catch (e: any) {
    setIsProcess(false);
    setSnackbar({
      open: true,
      type: 'error',
      message: e?.response?.data?.message || 'Đăng nhập thất bại',
    });
  }
};
// LOGOUT AUTHEN
export const authLogoutSV = async (props: any) => {
  const { email, history, setSnackbar, dispatch } = props;
  let resPost = null;
  try {
    resPost = await authPost(`logout/${email}`, {});
    if (resPost.status === 200) {
      await removeStore();
      await dispatch(
        setData({
          currentUser: null,
          username: '',
          email: '',
        })
      );
      setSnackbar({
        open: true,
        type: 'success',
        message: resPost?.message || 'Đăng xuất thành công',
      });
      history(routers.home);
    }
  } catch (e: any) {
    setSnackbar({
      open: true,
      type: 'error',
      message: e?.response?.data?.message || 'Đăng xuất thất bại',
    });
  }
};

export const refreshToken = async ({
  currentUser,
  handleFunc,
  dispatch,
  setData,
  setSnackbar,
  id,
}: {
  currentUser: any;
  handleFunc: any;
  dispatch: any;
  setData: any;
  setSnackbar: any;
  id?: any;
}) => {
  try {
    const accessToken = currentUser?.token;
    if (accessToken) {
      const decodedToken: any = await jwt_decode(accessToken);
      const date = new Date();
      if (decodedToken.exp < date.getTime() / 1000) {
        const res = await authGet(`refreshToken/${currentUser?.email}`);
        if (res.status === 200) {
          const refreshUser = {
            ...currentUser,
            token: res.data.toString(),
          };
          await setStore(refreshUser);
          dispatch(
            setData({
              currentUser: getStore(),
            })
          );
          currentUser.token = `${res.data}`;
          handleFunc(refreshUser, id ? id : '');
          return refreshUser;
        }
      }
      handleFunc(currentUser, id ? id : '');
      return currentUser;
    }
  } catch (e: any) {
    setSnackbar({
      open: true,
      type: 'error',
      message:
        e?.response?.data?.message ||
        'Refresh token không tìm thấy. Vui lòng đăng xuất và đăng nhập lại, xin cảm ơn!',
    });
  }
};
