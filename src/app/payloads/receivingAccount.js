/* eslint-disable prettier/prettier */
import {SET_RECEIVING_ACCOUNT} from '../actions';

export const setReceivingAccountPL = payload => {
  return {
    type: SET_RECEIVING_ACCOUNT,
    payload,
  };
};
