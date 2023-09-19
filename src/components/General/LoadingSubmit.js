import React from 'react';
import {View, Text, Image} from 'react-native';
import tw from '../../styles/twrnc.global';
import Logo from './Logo';

export default function LoadingSubmit({
  isSubmit = true,
  task = '',
  navigation,
}) {
  // const [loadingTime, setLoadingTime] = React.useState(0);
  // const formatTime = seconds => {
  //   const minutes = Math.floor(seconds / 60);
  //   const remainingSeconds = seconds % 60;
  //   return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
  //     .toString()
  //     .padStart(2, '0')}`;
  // };

  // React.useEffect(() => {
  //   const timer = setInterval(() => {
  //     if (isSubmit) {
  //       setLoadingTime(prev => prev + 1);
  //     } else {
  //       setLoadingTime(0);
  //     }
  //   }, 50);
  //   return () => clearInterval(timer);
  // }, [isSubmit]);

  return (
    <>
      {isSubmit && (
        <View style={tw.style('flex-col gap-2 flex-1 w-full h-full bg-white')}>
          <View
            style={tw.style('items-start justify-start px-3')}
            onTouchStart={() =>
              navigation
                ? navigation.navigate(SCREEN_NAVIGATE.Dashboard_Screen)
                : {}
            }>
            <Image
              source={require('../../assets/images/logo_company/logo_square.png')}
              resizeMode="contain"
              style={tw.style('w-[130px] h-[100px]')}
            />
          </View>
          <View
            style={tw`flex-1 h-full items-center justify-center flex-col gap-2 p-2 mb-[100px]`}>
            <Logo />
            <View style={tw`w-full mt-3 items-center justify-center`}>
              <Text style={tw`text-center font-medium text-black leading-6`}>
                Đang xử lý {task ? task : 'dữ liệu'}, vui lòng đợi trong giây
                lát, cảm ơn!
              </Text>
              {/* <View style={tw`flex-row items-center gap-1`}>
              <Text style={tw`text-center font-bold text-red-500 leading-6`}>
                Thời gian xử lý: {formatTime(loadingTime)}
              </Text>
            </View> */}
            </View>
          </View>
        </View>
      )}
    </>
  );
}
