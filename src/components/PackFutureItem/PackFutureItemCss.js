/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {
  BLACK_COLOR,
  GREEN_COLOR,
  PRIMARY_COLOR,
  PRIMARY_FONT_ANDROID,
  RED_COLOR,
  WHITE_COLOR,
} from '../../styles/colors';

export default StyleSheet.create({
  // FUTURE ITEM
  future_pack_item: {
    width: '100%',
    minHeight: 50,
    padding: 10,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ccc',
    flexDirection: 'column',
    marginBottom: 15,
  },
  future_pack_item_desc_end_container: {
    alignItems: 'flex-end',
  },
  future_pack_item_desc_start_container: {
    alignItems: 'flex-start',
    flex: 1,
  },
  future_pack_item_header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
    borderStyle: 'dashed',
  },
  future_pack_item_middle: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
    borderStyle: 'dashed',
  },
  future_pack_item_footer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  future_pack_item_btn_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 15,
    backgroundColor: PRIMARY_COLOR,
  },
  future_pack_item_desc_text_btn: {
    fontSize: 13,
    fontWeight: 'bold',
    color: WHITE_COLOR,
    marginRight: 5,
  },
  future_pack_item_header_money: {
    fontSize: 25,
    fontWeight: 'bold',
    color: PRIMARY_COLOR,
  },
  future_pack_item_desc_text: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#999999',
    fontFamily: PRIMARY_FONT_ANDROID,
  },
  future_pack_item_desc_percent: {
    fontSize: 20,
    fontWeight: 'bold',
    color: PRIMARY_COLOR,
  },
  fz16: {
    fontSize: 16,
  },
  red: {
    color: RED_COLOR,
  },
  green: {
    color: GREEN_COLOR,
  },
  black: {
    color: BLACK_COLOR,
  },
});
