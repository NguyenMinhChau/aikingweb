import React from 'react';
import {View, Text, Image} from 'react-native';
import tw from '../../styles/twrnc.global';
import {BGC_TOAST_WARNING} from '../../styles/colors.global';
import Logo from './Logo';
import {SCREEN_NAVIGATE} from '../routersConfig/General.config';

export default function LoadingScreen({navigation}) {
  const [msg, setMsg] = React.useState('');
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setMsg(
        'Hệ thống đang chịu tải hoặc đường truyền của bạn đang có vấn đề, vui lòng chờ thêm hoặc liên hệ Admin',
      );
    }, 30000);

    return () => clearTimeout(timer);
  });

  return (
    <>
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
              Đang xử lý dữ liệu, vui lòng đợi trong giây lát, cảm ơn!
            </Text>
          </View>
          {msg && (
            <View
              style={tw.style(
                'w-full rounded p-2 items-center flex-col gap-2',
                {
                  backgroundColor: BGC_TOAST_WARNING,
                },
              )}>
              <Text
                style={tw`text-orange-500 font-medium text-center leading-6`}>
                {msg}
              </Text>
            </View>
          )}
        </View>
      </View>
    </>
  );
}
