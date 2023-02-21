/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {PRIMARY_COLOR} from '../../styles/colors';

const styles = StyleSheet.create({
  actions_item: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    minWidth: 70,
    marginRight: 15,
  },
  actions_item_reset_margin: {
    marginRight: 0,
  },
  actions_item_logo: {
    fmarginBottom: 'auto',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 8,
  },
  actions_item_text: {
    flex: 1,
    maxWidth: 80,
    flexWrap: 'wrap',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  actions_item_text_title: {
    fontSize: 15,
    fontWeight: '450',
    color: 'rgba(0,0,0,0.8)',
    textAlign: 'center',
    letterSpacing: 0.5,
    marginTop: 8,
  },
});

export default styles;
