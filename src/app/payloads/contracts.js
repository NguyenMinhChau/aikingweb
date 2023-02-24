/* eslint-disable prettier/prettier */
import {SET_CONTRACTS, SET_DATA_CONTRACTS} from '../actions';

export const setContractsPL = payload => {
  return {
    type: SET_CONTRACTS,
    payload,
  };
};
export const setDataContractPL = payload => {
  return {
    type: SET_DATA_CONTRACTS,
    payload,
  };
};
