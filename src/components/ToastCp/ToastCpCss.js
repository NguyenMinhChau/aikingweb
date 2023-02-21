/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {BLACK_COLOR, PRIMARY_FONT_ANDROID} from '../../styles/colors';

const styles = StyleSheet.create({
  toast_custom_container: {
    width: '100%',
    minWidth: 300,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 10,
    borderRadius: 5,
    borderTopWidth: 3,
    marginTop: '-15%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  toast_right: {
    flex: 1,
    marginLeft: 15,
    marginTop: -3,
  },
  toast_header: {
    fontSize: 16,
    fontWeight: 'bold',
    color: BLACK_COLOR,
    letterSpacing: 0.5,
    fontFamily: 'Noto',
  },
  toast_desc: {
    fontSize: 14,
    fontWeight: 'normal',
    color: BLACK_COLOR,
    letterSpacing: 0.5,
    fontFamily: PRIMARY_FONT_ANDROID,
    textAlign: 'justify',
    lineHeight: 22,
  },
});

export default styles;
