import {ToastAndroid} from 'react-native';
import Toast from 'react-native-toast-message';
import {TYPE_TOAST} from '../toast.config';

export const ToastShow = (propsToast = {}) => {
  const {
    type,
    props,
    duration,
    autoHide = true,
    onShow = () => {},
    onHide = () => {},
    onPress = () => {},
  } = {...propsToast};
  Toast.show(
    {
      type: type,
      props,
      duration: duration || 3000,
      autoHide: autoHide,
      onShow: onShow,
      onHide: onHide,
      onPress: onPress,
    },
    ToastAndroid.SHORT,
  );
};

export const ToastDevelopment = () => {
  ToastShow({
    type: TYPE_TOAST.INFO,
    props: {
      message: 'Chức năng đang phát triển',
    },
  });
};

export const ToastNotYetAPI = () => {
  ToastShow({
    type: TYPE_TOAST.INFO,
    props: {
      message: 'Chức năng chưa gắn API',
    },
  });
};

export const ToastNotYetCallAPI = () => {
  ToastShow({
    type: TYPE_TOAST.INFO,
    props: {
      message: 'Chức năng chưa gọi API',
    },
  });
};
