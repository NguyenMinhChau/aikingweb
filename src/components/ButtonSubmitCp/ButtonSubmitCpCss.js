/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {PRIMARY_FONT_ANDROID} from '../../styles/colors';

const styles = StyleSheet.create({
  btn_submit: {
    marginTop: 15,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
  },
  btn_text: {
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
    fontFamily: PRIMARY_FONT_ANDROID,
  },
});

export default styles;
