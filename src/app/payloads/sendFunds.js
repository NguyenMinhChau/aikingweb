/* eslint-disable prettier/prettier */
import {SET_SEND_FUNDS} from '../actions';

export const setFundsPL = payload => {
  return {
    type: SET_SEND_FUNDS,
    payload,
  };
};
