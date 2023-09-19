import React from 'react';
import {View} from 'react-native';
import FastImage from 'react-native-fast-image';
import tw from '../../styles/twrnc.global';

export default function LoaderGifCP() {
  return (
    <>
      <View style={tw.style('flex-1 bg-white items-center justify-center p-2')}>
        <FastImage
          style={tw.style('w-[250px] h-[250px] mt-4 self-center')}
          source={require('../../assets/images/logo_company/logo_square.png')}
          resizeMode="contain"
        />
      </View>
    </>
  );
}
