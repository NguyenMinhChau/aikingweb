/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {BLACK_COLOR, WHITE_COLOR} from '../../styles/colors';

const styles = StyleSheet.create({
  total_assets: {
    marginTop: 30,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 14,
    padding: 12,
    position: 'relative',
    minHeight: 100,
  },
  total_assets_header: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: -25,
    left: 12,
    backgroundColor: WHITE_COLOR,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  total_assets_header_image_container: {
    width: 50,
    height: 50,
  },
  total_assets_header_image: {
    width: '100%',
    height: '100%',
    borderRadius: 14,
  },
  total_assets_header_text_container: {
    marginLeft: 15,
  },
  total_assets_header_text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: BLACK_COLOR,
  },
});

export default styles;
