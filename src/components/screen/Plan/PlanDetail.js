import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ImageBackground,
} from 'react-native';
import tw from '../../../styles/twrnc.global';
import {MAIN_COLOR} from '../../../styles/colors.global';
import {Iconify} from 'react-native-iconify';
import {dd_mm_yy_hh_mm_ss} from '../../../utils/TimerFormat';

export default function PlanDetailScreen({navigation, route}) {
  const {data} = route.params;
  return (
    <SafeAreaView style={tw`flex-1 flex-col bg-[${MAIN_COLOR}]`}>
      <View style={tw`flex-row items-center justify-between z-20 p-2`}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}>
          <Iconify icon="ic:baseline-arrow-back" size={25} color="#fff" />
        </TouchableOpacity>
        <View style={tw`w-[60px] h-[40px]`}>
          <Image
            source={require('../../../assets/images/logo_company/logo_square.png')}
            style={tw`w-full h-full`}
            resizeMode="contain"
          />
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw.style('p-3 flex-grow bg-white')}>
        <ImageBackground
          source={require('../../../assets/images/logo_company/logo_square.png')}
          resizeMode="contain"
          style={tw.style('w-full h-[200px]')}
        />
        <View style={tw.style('flex-col')}>
          <Text
            style={tw.style(
              'text-black text-[18px] font-bold leading-7 capitalize',
            )}>
            Tiêu đề kế hoạch {data}
          </Text>
          <View style={tw.style('flex-row items-center gap-[2px]')}>
            <Text style={tw.style('text-[12px] text-gray-400 italic')}>
              Ngày đăng:{' '}
            </Text>
            <Text
              style={tw.style('text-[12px] text-gray-400 flex-1 w-1 italic')}>
              {dd_mm_yy_hh_mm_ss(new Date())}
            </Text>
          </View>
          <Text style={tw.style('py-2 text-black text-[15px]')}>
            Nội dung bài viết
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
