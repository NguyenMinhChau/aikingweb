import React from 'react';
import {View, Image} from 'react-native';
import tw from '../../styles/twrnc.global';

export default function Footer({style}) {
  return (
    <>
      <View
        style={tw.style(`items-center justify-center mt-auto mb-3`, {
          ...style,
        })}>
        <Image
          source={require('../../assets/images/logo_company/logo_square.png')}
          style={tw.style('w-[150px] h-[40px]')}
          resizeMode="contain"
        />
      </View>
    </>
  );
}
