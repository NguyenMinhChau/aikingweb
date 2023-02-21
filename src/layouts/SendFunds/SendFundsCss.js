/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {
  BACKGROUND_COLOR_SCREEN,
  CANCEL_COLOR,
  PRIMARY_COLOR,
  WHITE_COLOR,
} from '../../styles/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: BACKGROUND_COLOR_SCREEN,
  },
  container_bgc: {
    width: '100%',
    backgroundColor: PRIMARY_COLOR,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  container_total: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  fragment_input_container: {
    width: '100%',
    padding: 20,
    borderRadius: 20,
    backgroundColor: WHITE_COLOR,
    position: 'relative',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  text_contract: {
    color: CANCEL_COLOR,
    fontSize: 15,
    marginTop: 10,
    letterSpacing: 1,
    // lineHeight: 24,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    textDecorationColor: CANCEL_COLOR,
    textDecorationStyle: 'solid',
  },
  money_vnd: {
    fontSize: 14,
    marginTop: 8,
  },
});
