/* eslint-disable prettier/prettier */
import {SET_DEPOSITS} from '../actions';

export const setDepositsPL = payload => {
  return {
    type: SET_DEPOSITS,
    payload,
  };
};
