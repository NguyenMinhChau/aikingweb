/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {
  BACKGROUND_COLOR_SCREEN,
  BLACK_COLOR,
  WHITE_COLOR,
} from '../../styles/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: BACKGROUND_COLOR_SCREEN,
  },
  item_container: {
    padding: 20,
    width: '100%',
    minHeight: 50,
    borderRadius: 15,
    backgroundColor: WHITE_COLOR,
    marginBottom: 18,
    justifyContent: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  content_container: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    height: 70,
    borderRadius: 20,
  },
  image_item: {
    width: 70,
    height: 70,
  },
  info_container: {
    marginLeft: 15,
  },
  text_version: {
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: 0.5,
    marginBottom: 10,
    color: BLACK_COLOR,
    fontWeight: 'bold',
  },
  btn_update: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.5,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default styles;
