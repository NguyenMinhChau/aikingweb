/* eslint-disable prettier/prettier */
import {SET_CONTRACTS} from '../actions';

export const setContractsPL = payload => {
  return {
    type: SET_CONTRACTS,
    payload,
  };
};
