/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {
  BACKGROUND_COLOR_SCREEN,
  BLACK_COLOR,
  PRIMARY_COLOR,
} from '../../styles/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: BACKGROUND_COLOR_SCREEN,
  },
  container_bgc: {
    width: '100%',
    backgroundColor: PRIMARY_COLOR,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  container_total: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  actions_title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: BLACK_COLOR,
  },
  actions_list: {
    marginVertical: 15,
    flexWrap: 'nowrap',
    flexDirection: 'row',
    width: '100%',
  },
});

export default styles;
