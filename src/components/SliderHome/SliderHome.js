/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {Image, Text, View} from 'react-native';
import React from 'react';
import Swiper from 'react-native-web-swiper';
import styles from './SliderHomeCss';

const SliderHome = ({images}) => {
  return (
    <View style={styles.slider_container}>
      <Swiper
        loop
        timeout={5}
        springConfig={{speed: 110}}
        minDistanceForAction={0.55}
        controlsEnabled={false}
        from={0}
        controlsProps={{
          dotsTouchable: false,
          prevPos: 'left',
          nextPos: 'right',
          nextTitle: '',
          nextTitleStyle: {color: 'black', fontSize: 24},
          PrevComponent: ({onPress}) => (
            <Text style={{fontSize: 24}} onPress={onPress}>
              {''}
            </Text>
          ),
        }}>
        {images.map((item, index) => {
          return (
            <View style={[styles.slideContainer]} key={index}>
              <Image
                source={{uri: item.uri}}
                style={{width: '100%', height: '100%', borderRadius: 10}}
                resizeMode="contain"
              />
            </View>
          );
        })}
      </Swiper>
    </View>
  );
};

export default SliderHome;
