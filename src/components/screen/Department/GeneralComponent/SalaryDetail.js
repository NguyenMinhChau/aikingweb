import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import tw from '../../../../styles/twrnc.global';
import {MAIN_COLOR} from '../../../../styles/colors.global';
import {Iconify} from 'react-native-iconify';
import RowDialogCP from '../../../General/Dialog/RowDialogCP';
import moment from 'moment';
import 'moment/locale/vi';

export default function SalaryDetailScreen({navigation, route}) {
  const {data, day} = route.params;
  const formatDateDisplay = moment(day ? day : new Date())
    .locale('vi')
    .format('dddd, DD/MM/YYYY');
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
            source={require('../../../../assets/images/logo_company/logo_square.png')}
            style={tw`w-full h-full`}
            resizeMode="contain"
          />
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw.style('p-3 flex-grow bg-white')}>
        <View style={tw.style('mb-2 flex-row')}>
          <Text style={tw.style('text-black font-bold')}>Bảng lương, </Text>
          <Text style={tw.style('text-black font-bold italic')}>{data}: </Text>
          <Text
            style={tw.style('text-red-500 font-bold capitalize flex-1 w-1')}>
            {formatDateDisplay}
          </Text>
        </View>
        <View style={tw.style(' rounded-lg bg-white p-2 shadow-md my-3')}>
          <RowDialogCP
            label="Họ và tên"
            noneBorderBottom
            value={'Nguyễn Văn A'}
            styleLabel={tw`font-medium`}
            noBullet
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
