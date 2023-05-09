/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import {authPost} from '../utils/axios/axiosInstance';
import {routersMain} from '../routers/Main';
import {routers} from '../routers/Routers';
import {toastShow} from '../utils/toast';
import {
  getAsyncStore,
  removeAsyncStore,
  removeStore,
  setAsyncStore,
} from '../utils/localStore/localStore';

// REGISTER AUTHEN
export const authRegisterSV = async (props = {}) => {
  const {email, password, username, navigation, setIsProcess, toast} = props;
  try {
    await authPost('register', {
      email: email,
      password: password,
      username: username,
    });
    setIsProcess(false);
    toastShow(toast, 'Đăng kí thành công!');
    navigation.navigate(routersMain.Login);
  } catch (err) {
    setIsProcess(false);
    toastShow(toast, `Đăng kí thất bại, lỗi ${err?.response?.data?.message}`);
  }
};
// LOGIN AUTHEN
export const authLoginSV = async (props = {}) => {
  const {email, password, toast, dispatch, navigation, setIsProcess} = props;
  try {
    const resPost = await authPost('login', {
      username: email,
      password: password,
    });
    // console.log('authLoginSV: ', resPost);
    await setAsyncStore({
      token: resPost?.metadata?.token,
      username: resPost?.metadata?.user?.payment?.username,
      email: resPost?.metadata?.user?.payment?.email,
      rule: resPost?.metadata?.user?.payment.rule,
      rank: resPost?.metadata?.user?.rank,
      id: resPost?.metadata?.user?._id,
      balance: resPost?.metadata?.user?.Wallet?.balance,
    });
    await getAsyncStore(dispatch);
    setIsProcess(false);
    toastShow(toast, 'Đăng nhập thành công!');
    navigation.navigate(routers.Home);
  } catch (err) {
    setIsProcess(false);
    toastShow(toast, `Đăng nhập thất bại, lỗi ${err?.response?.data?.message}`);
  }
};
// LOGOUT AUTHEN
export const authLogoutSV = async (props = {}) => {
  const {email_user, navigation, toast, dispatch} = props;
  try {
    const resPost = await authPost(`logout/${email_user}`, {});
    // console.log('authLogoutSV: ', resPost);
    await removeAsyncStore();
    await removeStore();
    await getAsyncStore(dispatch);
    toastShow(toast, 'Đăng xuất thành công!');
    navigation.navigate(routers.Home);
  } catch (err) {
    toastShow(toast, `Đăng xuất thất bại, lỗi ${err?.response?.data?.message}`);
  }
};
