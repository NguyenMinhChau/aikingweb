/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {
  BORDER_BOTTOM_INPUT_COLOR,
  LABEL_INPUT_COLOR,
} from '../../styles/colors';

const styles = StyleSheet.create({
  // PICKER
  timer_picker_label: {
    fontSize: 16,
    color: LABEL_INPUT_COLOR,
    fontWeight: '480',
    letterSpacing: 0.5,
    marginBottom: 5,
  },
  timer_picker_frame_conatiner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderColor: BORDER_BOTTOM_INPUT_COLOR,
    borderWidth: 1,
    borderRadius: 8,
  },
  timer_picker_frame_label: {
    fontSize: 16,
    color: '#999',
    letterSpacing: 0.5,
  },
  text_desc: {
    flexDirection: 'row',
    marginTop: 8,
  },
  text: {
    letterSpacing: 0.5,
    fontSize: 16,
    lineHeight: 24,
  },
});

export default styles;
