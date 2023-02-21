/* eslint-disable prettier/prettier */
import {SET_WITHDRAWS} from '../actions';

export const setWithdrawsPL = payload => {
  return {
    type: SET_WITHDRAWS,
    payload,
  };
};
