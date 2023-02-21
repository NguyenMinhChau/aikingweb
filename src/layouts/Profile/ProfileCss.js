/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {
  BACKGROUND_COLOR_SCREEN,
  PRIMARY_COLOR,
  PRIMARY_FONT_ANDROID,
  WHITE_COLOR,
} from '../../styles/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: BACKGROUND_COLOR_SCREEN,
  },
  item_container: {
    padding: 20,
    width: '100%',
    minHeight: 50,
    borderRadius: 15,
    backgroundColor: WHITE_COLOR,
    marginBottom: 18,
    justifyContent: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  user_desc_container: {
    flex: 1,
    marginLeft: 12,
  },
  user_info_container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image_user: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  user_phone_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  user_name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: PRIMARY_COLOR,
    fontFamily: PRIMARY_FONT_ANDROID,
    letterSpacing: 1,
  },
  user_phone: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#999',
    fontFamily: PRIMARY_FONT_ANDROID,
    marginVertical: 5,
    letterSpacing: 1,
  },
  authen_btn: {
    width: '90%',
    borderRadius: 24,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9eff8',
  },
  authen_text: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#c62a29',
    fontFamily: PRIMARY_FONT_ANDROID,
  },
  btn_actions: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 24,
    backgroundColor: '#e8e8e8',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  logout_text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#b83534',
    letterSpacing: 1,
  },
  text_green: {
    color: PRIMARY_COLOR,
  },
  text_blue: {
    color: '#00a0e9',
  },
});

export default styles;
