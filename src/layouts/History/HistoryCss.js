/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {
  BACKGROUND_COLOR_SCREEN,
  BLACK_COLOR,
  PRIMARY_COLOR,
  PRIMARY_FONT_ANDROID,
  WHITE_COLOR,
} from '../../styles/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: BACKGROUND_COLOR_SCREEN,
  },
  list_actions: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actions_item: {
    width: '50%',
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: WHITE_COLOR,
    borderBottomColor: 'transparent',
    borderBottomWidth: 1.5,
  },
  active: {
    borderBottomColor: PRIMARY_COLOR,
  },
  item_text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: BLACK_COLOR,
    fontFamily: PRIMARY_FONT_ANDROID,
    letterSpacing: 1,
    lineHeight: 24,
    textAlign: 'center',
  },
  body: {
    flex: 1,
    width: '100%',
  },
  text_desc: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 1,
    lineHeight: 24,
    marginTop: 20,
  },
});

export default styles;
