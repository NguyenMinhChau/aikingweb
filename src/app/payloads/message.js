/* eslint-disable prettier/prettier */
import {SET_MESSAGE} from '../actions';

export const setMessagePL = payload => {
  return {
    type: SET_MESSAGE,
    payload,
  };
};
