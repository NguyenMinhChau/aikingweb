import {ToastAndroid} from 'react-native';
import Toast from 'react-native-toast-message';
import {TYPE_TOAST} from '../toast.config';

export const ToastShow = (props = {}) => {
  const {
    type,
    propsMessage,
    duration,
    autoHide = true,
    onShow = () => {},
    onHide = () => {},
    onPress = () => {},
  } = {...props};
  Toast.show(
    {
      type: type,
      props: propsMessage,
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
    propsMessage: {
      message: 'Chức năng đang phát triển',
      action: 'Development',
      pathFile: 'utils/Toast/index.js',
    },
  });
};

export const ToastNotYetAPI = () => {
  ToastShow({
    type: TYPE_TOAST.INFO,
    propsMessage: {
      message: 'Chức năng chưa gắn API',
      action: 'NotYetAPI',
      pathFile: 'utils/Toast/index.js',
    },
  });
};

export const ToastNotYetCallAPI = () => {
  ToastShow({
    type: TYPE_TOAST.INFO,
    propsMessage: {
      message: 'Chức năng chưa gọi API',
      action: 'NotYetCallAPI',
      pathFile: 'utils/Toast/index.js',
    },
  });
};
