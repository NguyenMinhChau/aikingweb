import {SET_DATA, SET_TOGGLE} from './AppContext.actions';
import {
  ADMIN_STATE,
  CHAT_STATE,
  DATE_TIME_STATE,
  FILE_STATE,
  PLAN_POST_STATE,
  USER_LIST_STATE,
} from './AppContext.state';

const initialStateApp = {
  set_data: {
    currentUser: null,
    accessToken: null,
    cookieCurrentUser: null,
    iotAccessToken: null,
    dataByObjId: null,
    appearance_display: null,
    loader_slider_used: null,
    search: '',
    month: '',
    date_time: DATE_TIME_STATE,
    chat: CHAT_STATE,
    file: FILE_STATE,
    user_list: USER_LIST_STATE,
    plan_post: PLAN_POST_STATE,
    admin: ADMIN_STATE,
  },
  set_toggle: {
    isVisible_menu: false,
    isVisible_search: false,
    submitting: false,
  },
};

const SET_DATA_PAYLOAD = payload => {
  return {
    type: SET_DATA,
    key: payload.key,
    value: payload.value,
  };
};
const SET_TOGGLE_PAYLOAD = payload => {
  return {
    type: SET_TOGGLE,
    key: payload.key,
    value: payload.value,
  };
};

const reducer = (state, action) => {
  switch (action.type) {
    case SET_DATA:
      return {
        ...state,
        set_data: {
          ...state.set_data,
          [action.key]:
            typeof state.set_data[action.key] !== 'object'
              ? action.value
              : {
                  ...state.set_data[action.key],
                  ...action.value,
                },
        },
      };
    case SET_TOGGLE:
      return {
        ...state,
        set_toggle: {
          ...state.set_toggle,
          [action.key]:
            typeof state.set_toggle[action.key] !== 'object'
              ? action.value
              : {
                  ...state.set_toggle[action.key],
                  ...action.value,
                },
        },
      };
    default:
      return state;
  }
};
export default reducer;
export {initialStateApp, SET_DATA_PAYLOAD, SET_TOGGLE_PAYLOAD};
