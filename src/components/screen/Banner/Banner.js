import React from 'react';
import {View, Image} from 'react-native';
import {SCREEN_NAVIGATE} from '../../routersConfig/General.config';
import tw from '../../../styles/twrnc.global';
import useAppContext from '../../../utils/hooks/useAppContext';
import {SET_TOGGLE_PAYLOAD} from '../../Context/AppContext.reducer';
import {MAIN_COLOR} from '../../../styles/colors.global';

const Banner = ({navigation}) => {
  const {dispatch} = useAppContext();

  return (
    <View
      style={tw.style(`relative top-0 w-full bg-[${MAIN_COLOR}] h-[60px]`, {
        zIndex: 99,
      })}>
      <View
        style={tw.style('absolute top-[25%] left-0 ml-4', {zIndex: 100})}
        onTouchStart={() => {
          dispatch(
            SET_TOGGLE_PAYLOAD({
              key: 'isVisible_menu',
              value: false,
            }),
          );
          navigation.navigate(SCREEN_NAVIGATE.Dashboard_Screen);
        }}>
        <Image
          style={tw.style('absolute left-0 w-[100px] h-[40px]', {zIndex: 100})}
          source={require('../../../assets/images/logo_company/logo_square.png')}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

export default Banner;
