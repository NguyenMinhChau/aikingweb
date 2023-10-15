import {
  SET_DATA_PAYLOAD,
  SET_TOGGLE_PAYLOAD,
} from '../components/Context/AppContext.reducer';
import {SCREEN_NAVIGATE} from '../components/routersConfig/General.config';
import {ToastShow} from '../utils/Toast';
import {axiosPost, axiosPut} from '../utils/axios/axiosInstance';
import {TYPE_TOAST} from '../utils/toast.config';
import {errorMessage} from './jwt';

export const GET_LIST_TIME_KEEPING_BY_MONTH_CURRENT = async (props = {}) => {
  const {idUser, dispatch, state} = props;
  try {
    const resPost = await axiosPost(`attendance/list/month/${idUser}`);
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'chat',
        value: {
          ...state.chat,
          data_chat: resPost?.metadata || [],
        },
      }),
    );
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

export const CHECK_IN = async (props = {}) => {
  const {idUser, dispatch, body, state, setSelectedImages} = props;
  try {
    const resPost = await axiosPost(`attendance/checkIn/${idUser}`, body);
    dispatch(SET_TOGGLE_PAYLOAD({key: 'submitting', value: false}));
    setSelectedImages(null);
    await GET_LIST_TIME_KEEPING_BY_MONTH_CURRENT({idUser, dispatch, state});
    ToastShow({
      type: TYPE_TOAST.SUCCESS,
      props: {
        message: 'Checkin thành công',
      },
    });
  } catch (error) {
    const msg =
      error?.errors?.message ||
      error?.response?.data?.message ||
      errorMessage(error);
    dispatch(SET_TOGGLE_PAYLOAD({key: 'submitting', value: false}));
    setSelectedImages(null);
    await GET_LIST_TIME_KEEPING_BY_MONTH_CURRENT({idUser, dispatch, state});
    ToastShow({
      type: TYPE_TOAST.ERROR,
      props: {
        message: msg,
      },
    });
  }
};

export const CHECK_OUT = async (props = {}) => {
  const {idUser, dispatch, body, state, setSelectedImages} = props;
  try {
    const resPut = await axiosPut(`attendance/checkOut/${idUser}`, body);
    dispatch(SET_TOGGLE_PAYLOAD({key: 'submitting', value: false}));
    setSelectedImages(null);
    await GET_LIST_TIME_KEEPING_BY_MONTH_CURRENT({idUser, dispatch, state});
    ToastShow({
      type: TYPE_TOAST.SUCCESS,
      props: {
        message: 'CheckOut thành công',
      },
    });
  } catch (error) {
    const msg =
      error?.errors?.message ||
      error?.response?.data?.message ||
      errorMessage(error);
    dispatch(SET_TOGGLE_PAYLOAD({key: 'submitting', value: false}));
    setSelectedImages(null);
    await GET_LIST_TIME_KEEPING_BY_MONTH_CURRENT({idUser, dispatch, state});
    ToastShow({
      type: TYPE_TOAST.ERROR,
      props: {
        message: msg,
      },
    });
  }
};

export const GET_LIST_TIME_KEEPING_BY_MONTH_CHOOSE = async (props = {}) => {
  const {idUser, dispatch, state, month, setOpenMenu} = props;
  try {
    const resPost = await axiosPost(`attendance/list/month-choose/${idUser}`, {
      dateChoose: month, // YYYY/DD
    });
    dispatch(
      SET_TOGGLE_PAYLOAD({
        key: 'submitting',
        value: false,
      }),
    );
    dispatch(SET_DATA_PAYLOAD({key: 'month', value: ''}));
    setOpenMenu(false);
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'chat',
        value: {
          ...state.chat,
          data_chat: resPost?.metadata || [],
        },
      }),
    );
  } catch (error) {
    const msg =
      error?.errors?.message ||
      error?.response?.data?.message ||
      errorMessage(error);
    setOpenMenu(false);
    dispatch(
      SET_TOGGLE_PAYLOAD({
        key: 'submitting',
        value: false,
      }),
    );
    dispatch(SET_DATA_PAYLOAD({key: 'month', value: ''}));
    ToastShow({
      type: TYPE_TOAST.ERROR,
      props: {
        message: msg,
      },
    });
  }
};
