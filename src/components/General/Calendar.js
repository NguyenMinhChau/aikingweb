import React from 'react';
import {Image, View, Text} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {
  BLACK_COLOR,
  PRIMARY_COLOR,
  WHITE_COLOR,
} from '../../../src/styles/colors.global';
import useAppContext from '../../../src/utils/hooks/useAppContext';
import {SET_DATA_PAYLOAD} from '../../components/Context/AppContext.reducer';
import tw from '../../../src/styles/twrnc.global';
import {yyyy_mm} from '../../../src/utils/TimerFormat';

export default function CalendarCP() {
  const {dispatch, state} = useAppContext();
  const {day} = state.set_data.date_time;
  const renderHeader = date => {
    const month = date.toString('MMMM');
    const year = date.getFullYear().toString();
    return (
      <View style={tw.style('flex-col items-center justify-center')}>
        <Text
          style={tw.style('text-[22px] font-bold text-[#222B45] capitalize')}>
          {month}
        </Text>
        <Text style={tw.style('text-[14px] text-[#8F9BB3]')}>{year}</Text>
      </View>
    );
  };
  const renderArrow = direction => {
    const image =
      direction === 'left'
        ? require('../../../src/assets/images/icons/arrow_left.png')
        : require('../../../src/assets/images/icons/arrow_right.png');
    return (
      <Image
        source={image}
        style={{
          width: 12,
          height: 10,
        }}
      />
    );
  };
  const handleChange = (key, value) => {
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'date_time',
        value: {
          [key]: value,
        },
      }),
    );
  };
  const handleDayPress = day => {
    handleChange('day', day.dateString);
  };
  LocaleConfig.locales['vi'] = {
    monthNames: [
      'Tháng 01',
      'Tháng 02',
      'Tháng 03',
      'Tháng 04',
      'Tháng 05',
      'Tháng 06',
      'Tháng 07',
      'Tháng 08',
      'Tháng 09',
      'Tháng 10',
      'Tháng 11',
      'Tháng 12',
    ],
    monthNamesShort: [
      'Th.1',
      'Th.2',
      'Th.3',
      'Th.4',
      'Th.5',
      'Th.6',
      'Th.7',
      'Th.8',
      'Th.9',
      'Th.10',
      'Th.11',
      'Th.12',
    ],
    dayNames: [
      'Chủ Nhật',
      'Thứ Hai',
      'Thứ Ba',
      'Thứ Tư',
      'Thứ Năm',
      'Thứ Sáu',
      'Thứ Bảy',
    ],
    dayNamesShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
    today: 'Hôm Nay',
  };
  LocaleConfig.defaultLocale = 'vi';

  React.useEffect(() => {
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'date_time',
        value: {
          day: new Date(),
          month: new Date(),
        },
      }),
    );
  }, []);

  return (
    <View style={tw``}>
      <Calendar
        theme={{
          backgroundColor: WHITE_COLOR,
          calendarBackground: WHITE_COLOR,
          textSectionTitleColor: '#b6c1cd',
          selectedDayBackgroundColor: PRIMARY_COLOR,
          selectedDayTextColor: WHITE_COLOR,
          todayTextColor: BLACK_COLOR,
          dayTextColor: '#2d4150',
          textDisabledColor: '#d9e1e8',
          todayBackgroundColor: '#dfe6e9',
        }}
        renderHeader={renderHeader}
        renderArrow={renderArrow}
        onDayPress={handleDayPress}
        onMonthChange={date => {
          handleChange('month', yyyy_mm(date.dateString));
        }}
        markingType={'multi-dot'}
        markedDates={{
          [`${day}`]: {
            selected: true,
          },
        }}
      />
    </View>
  );
}
