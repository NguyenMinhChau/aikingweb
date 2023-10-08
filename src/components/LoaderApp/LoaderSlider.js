import React from 'react';
import {View, Text} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import ButtonCP from '../General/ButtonCP';
import tw from '../../styles/twrnc.global';
import {PRIMARY_COLOR} from '../../styles/colors.global';
import Footer from '../General/Footer';
import {SCREEN_NAVIGATE} from '../routersConfig/General.config';
import useAppContext from '../../utils/hooks/useAppContext';
import {fList} from '../../utils/array.utils';
import FastImage from 'react-native-fast-image';

const IMAGE_SLIDER = [
  require('../../assets/images/slider_images/image_six.png'),
  require('../../assets/images/slider_images/image_seven.png'),
  require('../../assets/images/slider_images/image_eight.png'),
  require('../../assets/images/slider_images/image_night.png'),
  require('../../assets/images/slider_images/image_one.png'),
  require('../../assets/images/slider_images/image_two.png'),
];

export default function LoaderSliderCP({redirect, onClick}) {
  const {dispatch, state} = useAppContext();
  const {currentUser} = state.set_data;
  return (
    <>
      <View
        style={tw.style(
          'flex-1 flex-col bg-white items-center justify-center',
        )}>
        <View style={tw.style('h-[60%] w-full bg-white')}>
          <SliderBox
            ImageComponent={FastImage}
            images={IMAGE_SLIDER}
            sliderBoxHeight={500}
            paginationBoxVerticalPadding={20}
            autoplay
            autoplayInterval={5000}
            resizeMethod={'resize'}
            // resizeMode={'contain'}
            resizeMode={'cover'}
            paginationBoxStyle={tw.style(
              'absolute bottom-0 p-0 m-0 items-center justify-center py-4 self-center',
            )}
            dotColor={PRIMARY_COLOR}
            inactiveDotColor={tw.color('gray-400')}
            dotStyle={tw.style('h-1 w-4 rounded-lg')}
            ImageComponentStyle={tw.style(
              'w-[95%] h-[95%] bg-white shadow rounded-lg',
            )}
            imageLoadingColor={PRIMARY_COLOR}
          />
        </View>
        <View
          style={tw.style(
            'flex-1 flex-col w-full items-center justify-center p-2',
          )}>
          <View
            style={tw.style(
              'flex-1 flex-col gap-10 w-full items-center justify-center',
            )}>
            <View style={tw.style('items-center w-full')}>
              <Text style={tw.style('text-black text-[20px] font-bold')}>
                Chào Mừng Bạn Đến Aiking Group
              </Text>
            </View>
            <ButtonCP
              text="Bắt đầu ngay"
              styleContainer={tw.style('w-[300px] rounded-[20px]')}
              styleText={tw.style('text-[13px] font-bold uppercase')}
              colorBG={PRIMARY_COLOR}
              colorBorder={PRIMARY_COLOR}
              onPress={() => {
                redirect.navigate(
                  currentUser?.user?.email
                    ? SCREEN_NAVIGATE.Dashboard_Screen
                    : SCREEN_NAVIGATE.Login_Screen,
                );
                onClick();
              }}
            />
          </View>
          <Footer />
        </View>
      </View>
    </>
  );
}