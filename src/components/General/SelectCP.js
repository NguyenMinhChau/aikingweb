import React from 'react';
import {
  SelectList,
  MultipleSelectList,
} from 'react-native-dropdown-select-list';
import {BGC_INFO_COLOR, INFO_COLOR} from '../../styles/colors.global';

{
  /* <SelectCP
  placeholder="Model Name"
  searchPlaceholder="Tìm kiếm Model"
  dataOptions={[{value: 'Model 1'}, {value: 'Model 2'}, {value: 'Model 3'}]}
  onSelect={val => handleChangeForm('model_name', val)}
/>; */
}

export default function SelectCP({
  onSelect,
  dataOptions,
  placeholder,
  searchPlaceholder = 'Tìm kiếm',
  multiple = false,
  labelMultiple = '',
  notFoundText = 'Không tìm thấy',
  defaultValue,
}) {
  const Select = multiple ? MultipleSelectList : SelectList;
  return (
    <>
      <Select
        setSelected={onSelect}
        data={dataOptions}
        save="value"
        defaultOption={defaultValue}
        label={labelMultiple}
        placeholder={defaultValue ? defaultValue : placeholder}
        searchPlaceholder={searchPlaceholder}
        notFoundText={notFoundText}
        boxStyles={{
          borderWidth: 1,
          borderRadius: 8,
          borderColor: '#ccc',
          justifyContent: 'space-between',
          marginBottom: 8,
        }}
        inputStyles={{
          fontSize: 14,
          color: '#000',
          marginHorizontal: -4,
          padding: 0,
        }}
        dropdownStyles={{
          marginTop: 1,
          borderColor: '#ccc',
          borderRadius: 8,
          maxHeight: 200,
          marginBottom: 20,
          borderBottomWidth: 4,
        }}
        badgeStyles={{
          backgroundColor: BGC_INFO_COLOR,
        }}
        badgeTextStyles={{
          color: INFO_COLOR,
        }}
        dropdownTextStyles={{
          color: '#000',
        }}
      />
    </>
  );
}
