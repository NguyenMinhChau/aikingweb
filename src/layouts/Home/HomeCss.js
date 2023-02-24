/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {
  BLACK_COLOR,
  PRIMARY_COLOR,
  PRIMARY_FONT_ANDROID,
} from '../../styles/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  total_assets: {
    marginVertical: 15,
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
    backgroundColor: '#fafafa',
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
  total_assets_body: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },
  total_assets_body_text: {
    fontSize: 16,
    fontWeight: '450',
    color: BLACK_COLOR,
    marginRight: 10,
  },
  total_assets_footer: {
    marginTop: 15,
  },
  total_assets_footer_text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: BLACK_COLOR,
  },
  total_assets_footer_image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginTop: 30,
  },
  product_title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: BLACK_COLOR,
  },
  actions_title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: BLACK_COLOR,
  },
  product_list: {
    marginVertical: 15,
    flexWrap: 'nowrap',
    flexDirection: 'row',
    width: '100%',
    minHeight: 220,
  },
  actions_list: {
    marginVertical: 15,
    flexWrap: 'nowrap',
    flexDirection: 'row',
    width: '100%',
  },
  // WELCOME CSS
  welcome_title: {
    fontFamily: PRIMARY_FONT_ANDROID,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: BLACK_COLOR,
  },
  container_bgc: {
    width: '100%',
    backgroundColor: PRIMARY_COLOR,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  container_total: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
});

export default styles;
