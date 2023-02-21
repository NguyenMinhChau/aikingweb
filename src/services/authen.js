/* eslint-disable prettier/prettier */
import {authGet, authPost} from '../utils/axios/axiosInstance';
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
  const resPost = await authPost('register', {
    email: email,
    password: password,
    username: username,
  });
  // console.log('authRegisterSV: ', resPost);
  switch (resPost.code) {
    case 0:
      setIsProcess(false);
      toastShow(toast, 'Đăng kí thành công!');
      navigation.navigate(routersMain.Login);
      break;
    case 1:
    case 2:
    case 304:
    case 500:
      setIsProcess(false);
      toastShow(toast, `Đăng kí thất bại, lỗi ${resPost?.message}`);
      break;
    default:
      break;
  }
};
// LOGIN AUTHEN
export const authLoginSV = async (props = {}) => {
  const {email, password, toast, dispatch, navigation, setIsProcess} = props;
  const resPost = await authPost('login', {
    email: email,
    password: password,
  });
  // console.log('authLoginSV: ', resPost);
  switch (resPost.code) {
    case 0:
      await removeAsyncStore();
      await removeStore();
      await setAsyncStore({
        token: resPost?.data?.accessToken,
        username: resPost?.data?.user?.payment?.username,
        email: resPost?.data?.user?.payment?.email,
        rule: resPost?.data?.user?.payment.rule,
        rank: resPost?.data?.user?.rank,
        id: resPost?.data?.user?._id,
        balance: resPost?.data?.user?.Wallet?.balance,
      });
      await getAsyncStore(dispatch);
      setIsProcess(false);
      toastShow(toast, 'Đăng nhập thành công!');
      navigation.navigate(routers.Home);
      break;
    case 1:
    case 2:
    case 304:
    case 500:
      setIsProcess(false);
      toastShow(toast, `Đăng nhập thất bại, lỗi ${resPost?.message}`);
      break;
    default:
      break;
  }
};
// LOGOUT AUTHEN
export const authLogoutSV = async (props = {}) => {
  const {id_user, navigation, toast, dispatch} = props;
  const resGet = await authGet(`logout/${id_user}`, {});
  // console.log('authLogoutSV: ', resGet);
  switch (resGet.code) {
    case 0:
      await removeAsyncStore();
      await removeStore();
      // await setAsyncStore(null);
      await getAsyncStore(dispatch);
      toastShow(toast, 'Đăng xuất thành công!');
      navigation.navigate(routers.Home);
      break;
    case 1:
    case 2:
    case 304:
    case 500:
      toastShow(toast, `Đăng xuất thất bại, lỗi ${resGet?.message}`);
      break;
    default:
      break;
  }
};
