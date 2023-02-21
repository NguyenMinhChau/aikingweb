/* eslint-disable prettier/prettier */
import {View, Text} from 'react-native';
import React, {useState} from 'react';
import styles from './TimerPickerCpCss';
import {BLACK_COLOR, PRIMARY_COLOR, WHITE_COLOR} from '../../styles/colors';
import {TimeDatePicker} from 'react-native-time-date-picker';
import {dateFormat} from '../../utils/format/Date';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';
import stylesStatus from '../../styles/Status';

const TimerPickerCp = ({
  time,
  setTime,
  label,
  placeholder,
  marginTop,
  marginBottom,
}) => {
  const [showDate, setShowDate] = useState(false);
  return (
    <View
      style={[
        styles.timer_picker_container,
        {
          marginTop: marginTop,
          marginBottom: marginBottom,
        },
      ]}>
      <Text style={[styles.timer_picker_label]}>{label}</Text>
      <View
        style={[styles.timer_picker_frame_conatiner]}
        onTouchStart={() => {
          setShowDate(!showDate);
        }}>
        <Text style={[styles.timer_picker_frame_label]}>
          {time ? dateFormat(time, 'DD/MM/YYYY') : placeholder}
        </Text>
        <FontAwesome5 name="calendar-alt" size={20} color={PRIMARY_COLOR} />
      </View>
      {!showDate && time && moment(time).isBefore(new Date()) && (
        <View style={[styles.text_desc]}>
          <Text style={[styles.text, stylesStatus.cancel]}>
            Ngày chọn không được nhỏ hơn hoặc bằng ngày hiện tại
          </Text>
        </View>
      )}
      {showDate && (
        <TimeDatePicker
          selectedDate={time ? time : new Date()}
          style={[styles.timer_picker_item]}
          options={{
            backgroundColor: WHITE_COLOR,
            borderColor: PRIMARY_COLOR,
            selectedTextColor: WHITE_COLOR,
            textDefaultColor: '#999',
            textHeaderColor: BLACK_COLOR,
            mainColor: PRIMARY_COLOR,
            daysStyle: {
              borderRadius: 10,
              borderWidth: 1,
              borderColor: '#999',
              backgroundColor: WHITE_COLOR,
            },

            is24Hour: true,
          }}
          onMonthYearChange={month => {}}
          onTimeChange={timeVL => {}}
          onDateChange={date => {
            if (date) {
              setShowDate(!showDate);
              setTime(date);
            }
          }}
          onSelectedChange={selected => {
            setTime(selected);
          }}
        />
      )}
    </View>
  );
};

export default TimerPickerCp;
