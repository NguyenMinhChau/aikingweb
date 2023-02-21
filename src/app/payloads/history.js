/* eslint-disable prettier/prettier */
import {
  SET_DATA_DEPOSITS_HISTORY,
  SET_DATA_WITHDRAWS_HISTORY,
} from '../actions';

export const setDepositsHistoryPL = payload => {
  return {
    type: SET_DATA_DEPOSITS_HISTORY,
    payload,
  };
};
export const setWithdrawsHistoryPL = payload => {
  return {
    type: SET_DATA_WITHDRAWS_HISTORY,
    payload,
  };
};
