import React from 'react';
import {TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import TextInputCP from './TextInputCP';

export default function DateSelect({
  visible,
  value,
  onChange,
  onPressDate,
  subLabel = '',
  name = 'date',
}) {
  return (
    <>
      <TouchableOpacity onPress={onPressDate}>
        <TextInputCP
          value={value.toLocaleDateString('en-US', {})}
          editable={false}
          label={`Ngày ${subLabel}`}
        />
      </TouchableOpacity>
      {visible && (
        <DateTimePicker
          value={value}
          mode="date"
          display="default"
          onChange={(event, date) => {
            onChange(date || value, name);
          }}
        />
      )}
    </>
  );
}
