/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {
  BACKGROUND_COLOR_SCREEN,
  BLACK_COLOR,
  PRIMARY_COLOR,
  WHITE_COLOR,
} from '../../styles/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR_SCREEN,
  },
  fragment_input_container: {
    width: '100%',
    padding: 20,
    borderRadius: 20,
    backgroundColor: WHITE_COLOR,
    position: 'relative',
    borderColor: '#ccc',
    borderWidth: 1,
    justifyContent: 'space-between',
    minHeight: 180,
    marginBottom: 10,
  },
  text_desc: {
    fontSize: 16,
    color: BLACK_COLOR,
    letterSpacing: 1,
    lineHeight: 24,
    textAlign: 'center',
  },
  code_contract: {
    fontSize: 16,
    color: BLACK_COLOR,
    letterSpacing: 1,
    lineHeight: 24,
    fontWeight: '450',
  },
  timer_text: {
    fontSize: 18,
    color: BLACK_COLOR,
    letterSpacing: 1,
    lineHeight: 24,
    fontWeight: 'bold',
  },
  timer_assets: {
    fontSize: 14,
    color: BLACK_COLOR,
    letterSpacing: 1,
    lineHeight: 24,
    fontWeight: '450',
  },
  disbursement: {
    fontSize: 20,
    color: BLACK_COLOR,
    letterSpacing: 1,
    lineHeight: 24,
    fontWeight: 'bold',
  },
  text_nodata: {
    fontSize: 16,
    color: BLACK_COLOR,
    letterSpacing: 1,
    lineHeight: 24,
    textAlign: 'center',
    marginTop: 20,
  },
  text_link: {
    fontSize: 16,
    color: PRIMARY_COLOR,
    letterSpacing: 1,
    lineHeight: 24,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  text_total: {
    fontSize: 16,
    color: BLACK_COLOR,
    letterSpacing: 1,
    lineHeight: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
});
