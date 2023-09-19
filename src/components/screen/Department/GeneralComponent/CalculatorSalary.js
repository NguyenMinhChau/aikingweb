import React from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import tw from '../../../../styles/twrnc.global';
import {MAIN_COLOR} from '../../../../styles/colors.global';
import {Iconify} from 'react-native-iconify';
import useAppContext from '../../../../utils/hooks/useAppContext';
import CalendarCP from './Calendar';
import {formatVND} from '../../../../utils/money.utils';
import moment from 'moment';
import 'moment/locale/vi';
import {SCREEN_NAVIGATE} from '../../../routersConfig/General.config';

export default function CalculatorSalaryScreen({navigation}) {
  const {state} = useAppContext();
  const {day, month} = state.set_data.date_time;
  const {salary_list} = state.set_data.user_list;
  const formatDateDisplay = moment(day ? day : new Date())
    .locale('vi')
    .format('dddd, DD/MM/YYYY');
  const money = 3000000;

  const RenderItem = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={tw.style(
          'rounded-lg bg-white p-2 border border-gray-300 flex-row items-start gap-2',
        )}
        onPress={() => {
          navigation.navigate({
            name: SCREEN_NAVIGATE.Salary_Detail_Screen,
            params: {
              data: item,
              day: day,
            },
          });
        }}>
        <Image
          source={require('../../../../assets/images/logo_company/logo_square.png')}
          resizeMode="contain"
          style={tw.style(
            'w-[50px] h-[50px] border border-gray-200 rounded-full',
          )}
        />
        <View style={tw.style('flex-col gap-1 flex-1 w-1')}>
          <Text style={tw.style('text-black font-bold text-[14px] capitalize')}>
            Nguyễn Văn A
          </Text>
          <Text style={tw.style('text-gray-400 text-[12px]')}>
            Phòng ban: Nhân sự
          </Text>
          <Text style={tw.style('text-blue-600 text-[12px]')}>
            Lương cơ bản: {formatVND(money)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

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
      <CalendarCP />
      <View style={tw.style('flex-row px-3 bg-white')}>
        <Text style={tw.style('text-black font-bold')}>Bảng lương: </Text>
        <Text style={tw.style('text-red-500 font-bold capitalize flex-1 w-1')}>
          {formatDateDisplay}
        </Text>
      </View>
      <View style={tw.style('p-3 flex-grow bg-white')}>
        <View style={tw.style('flex-1')}>
          {salary_list.length > 0 ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={salary_list}
              contentContainerStyle={tw.style('flex-grow gap-2')}
              keyExtractor={item => item.toString()}
              renderItem={RenderItem}
            />
          ) : (
            <View style={tw.style('items-center justify-center flex-1')}>
              <Text style={tw.style('text-center text-black italic')}>
                Không tìm thấy dữ liệu
              </Text>
            </View>
          )}
        </View>
      </View>
      {/* <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw.style('p-3 flex-grow bg-white')}>
      </ScrollView> */}
    </SafeAreaView>
  );
}
