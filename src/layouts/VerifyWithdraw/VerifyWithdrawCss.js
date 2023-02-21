/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {
  BACKGROUND_COLOR_SCREEN,
  PRIMARY_FONT_ANDROID,
  WHITE_COLOR,
} from '../../styles/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR_SCREEN,
    paddingVertical: 20,
    paddingHorizontal: 10,
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
  btn_actions_container: {
    flexDirection: 'row',
    marginTop: 15,
  },
  btn_submit: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn_text: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: PRIMARY_FONT_ANDROID,
  },
  text_resend: {
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginTop: 12,
  },
});

export default styles;
