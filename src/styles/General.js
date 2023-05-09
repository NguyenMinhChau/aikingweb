/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {PRIMARY_COLOR} from './colors';

const stylesGeneral = StyleSheet.create({
  dflex: {
    display: 'flex',
  },
  flexRow: {
    flexDirection: 'row',
  },
  flexColumn: {
    flexDirection: 'column',
  },
  flexCenter: {
    alignItems: 'center',
  },
  texttf_none: {
    textTransform: 'none',
  },
  text_black: {
    color: 'black',
  },
  text_primary: {
    color: PRIMARY_COLOR,
  },
  flexCenterJustify: {
    justifyContent: 'center',
  },
  flexSpaceBetween: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flexEnd: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  m_auto: {
    margin: 'auto',
  },
  mb10: {
    marginBottom: 10,
  },
  mb20: {
    marginBottom: 20,
  },
  mb30: {
    marginBottom: 30,
  },
  mb5: {
    marginBottom: 5,
  },
  mr10: {
    marginRight: 10,
  },
  ml8: {
    marginLeft: 8,
  },
  ml4: {
    marginLeft: 4,
  },
  ml10: {
    marginLeft: 10,
  },
  ml12: {
    marginLeft: 12,
  },
  mt10: {
    marginTop: 10,
  },
  fwbold: {
    fontWeight: 'bold',
  },
  fz16: {
    fontSize: 16,
  },
  fz20: {
    fontSize: 20,
  },
  fw500: {
    fontWeight: '500',
  },
  text_center: {
    textAlign: 'center',
  },
  text_right: {
    textAlign: 'right',
  },
  text_left: {
    textAlign: 'left',
  },
  w100: {
    width: '100%',
  },
  mw50: {
    minWidth: 50,
  },
  op6: {
    opacity: 0.6,
  },
});

export default stylesGeneral;