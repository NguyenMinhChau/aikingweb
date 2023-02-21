/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {LABEL_INPUT_COLOR, PRIMARY_FONT_ANDROID} from '../../styles/colors';

const styles = StyleSheet.create({
  input_label: {
    fontSize: 16,
    color: LABEL_INPUT_COLOR,
    fontFamily: PRIMARY_FONT_ANDROID,
    fontWeight: '480',
    letterSpacing: 0.5,
  },
});

export default styles;
