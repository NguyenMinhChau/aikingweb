import {SCREEN_NAVIGATE} from '../components/routersConfig/General.config';
import {ToastShow} from '../utils/Toast';
import {axiosGetNoToken, axiosPostNoToken} from '../utils/axios/axiosInstance';
import {
  getAsyncCacheAccessToken,
  getAsyncCacheCurrentUser,
  removeAsyncCache,
  setAsyncCacheAccessToken,
  setAsyncCacheCurrentUser,
} from '../utils/cache.services';
import {TYPE_TOAST} from '../utils/toast.config';
import {errorMessage, processToken} from './jwt';

// ?! AUTH REGISTER - OK
export const AUTH_REGISTER = async (props = {}) => {
  const {
    email,
    username,
    setTxtButtonLogin,
    setShowOtpInput,
    setLoad,
    setIsRegister,
  } = props;
  try {
    const resPost = await axiosPostNoToken(`auth/register`, {
      email: email,
      name: username,
    });
    setTxtButtonLogin('SENDING OTP');
    setShowOtpInput(true);
    setLoad(false);
    setIsRegister(false);
    ToastShow({
      type: TYPE_TOAST.INFO,
      propsMessage: {
        message: 'Đã gửi OTP về email, vui lòng kiểm tra email của bạn!',
        action: 'AUTH_REGISTER',
        pathFile: 'services/auth.js',
      },
    });
  } catch (err) {
    setTxtButtonLogin('GET OTP');
    setShowOtpInput(false);
    setLoad(false);
    ToastShow({
      type: TYPE_TOAST.ERROR,
      propsMessage: {
        message: errorMessage(err),
        action: 'AUTH_REGISTER',
        pathFile: 'services/auth.js',
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
      propsMessage: {
        message: 'Đã gửi OTP về email, vui lòng kiểm tra email của bạn!',
        action: 'AUTH_SEND_OTP_CODE',
        pathFile: 'services/auth.js',
      },
    });
  } catch (err) {
    setTxtButtonLogin('GET OTP');
    setShowOtpInput(false);
    setLoad(false);
    ToastShow({
      type: TYPE_TOAST.ERROR,
      propsMessage: {
        message: errorMessage(err),
        action: 'AUTH_SEND_OTP_CODE',
        pathFile: 'services/auth.js',
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
  console.log('props: ', props);
  try {
    const resPost = await axiosPostNoToken(`auth/login/`, {
      email: email,
      otp: otpCode,
    });
    console.log('resPost: ', resPost);
    setTxtButtonLogin('GET OTP');
    setShowOtpInput(false);
    setEmailValue('');
    await setAsyncCacheCurrentUser(resPost.metadata);
    await setAsyncCacheAccessToken({
      accessToken: resPost.metadata.tokens.accessToken,
    });
    await getAsyncCacheCurrentUser(dispatch);
    await getAsyncCacheAccessToken(dispatch);
    ToastShow({
      type: TYPE_TOAST.INFO,
      propsMessage: {
        message: 'Đăng nhập thành công',
        action: 'AUTH_VERIFY_OTP_CODE',
        pathFile: 'services/auth.js',
      },
    });
    setLoad(false);
    navigation.navigate(SCREEN_NAVIGATE.Dashboard_Screen);
  } catch (err) {
    console.log('err: ', err);
    setLoad(false);
    setTxtButtonLogin('SENDING OTP');
    ToastShow({
      type: TYPE_TOAST.ERROR,
      propsMessage: {
        message: errorMessage(err),
        action: 'AUTH_VERIFY_OTP_CODE',
        pathFile: 'services/auth.js',
      },
    });
  }
};
// ?! AUTH LOGOUT - OK
export const AUTH_LOGOUT = async (props = {}) => {
  const {dispatch, navigation} = props;
  try {
    await removeAsyncCache();
    navigation.navigate(SCREEN_NAVIGATE.Login_Screen);
  } catch (err) {
    ToastShow({
      type: TYPE_TOAST.ERROR,
      propsMessage: {
        message: 'Đã xảy ra lỗi. Vui lòng liên hệ admin',
        action: 'AUTH_LOGOUT',
        pathFile: 'services/auth.js',
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
  } catch (err) {
    ToastShow({
      type: TYPE_TOAST.ERROR,
      propsMessage: {
        message: 'Đã xảy ra lỗi. Vui lòng liên hệ admin',
        action: 'AUTH_RETRIEVE',
        pathFile: 'services/auth.js',
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
      propsMessage: {
        message: 'Đăng nhập thành công',
        action: 'AUTH_BY_TOKEN',
        pathFile: 'services/auth.js',
      },
    });

    navigation.navigate(SCREEN_NAVIGATE.Dashboard_Screen);
  } catch (err) {
    console.log('err: ', err);
    ToastShow({
      type: TYPE_TOAST.ERROR,
      propsMessage: {
        message: errorMessage(err),
        action: 'AUTH_BY_TOKEN',
        pathFile: 'services/auth.js',
      },
    });
  }
};
