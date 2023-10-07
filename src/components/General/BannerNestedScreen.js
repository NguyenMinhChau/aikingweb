import React from 'react';
import {View, TouchableOpacity, Image, Text, Dimensions} from 'react-native';
import tw from '../../styles/twrnc.global';
import {IconCP} from '../../utils/icon.utils';
import {BLACK_COLOR, MAIN_COLOR, WHITE_COLOR} from '../../styles/colors.global';
import {SET_TOGGLE_PAYLOAD} from '../Context/AppContext.reducer';
import useAppContext from '../../utils/hooks/useAppContext';

export default function BannerNestedScreen({
  navigation,
  title,
  styleText,
  isBgcTransparent = false,
  handleBack = () => {},
}) {
  const {dispatch, state} = useAppContext();

  return (
    <>
      <View
        style={tw.style(
          `flex-row items-center justify-between gap-2 z-30 p-2 min-h-[60px]`,
          {
            backgroundColor: isBgcTransparent ? 'transparent' : MAIN_COLOR,
          },
        )}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            navigation.goBack();
            dispatch(
              SET_TOGGLE_PAYLOAD({
                key: 'isVisible_search',
                value: false,
              }),
            );
            handleBack();
          }}
          style={tw.style('')}>
          <IconCP
            name="arrow-back-outline"
            size={25}
            color={isBgcTransparent ? BLACK_COLOR : WHITE_COLOR}
          />
        </TouchableOpacity>
        {title && (
          <Text
            style={tw.style(
              'flex-1 px-5 text-white font-bold text-center text-[18px] leading-6',
              {
                color: isBgcTransparent ? BLACK_COLOR : WHITE_COLOR,
                ...styleText,
              },
            )}>
            {title}
          </Text>
        )}
        <View style={tw`w-[60px] h-[40px]`}>
          <Image
            source={require('../../assets/images/logo_company/logo_square.png')}
            style={tw`w-full h-full`}
            resizeMode="contain"
          />
        </View>
      </View>
    </>
  );
}
