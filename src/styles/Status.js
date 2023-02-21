/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {
  BGC_CANCEL_COLOR,
  BGC_COMPLETE_COLOR,
  BGC_CONFIRM_COLOR,
  BGC_VIP_COLOR,
  CANCEL_COLOR,
  COMPLETE_COLOR,
  CONFIRM_COLOR,
  PRIMARY_COLOR,
  VIP_COLOR,
  WHITE_COLOR,
} from './colors';

const stylesStatus = StyleSheet.create({
  status: {
    fontSize: 15,
    fontWeight: 'bold',
    lineHeight: 18,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 30,
    textTransform: 'capitalize',
  },
  confirm: {
    color: CONFIRM_COLOR,
  },
  complete: {
    color: COMPLETE_COLOR,
  },
  vip: {
    color: VIP_COLOR,
  },
  cancel: {
    color: CANCEL_COLOR,
  },
  primary: {
    color: PRIMARY_COLOR,
  },
  white: {
    color: WHITE_COLOR,
  },

  confirmbgc: {
    color: CONFIRM_COLOR,
    backgroundColor: BGC_CONFIRM_COLOR,
  },
  confirmbgcbold: {
    color: WHITE_COLOR,
    backgroundColor: CONFIRM_COLOR,
  },
  completebgc: {
    color: COMPLETE_COLOR,
    backgroundColor: BGC_COMPLETE_COLOR,
  },
  completebgcbold: {
    color: WHITE_COLOR,
    backgroundColor: COMPLETE_COLOR,
  },
  vipbgc: {
    color: VIP_COLOR,
    backgroundColor: BGC_VIP_COLOR,
  },
  vipbgcbold: {
    color: WHITE_COLOR,
    backgroundColor: VIP_COLOR,
  },
  cancelbgc: {
    color: CANCEL_COLOR,
    backgroundColor: BGC_CANCEL_COLOR,
  },
  cancelbgcbold: {
    color: WHITE_COLOR,
    backgroundColor: CANCEL_COLOR,
  },
  primarybgcbold: {
    color: WHITE_COLOR,
    backgroundColor: PRIMARY_COLOR,
  },
});

export default stylesStatus;
