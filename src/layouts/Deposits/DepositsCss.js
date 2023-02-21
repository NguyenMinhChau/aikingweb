/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {
  BACKGROUND_COLOR_SCREEN,
  CANCEL_COLOR,
  COMPLETE_COLOR,
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
  money_VND: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: 'bold',
    color: COMPLETE_COLOR,
    letterSpacing: 0.5,
  },
  text_link: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    color: CANCEL_COLOR,
    textDecorationLine: 'underline',
  },
});

export default styles;
