/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {PRIMARY_FONT_ANDROID} from '../../styles/colors';

const styles = StyleSheet.create({
  btn_actions_container: {
    flexDirection: 'row',
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
});

export default styles;
