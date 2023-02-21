/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {PRIMARY_COLOR, WHITE_COLOR} from '../../styles/colors';

const styles = StyleSheet.create({
  label: {
    fontWeight: 'bold',
    color: WHITE_COLOR,
  },
  labelTransform: {
    fontWeight: 'bold',
    fontSize: 15,
    color: WHITE_COLOR,
    position: 'absolute',
    top: '50%',
    left: 30,
    transform: [{translateY: -12}],
  },
  input: {
    fontSize: 17,
    borderBottomWidth: 1.5,
    borderBottomColor: WHITE_COLOR,
    paddingHorizontal: 8,
    paddingVertical: 10,
    marginVertical: 10,
    fontWeight: 'bold',
    color: WHITE_COLOR,
  },
  input_padding_right: {
    paddingRight: 45,
  },
  input_padding_left: {
    paddingLeft: 30,
  },
  input_relative: {
    position: 'relative',
  },
  icon: {
    flexDirection: 'row',
    position: 'absolute',
    top: '50%',
    right: 0,
    transform: [{translateY: -10}],
  },
  icon_symbol: {
    flexDirection: 'row',
    position: 'absolute',
    top: '50%',
    transform: [{translateY: -10}],
  },
});
export default styles;
