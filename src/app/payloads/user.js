/* eslint-disable prettier/prettier */
import {SET_CURRENT_USER, SET_USER_BY_ID} from '../actions';

export const setCurrentUserPL = payload => {
  return {
    type: SET_CURRENT_USER,
    payload,
  };
};
export const setUserByIdPL = payload => {
  return {
    type: SET_USER_BY_ID,
    payload,
  };
};
