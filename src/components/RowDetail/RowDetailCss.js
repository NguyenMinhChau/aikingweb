/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {BORDER_BOTTOM_DASHED_COLOR} from '../../styles/colors';

const styles = StyleSheet.create({
  info_detail_item: {
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: BORDER_BOTTOM_DASHED_COLOR,
    borderBottomWidth: 2,
    borderStyle: 'dashed',
  },
  info_detail_title: {
    fontSize: 16,
    fontWeight: '480',
    color: '#7d7d7d',
    letterSpacing: 0.7,
    marginLeft: 15,
  },
  info_detail_desc: {
    fontSize: 15,
    fontWeight: '500',
  },
  borderBt0: {
    borderBottomColor: 'transparent',
    borderBottomWidth: 0,
    marginVertical: 0,
  },
});

export default styles;
