/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {BACKGROUND_COLOR_SCREEN, WHITE_COLOR} from '../../styles/colors';

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
});

export default styles;
