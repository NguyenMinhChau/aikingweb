/* eslint-disable prettier/prettier */
import {SET_DATA_ASSETS} from '../actions';

export const setDataAssetsPL = payload => {
  return {
    type: SET_DATA_ASSETS,
    payload,
  };
};
