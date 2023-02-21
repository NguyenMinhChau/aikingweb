/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {
  BGC_CONFIRM_COLOR,
  BORDER_BOTTOM_INPUT_COLOR,
  LABEL_INPUT_COLOR,
  PRIMARY_FONT_ANDROID,
} from '../../styles/colors';

const styles = StyleSheet.create({
  input_label: {
    fontSize: 16,
    color: LABEL_INPUT_COLOR,
    fontFamily: PRIMARY_FONT_ANDROID,
    fontWeight: '480',
    letterSpacing: 0.5,
    marginBottom: 5,
  },
  input: {
    fontSize: 16,
    color: LABEL_INPUT_COLOR,
    fontFamily: PRIMARY_FONT_ANDROID,
    fontWeight: '480',
    letterSpacing: 0.5,
    borderWidth: 1,
    borderColor: BORDER_BOTTOM_INPUT_COLOR,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  input_disabled: {
    backgroundColor: '#f1f1f1',
  },
  input_relative: {
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    right: 10,
    bottom: '30%',
    alignItems: 'center',
  },
  text_unit: {
    fontSize: 16,
    fontWeight: 'bold',
    color: LABEL_INPUT_COLOR,
    letterSpacing: 0.5,
  },
  border_left: {
    color: LABEL_INPUT_COLOR,
    marginRight: 8,
  },
});

export default styles;
