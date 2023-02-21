/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {BACKGROUND_COLOR_SCREEN, WHITE_COLOR} from '../../styles/colors';

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
  text_desc: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    letterSpacing: 1,
    lineHeight: 24,
  },
});

export default styles;
