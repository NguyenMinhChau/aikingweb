/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {
  BLACK_COLOR,
  PRIMARY_COLOR,
  PRIMARY_FONT_ANDROID,
  WHITE_COLOR,
} from '../styles/colors';

export default StyleSheet.create({
  // TOP CSS
  container_header: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginTop: 10,
  },
  date_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  date_text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: WHITE_COLOR,
    // marginRight: 8,
    fontFamily: PRIMARY_FONT_ANDROID,
  },
  //   WELCOME CSS
  container_desc: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  text_header: {
    fontSize: 16,
    fontWeight: '450',
    color: WHITE_COLOR,
    letterSpacing: 1,
    fontFamily: PRIMARY_FONT_ANDROID,
  },
  text_middle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: WHITE_COLOR,
    letterSpacing: 1,
    fontFamily: PRIMARY_FONT_ANDROID,
  },
  text_footer: {
    fontSize: 16,
    fontWeight: '450',
    color: WHITE_COLOR,
    letterSpacing: 1,
    fontFamily: PRIMARY_FONT_ANDROID,
  },
  // LOGIN_REGISTER CSS
  login_register_container: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: WHITE_COLOR,
    borderRadius: 13,
    shadowColor: BLACK_COLOR,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  login_container: {
    padding: 10,
  },
  register_container: {
    padding: 10,
  },
  login_text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: PRIMARY_COLOR,
    fontFamily: PRIMARY_FONT_ANDROID,
  },
  register_text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: PRIMARY_COLOR,
    fontFamily: PRIMARY_FONT_ANDROID,
  },
  // Total_capital
  Total_capital_container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    // marginVertical: 10,
  },
  Total_capital_text: {
    fontSize: 14,
    fontWeight: 'bold',
    color: WHITE_COLOR,
    fontFamily: PRIMARY_FONT_ANDROID,
    letterSpacing: 0.5,
    alignItems: 'center',
  },
  Total_capital_number: {
    fontSize: 16,
    fontWeight: 'bold',
    color: WHITE_COLOR,
    fontFamily: PRIMARY_FONT_ANDROID,
    textAlign: 'center',
  },
  Total_capital_number_curency: {
    fontSize: 12,
  },
  // WELCOME CSS
  container: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  Total_capital_container_list: {
    width: '100%',
    marginTop: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
