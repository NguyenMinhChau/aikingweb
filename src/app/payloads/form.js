/* eslint-disable prettier/prettier */
import {SET_FORM} from '../actions';

export const setFormValuePL = payload => {
  return {
    type: SET_FORM,
    payload,
  };
};
