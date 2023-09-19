import React from 'react';
import {View, ImageBackground} from 'react-native';
import tw from '../../styles/twrnc.global';

export default function LoaderBgcCP() {
  return (
    <>
      <View style={tw.style('flex-1 bg-white items-center justify-center')}>
        <ImageBackground
          source={require('../../assets/images/loader_images/loader_bgc_two.png')}
          resizeMode="stretch"
          style={tw.style('w-full h-full')}
        />
      </View>
    </>
  );
}
