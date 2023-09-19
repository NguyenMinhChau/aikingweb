import React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {TouchableOpacity} from 'react-native';
import TextInputCP from './TextInputCP';

export default function TimeSelect({
  visible,
  value,
  onChange,
  headerTextIOS = 'Pick a time',
  onPressTime,
  subLabel = '',
  name = 'time',
}) {
  return (
    <>
      <TouchableOpacity onPress={onPressTime}>
        <TextInputCP
          value={
            value &&
            value.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: false, // Use 24-hour format
            })
          }
          editable={false}
          label={`Thời gian ${subLabel}`}
        />
      </TouchableOpacity>
      {visible && (
        <DateTimePicker
          value={value}
          mode="time"
          headerTextIOS={headerTextIOS} // Custom header text for iOS
          is24Hour={true}
          display="default"
          onChange={(event, time) => onChange(time || value, name)}
        />
      )}
    </>
  );
}
