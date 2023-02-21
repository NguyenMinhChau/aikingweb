/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {
  BACKGROUND_COLOR_SCREEN,
  BORDER_BOTTOM_INPUT_COLOR,
  LABEL_INPUT_COLOR,
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
  input_label: {
    fontSize: 16,
    color: LABEL_INPUT_COLOR,
    fontFamily: PRIMARY_FONT_ANDROID,
    fontWeight: '480',
    letterSpacing: 0.5,
  },
  input: {
    fontSize: 16,
    color: LABEL_INPUT_COLOR,
    fontFamily: PRIMARY_FONT_ANDROID,
    fontWeight: '480',
    letterSpacing: 0.5,
    borderBottomWidth: 1,
    borderBottomColor: BORDER_BOTTOM_INPUT_COLOR,
    paddingVertical: 10,
  },
  btn_authen: {
    marginTop: 15,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn_text: {
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
    fontFamily: PRIMARY_FONT_ANDROID,
  },
});

export default styles;
