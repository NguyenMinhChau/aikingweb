/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {BLACK_COLOR} from '../../styles/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  text: {
    fontSize: 16,
    letterSpacing: 1,
    lineHeight: 24,
    color: BLACK_COLOR,
    fontWeight: '450',
    textAlign: 'justify',
  },
  email: {
    color: 'blue',
    fontWeight: 'bold',
  },
});
export default styles;
