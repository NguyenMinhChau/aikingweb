import Clipboard from '@react-native-clipboard/clipboard';
import {ToastShow} from './Toast';
import {TYPE_TOAST} from './toast.config';

export const onCopyToClipboard = text => {
  Clipboard.setString(text);
  ToastShow({
    type: TYPE_TOAST.SUCCESS,
    propsMessage: {
      message: 'Đã copy vào clipboard',
      action: 'onCopyToClipboard',
      pathFile: 'utils/copy.clipboard.js',
    },
  });
};
