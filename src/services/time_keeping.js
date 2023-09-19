import {ToastShow} from '../utils/Toast';
import {axiosPost, axiosPut} from '../utils/axios/axiosInstance';
import {TYPE_TOAST} from '../utils/toast.config';

export const CHECK_IN = async (props = {}) => {
  const {idUser, setProgress, body} = props;
  try {
    const resPost = await axiosPost(`attendance/checkIn/${idUser}`, body);
    console.log('resPost: ', resPost);
    setProgress(false);
    ToastShow({
      type: TYPE_TOAST.SUCCESS,
      propsMessage: {
        message: 'Checkin thành công',
        action: 'CHECK_IN',
        pathFile: 'services/time_keeping.js',
      },
    });
  } catch (err) {
    setProgress(false);
    ToastShow({
      type: TYPE_TOAST.ERROR,
      propsMessage: {
        message: 'Checkin thất bại',
        action: 'CHECK_IN',
        pathFile: 'services/time_keeping.js',
      },
    });
  }
};
export const CHECK_OUT = async (props = {}) => {
  const {idUser, setProgress, body} = props;
  try {
    const resPut = await axiosPut(`attendance/checkOut/${idUser}`, body);
    console.log('resPut: ', resPut);
    setProgress(false);
    ToastShow({
      type: TYPE_TOAST.SUCCESS,
      propsMessage: {
        message: 'CheckOut thành công',
        action: 'CHECK_OUT',
        pathFile: 'services/time_keeping.js',
      },
    });
  } catch (err) {
    setProgress(false);
    ToastShow({
      type: TYPE_TOAST.ERROR,
      propsMessage: {
        message: 'CheckOut thất bại',
        action: 'CHECK_OUT',
        pathFile: 'services/time_keeping.js',
      },
    });
  }
};
