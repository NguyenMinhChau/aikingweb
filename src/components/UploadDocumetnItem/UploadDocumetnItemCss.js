/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {WHITE_COLOR} from '../../styles/colors';

const styles = StyleSheet.create({
  text_title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    letterSpacing: 1,
    lineHeight: 24,
  },
  image_container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image_item: {
    marginTop: 12,
    width: '100%',
  },
  btn: {
    width: '100%',
    paddingVertical: 8,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text_btn: {
    color: WHITE_COLOR,
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    marginLeft: 5,
  },
  image_view_container: {
    width: '100%',
    height: 200,
    marginTop: 5,
  },
  image_view: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
});

export default styles;
