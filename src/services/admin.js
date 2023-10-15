import {
  SET_DATA_PAYLOAD,
  SET_TOGGLE_PAYLOAD,
} from '../components/Context/AppContext.reducer';
import {SCREEN_NAVIGATE} from '../components/routersConfig/General.config';
import {ToastShow} from '../utils/Toast';
import {axiosDelete, axiosPost, axiosPut} from '../utils/axios/axiosInstance';
import {TYPE_TOAST} from '../utils/toast.config';
import {errorMessage} from './jwt';

export const GET_LIST_USER = async (props = {}) => {
  const {dispatch, state} = props;
  try {
    const resPost = await axiosPost(`admin/users`);
    dispatch(
      SET_TOGGLE_PAYLOAD({
        key: 'submitting',
        value: false,
      }),
    );
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'admin',
        value: {
          ...state.set_data.admin,
          list_user: resPost?.metadata || [],
        },
      }),
    );
  } catch (error) {
    const msg =
      error?.errors?.message ||
      error?.response?.data?.message ||
      errorMessage(error);
    dispatch(
      SET_TOGGLE_PAYLOAD({
        key: 'submitting',
        value: false,
      }),
    );
    ToastShow({
      type: TYPE_TOAST.ERROR,
      props: {
        message: msg,
      },
    });
  }
};

export const GET_LIST_USER_BY_GROUP = async (props = {}) => {
  const {dispatch, state, group, month} = props;
  try {
    const resPost = await axiosPost(`admin/users-by-group`, {
      group,
      dateChoose: month.replace('-', '/'), // YYYY/MM
    });
    dispatch(
      SET_TOGGLE_PAYLOAD({
        key: 'submitting',
        value: false,
      }),
    );
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'admin',
        value: {
          ...state.set_data.admin,
          list_calculator_salary: resPost?.metadata || [],
        },
      }),
    );
  } catch (error) {
    const msg =
      error?.errors?.message ||
      error?.response?.data?.message ||
      errorMessage(error);
    dispatch(
      SET_TOGGLE_PAYLOAD({
        key: 'submitting',
        value: false,
      }),
    );
    // ToastShow({
    //   type: TYPE_TOAST.ERROR,
    //   props: {
    //     message: msg,
    //   },
    // });
  }
};

export const GET_LIST_USER_TIME_KEEPING = async (props = {}) => {
  const {dispatch, state} = props;
  try {
    const resPost = await axiosPost(`admin/attendance-card/status-handle`);
    dispatch(
      SET_TOGGLE_PAYLOAD({
        key: 'submitting',
        value: false,
      }),
    );
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'admin',
        value: {
          ...state.set_data.admin,
          list_user_time_keeping: resPost?.metadata || [],
        },
      }),
    );
  } catch (error) {
    const msg =
      error?.errors?.message ||
      error?.response?.data?.message ||
      errorMessage(error);
    dispatch(
      SET_TOGGLE_PAYLOAD({
        key: 'submitting',
        value: false,
      }),
    );
    ToastShow({
      type: TYPE_TOAST.ERROR,
      props: {
        message: msg,
      },
    });
  }
};

// UPDATE TIME_KEEPING STATUS
export const UPDATE_TIME_KEEPING_STATUS = async (props = {}) => {
  const {dispatch, state, status, idTimeKeeping} = props;
  try {
    const resPut = await axiosPut(`admin/attendance-cards/${idTimeKeeping}`, {
      status,
    });
    dispatch(
      SET_TOGGLE_PAYLOAD({
        key: 'submitting',
        value: false,
      }),
    );
    GET_LIST_USER_TIME_KEEPING({dispatch, state});
    ToastShow({
      type: TYPE_TOAST.SUCCESS,
      props: {
        message: 'Thao tác thành công',
      },
    });
  } catch (error) {
    const msg =
      error?.errors?.message ||
      error?.response?.data?.message ||
      errorMessage(error);
    dispatch(
      SET_TOGGLE_PAYLOAD({
        key: 'submitting',
        value: false,
      }),
    );
    ToastShow({
      type: TYPE_TOAST.ERROR,
      props: {
        message: msg,
      },
    });
  }
};

// SỬA LƯƠNG CƠ BẢN
export const UPDATE_WAGE_EMPLOYEE = async (props = {}) => {
  const {dispatch, state, idUser, wage} = props;
  try {
    const resPut = await axiosPut(`admin/users/${idUser}`, {
      wage: parseFloat(wage.replace(/\./g, '')),
    });
    dispatch(
      SET_TOGGLE_PAYLOAD({
        key: 'submitting',
        value: false,
      }),
    );
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'admin',
        value: {
          ...state.admin,
          wage: '',
        },
      }),
    );
    ToastShow({
      type: TYPE_TOAST.SUCCESS,
      props: {
        message: 'Thao tác thành công',
      },
    });
    GET_LIST_USER({dispatch, state});
  } catch (error) {
    const msg =
      error?.errors?.message ||
      error?.response?.data?.message ||
      errorMessage(error);
    dispatch(
      SET_TOGGLE_PAYLOAD({
        key: 'submitting',
        value: false,
      }),
    );
    ToastShow({
      type: TYPE_TOAST.ERROR,
      props: {
        message: msg,
      },
    });
  }
};

// CHẤM CÔNG BÙ
export const TIME_KEEPING_COMPENSATE = async (props = {}) => {
  const {dispatch, state, idUser, date, hours} = props;
  try {
    const resPost = await axiosPost(
      `admin/attendance-cards/compensate/${idUser}`,
      {
        date: date, // YYYY/MM/DD
        totalHours: hours, // number
      },
    );
    dispatch(
      SET_TOGGLE_PAYLOAD({
        key: 'submitting',
        value: false,
      }),
    );
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'admin',
        value: {
          ...state.admin,
          date: '',
          hours: 0,
        },
      }),
    );
    ToastShow({
      type: TYPE_TOAST.SUCCESS,
      props: {
        message: 'Thao tác thành công',
      },
    });
  } catch (error) {
    const msg =
      error?.errors?.message ||
      error?.response?.data?.message ||
      errorMessage(error);
    dispatch(
      SET_TOGGLE_PAYLOAD({
        key: 'submitting',
        value: false,
      }),
    );
    ToastShow({
      type: TYPE_TOAST.ERROR,
      props: {
        message: msg,
      },
    });
  }
};

export const GET_LIST_POST_PLAN = async (props = {}) => {
  const {dispatch, state} = props;
  try {
    const resPost = await axiosPost(`admin/post/all`);
    dispatch(
      SET_TOGGLE_PAYLOAD({
        key: 'submitting',
        value: false,
      }),
    );
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'admin',
        value: {
          ...state.set_data.admin,
          list_post_plan: resPost?.metadata || [],
        },
      }),
    );
  } catch (error) {
    const msg =
      error?.errors?.message ||
      error?.response?.data?.message ||
      errorMessage(error);
    dispatch(
      SET_TOGGLE_PAYLOAD({
        key: 'submitting',
        value: false,
      }),
    );
    ToastShow({
      type: TYPE_TOAST.ERROR,
      props: {
        message: msg,
      },
    });
  }
};

// CREATE NEW PLAN
export const CREATE_NEW_PLAN = async (props = {}) => {
  const {dispatch, state, payload} = props;
  try {
    const resPost = await axiosPost(`admin/post`, payload);
    dispatch(
      SET_TOGGLE_PAYLOAD({
        key: 'submitting',
        value: false,
      }),
    );
    ToastShow({
      type: TYPE_TOAST.SUCCESS,
      props: {
        message: 'Thao tác thành công',
      },
    });
    GET_LIST_POST_PLAN({state, dispatch});
  } catch (error) {
    const msg =
      error?.errors?.message ||
      error?.response?.data?.message ||
      errorMessage(error);
    dispatch(
      SET_TOGGLE_PAYLOAD({
        key: 'submitting',
        value: false,
      }),
    );
    ToastShow({
      type: TYPE_TOAST.ERROR,
      props: {
        message: msg,
      },
    });
  }
};

// UPDATE PLAN
export const UPDATE_PLAN = async (props = {}) => {
  const {dispatch, state, payload, idPlan, navigation} = props;
  try {
    const resPut = await axiosPut(`admin/post/${idPlan}`, payload);

    dispatch(
      SET_TOGGLE_PAYLOAD({
        key: 'submitting',
        value: false,
      }),
    );
    ToastShow({
      type: TYPE_TOAST.SUCCESS,
      props: {
        message: 'Thao tác thành công',
      },
    });
    GET_LIST_POST_PLAN({dispatch, state});
    navigation.navigate(SCREEN_NAVIGATE.Plan_Screen);
  } catch (error) {
    const msg =
      error?.errors?.message ||
      error?.response?.data?.message ||
      errorMessage(error);
    dispatch(
      SET_TOGGLE_PAYLOAD({
        key: 'submitting',
        value: false,
      }),
    );
    ToastShow({
      type: TYPE_TOAST.ERROR,
      props: {
        message: msg,
      },
    });
  }
};

// DELETE PLAN
export const DELETE_PLAN = async (props = {}) => {
  const {dispatch, idPlan, navigation} = props;
  try {
    const resDel = await axiosDelete(`admin/post/${idPlan}`);
    dispatch(
      SET_TOGGLE_PAYLOAD({
        key: 'submitting',
        value: false,
      }),
    );
    ToastShow({
      type: TYPE_TOAST.SUCCESS,
      props: {
        message: 'Thao tác thành công',
      },
    });
    navigation.navigate(SCREEN_NAVIGATE.Plan_Screen);
  } catch (error) {
    const msg =
      error?.errors?.message ||
      error?.response?.data?.message ||
      errorMessage(error);
    dispatch(
      SET_TOGGLE_PAYLOAD({
        key: 'submitting',
        value: false,
      }),
    );
    ToastShow({
      type: TYPE_TOAST.ERROR,
      props: {
        message: msg,
      },
    });
  }
};
