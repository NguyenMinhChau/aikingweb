/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {
  LABEL_INPUT_COLOR,
  PRIMARY_FONT_ANDROID,
  WHITE_COLOR,
} from '../../styles/colors';

const styles = StyleSheet.create({
  Credit_card_container: {
    backgroundColor: WHITE_COLOR,
    borderRadius: 5,
    minHeight: 100,
    padding: 12,
    marginTop: 10,
    flexDirection: 'column',
    marginBottom: 10,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  Credit_card_header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  trademark_container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trademark_logo: {
    width: 30,
    height: 30,
    borderRadius: 5,
  },
  trademark_name_bank: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: PRIMARY_FONT_ANDROID,
    color: LABEL_INPUT_COLOR,
    letterSpacing: 0.5,
  },
  Credit_card_middle: {
    flexDirection: 'row',
  },
  card_info_footer_logo: {
    width: 80,
    height: 60,
  },
  number_card: {
    fontSize: 25,
    fontWeight: '450',
    fontFamily: PRIMARY_FONT_ANDROID,
    color: LABEL_INPUT_COLOR,
    letterSpacing: 1.5,
    marginLeft: 10,
  },
  Credit_card_footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  accountName_card_container: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  ext_card_container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ext_card_title: {
    fontSize: 15,
    fontWeight: '450',
    fontFamily: PRIMARY_FONT_ANDROID,
    color: LABEL_INPUT_COLOR,
  },
  ext_card_text: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: PRIMARY_FONT_ANDROID,
    color: LABEL_INPUT_COLOR,
    marginLeft: 8,
  },
  accountName_card_text: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: PRIMARY_FONT_ANDROID,
    color: LABEL_INPUT_COLOR,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  Credit_card_footer_logo: {
    width: 80,
    height: 60,
  },
});

export default styles;
