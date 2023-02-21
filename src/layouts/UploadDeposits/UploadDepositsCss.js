/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {BACKGROUND_COLOR_SCREEN, WHITE_COLOR} from '../../styles/colors';

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
  btn_upload_container: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  btn_upload_text: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: WHITE_COLOR,
  },
  image_container: {
    width: '100%',
    height: 600,
    borderRadius: 12,
    marginTop: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
});

export default styles;
