import {SCREEN_NAVIGATE} from '../components/routersConfig/General.config';
import {ToastShow} from '../utils/Toast';
import {axiosGetNoToken, axiosPostNoToken} from '../utils/axios/axiosInstance';
import {
  getAsyncCacheAccessToken,
  getAsyncCacheCurrentUser,
  getAsyncCacheLoaderSliderUsed,
  removeAsyncCache,
  setAsyncCacheAccessToken,
  setAsyncCacheCurrentUser,
} from '../utils/cache.services';
import {getTokenDevice} from '../utils/notification.utils';
import {TYPE_TOAST} from '../utils/toast.config';
import {errorMessage, processToken} from './jwt';

// ?! AUTH REGISTER - OK
export const AUTH_REGISTER = async (props = {}) => {
  const {
    email,
    username,
    department,
    setTxtButtonLogin,
    setShowOtpInput,
    setLoad,
    setIsRegister,
  } = props;
  try {
    const resPost = await axiosPostNoToken(`auth/register`, {
      email: email,
      name: username,
      group: department,
    });
    setTxtButtonLogin('SENDING OTP');
    setShowOtpInput(true);
    setLoad(false);
    setIsRegister(false);
    ToastShow({
      type: TYPE_TOAST.INFO,
      props: {
        message: 'Đã gửi OTP về email, vui lòng kiểm tra email của bạn!',
      },
    });
  } catch (error) {
    const msg =
      error?.errors?.message ||
      error?.response?.data?.message ||
      errorMessage(error);
    setTxtButtonLogin('GET OTP');
    setShowOtpInput(false);
    setLoad(false);
    ToastShow({
      type: TYPE_TOAST.ERROR,
      props: {
        message: msg,
      },
    });
  }
};
// ?! AUTH LOGIN - OK
export const AUTH_SEND_OTP_CODE = async (props = {}) => {
  const {email, setTxtButtonLogin, setShowOtpInput, setLoad} = props;
  try {
    const resPost = await axiosPostNoToken(`auth/send-otp-login`, {
      email: email,
    });
    setTxtButtonLogin('SENDING OTP');
    setShowOtpInput(true);
    setLoad(false);
    ToastShow({
      type: TYPE_TOAST.INFO,
      props: {
        message: 'Đã gửi OTP về email, vui lòng kiểm tra email của bạn!',
      },
    });
  } catch (error) {
    const msg =
      error?.errors?.message ||
      error?.response?.data?.message ||
      errorMessage(error);
    setTxtButtonLogin('GET OTP');
    setShowOtpInput(false);
    setLoad(false);
    ToastShow({
      type: TYPE_TOAST.ERROR,
      props: {
        message: msg,
      },
    });
  }
};
// ?! AUTH VERIFY OTP CODE - OK
export const AUTH_VERIFY_OTP_CODE = async (props = {}) => {
  const {
    dispatch,
    state,
    otpCode,
    email,
    setTxtButtonLogin,
    setShowOtpInput,
    setEmailValue,
    setLoad,
    navigation,
  } = props;
  try {
    const deviceToken = await getTokenDevice();
    const resPost = await axiosPostNoToken(`auth/login/`, {
      email: email,
      otp: otpCode,
      deviceToken: deviceToken,
    });
    setTxtButtonLogin('GET OTP');
    setShowOtpInput(false);
    setEmailValue('');
    await setAsyncCacheCurrentUser(resPost.metadata);
    await setAsyncCacheAccessToken({
      accessToken: resPost.metadata.tokens.accessToken,
    });
    await getAsyncCacheCurrentUser(dispatch);
    await getAsyncCacheAccessToken(dispatch);
    await getAsyncCacheLoaderSliderUsed(dispatch);
    setTimeout(() => {
      ToastShow({
        type: TYPE_TOAST.INFO,
        props: {
          message: 'Đăng nhập thành công',
        },
      });
      setLoad(false);
      navigation.navigate(SCREEN_NAVIGATE.Dashboard_Screen);
    }, 2000);
  } catch (error) {
    const msg =
      error?.errors?.message ||
      error?.response?.data?.message ||
      errorMessage(error);
    setLoad(false);
    setTxtButtonLogin('SENDING OTP');
    ToastShow({
      type: TYPE_TOAST.ERROR,
      props: {
        message: msg,
      },
    });
  }
};
// ?! AUTH LOGOUT - OK
export const AUTH_LOGOUT = async (props = {}) => {
  const {dispatch} = props;
  try {
    await removeAsyncCache();
    await setAsyncCacheCurrentUser(null);
    await setAsyncCacheAccessToken({accessToken: null});
    await getAsyncCacheCurrentUser(dispatch);
    await getAsyncCacheAccessToken(dispatch);
  } catch (error) {
    const msg =
      error?.errors?.message ||
      error?.response?.data?.message ||
      errorMessage(error);
    ToastShow({
      type: TYPE_TOAST.ERROR,
      props: {
        message: msg,
      },
    });
  }
};
// ?! AUTH RETRIEVE - OK
export const AUTH_RETRIEVE = async (props = {}) => {
  const {dispatch, state, data, accessToken} = props;
  try {
    await setAsyncCacheCurrentUser(data);
    await setAsyncCacheAccessToken({accessToken});
    await getAsyncCacheCurrentUser(dispatch);
    await getAsyncCacheAccessToken(dispatch);
  } catch (error) {
    const msg =
      error?.errors?.message ||
      error?.response?.data?.message ||
      errorMessage(error);
    ToastShow({
      type: TYPE_TOAST.ERROR,
      props: {
        message: msg,
      },
    });
  }
};
// ?! AUTH BY TOKEN
export const AUTH_BY_TOKEN = async (props = {}) => {
  const {token, navigation, dispatch} = props;
  try {
    const user = await processToken(token, false, navigation, dispatch);

    await setAsyncCacheCurrentUser(user);
    await getAsyncCacheCurrentUser(dispatch);

    ToastShow({
      type: TYPE_TOAST.SUCCESS,
      props: {
        message: 'Đăng nhập thành công',
      },
    });

    navigation.navigate(SCREEN_NAVIGATE.Dashboard_Screen);
  } catch (error) {
    const msg =
      error?.errors?.message ||
      error?.response?.data?.message ||
      errorMessage(error);
    ToastShow({
      type: TYPE_TOAST.ERROR,
      props: {
        message: msg,
      },
    });
  }
};
