/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {WHITE_COLOR} from '../../styles/colors';

const styles = StyleSheet.create({
  product_item: {
    width: 200,
    height: '100%',
    padding: 5,
    position: 'relative',
    marginRight: 20,
  },
  product_item_margin_reset: {
    marginRight: 0,
  },
  product_item_image: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 6,
  },
  info_product: {
    height: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  product_item_text_overlay: {
    width: '100%',
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 15,
    alignItems: 'flex-start',
  },
  overlay_text: {
    fontSize: 14,
    fontWeight: 'bold',
    color: WHITE_COLOR,
  },
  product_timer: {
    marginTop: 5,
  },
  timer_text: {
    fontSize: 22,
    fontWeight: 'bold',
    color: WHITE_COLOR,
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 8,
  },
  product_ext: {
    marginTop: 5,
  },
  ext_text: {
    fontSize: 14,
    fontWeight: 'bold',
    color: WHITE_COLOR,
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 8,
  },
  interest_rate: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  interest_rate_number: {
    fontSize: 35,
    fontWeight: 'bold',
    color: WHITE_COLOR,
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 8,
  },
  interest_rate_percent: {
    fontSize: 20,
    fontWeight: 'bold',
    color: WHITE_COLOR,
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 8,
    marginBottom: 5,
  },
  interest_rate_desc_text: {
    fontSize: 16,
    fontWeight: '450',
    color: WHITE_COLOR,
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 8,
  },
});

export default styles;
