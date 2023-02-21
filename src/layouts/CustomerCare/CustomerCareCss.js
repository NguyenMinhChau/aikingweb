/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {
  BACKGROUND_COLOR_SCREEN,
  BLACK_COLOR,
  CANCEL_COLOR,
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
  text_title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: BLACK_COLOR,
    letterSpacing: 1,
    marginBottom: 15,
    lineHeight: 24,
  },
  text_footer: {
    fontSize: 14,
    fontWeight: 'bold',
    color: CANCEL_COLOR,
    letterSpacing: 1,
    marginTop: 15,
    lineHeight: 24,
    textAlign: 'center',
  },
});

export default styles;
