import React from 'react';
import {View, TouchableOpacity, Image, Dimensions} from 'react-native';
import NavPane from '../NavPane/NavPane';
import {SCREEN_NAVIGATE} from '../../routersConfig/General.config';
import tw from '../../../styles/twrnc.global';
import useAppContext from '../../../utils/hooks/useAppContext';
import {SET_TOGGLE_PAYLOAD} from '../../Context/AppContext.reducer';
import {useLayoutAnimation} from '../../../utils/LayoutAnimation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {MAIN_COLOR} from '../../../styles/colors.global';

const Banner = ({navigation}) => {
  const {dispatch, state} = useAppContext();
  const {isVisible_menu} = state.set_toggle;
  const {LayoutAnimationConfig, ANIMATION_PROPERTY, ANIMATION_TYPE} =
    useLayoutAnimation();

  const toggleVisibility = e => {
    e.stopPropagation();
    dispatch(
      SET_TOGGLE_PAYLOAD({key: 'isVisible_menu', value: !isVisible_menu}),
    );
    LayoutAnimationConfig(
      100,
      ANIMATION_TYPE.EASE_IN_EASE_OUT,
      ANIMATION_PROPERTY.OPACITY,
    );
  };

  const heightDevice = Dimensions.get('window').height;

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
      {/* Menu toggle */}
      <TouchableOpacity
        onPress={toggleVisibility}
        style={tw.style('absolute top-[30%] right-0  mr-6', {zIndex: 100})}>
        <Icon name={isVisible_menu ? 'times' : 'list'} size={25} color="#fff" />
      </TouchableOpacity>
      {isVisible_menu && (
        <View
          style={tw.style(
            `absolute top-[100%] left-0 w-full h-full min-h-[${
              heightDevice - 60
            }px] flex-grow bottom-0 bg-black bg-opacity-40`,
          )}
          onTouchStart={toggleVisibility}>
          <View
            style={tw`w-[75%] h-full bg-white p-2`}
            onTouchStart={e => {
              e.stopPropagation();
              if (isVisible_menu) {
                dispatch(
                  SET_TOGGLE_PAYLOAD({
                    key: 'isVisible_menu',
                    value: true,
                  }),
                );
              }
            }}>
            <NavPane navigation={navigation} />
          </View>
        </View>
      )}
    </View>
  );
};

export default Banner;
