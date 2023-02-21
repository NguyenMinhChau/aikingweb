/* eslint-disable prettier/prettier */
import {SET_TOKEN_FORGOT} from '../actions';

export const setTokenForgot = payload => {
  return {
    type: SET_TOKEN_FORGOT,
    payload,
  };
};
