/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {
  BACKGROUND_COLOR_SCREEN,
  BLACK_COLOR,
  PRIMARY_COLOR,
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
    marginBottom: 12,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  text_nodata: {
    textAlign: 'center',
    fontSize: 16,
    letterSpacing: 1,
    lineHeight: 24,
    color: BLACK_COLOR,
  },
  text_link: {
    fontSize: 16,
    letterSpacing: 1,
    lineHeight: 24,
    color: PRIMARY_COLOR,
    fontWeight: 'bold',
    marginBottom: 15,
  },
});

export default styles;
