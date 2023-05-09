/* eslint-disable prettier/prettier */
import {View, Text} from 'react-native';
import React from 'react';
import styles from './SelectValueCpCss';
import {CheckIcon, Select, VStack} from 'native-base';
import {BORDER_BOTTOM_INPUT_COLOR, PRIMARY_COLOR} from '../../styles/colors';

const SelectValueCp = ({
  label,
  placeholder,
  valueSelect,
  data,
  handleChange,
  nameSelect,
  marginTop,
  handleSetItem,
}) => {
  return (
    <View style={[styles.container, {marginTop: marginTop}]}>
      <Text style={[styles.input_label]}>{label}</Text>
      <VStack alignItems="center" space={4}>
        <Select
          shadow={2}
          selectedValue={valueSelect}
          width={'100%'}
          marginTop={2}
          borderColor={BORDER_BOTTOM_INPUT_COLOR}
          borderRadius={8}
          accessibilityLabel={placeholder}
          fontSize={16}
          placeholder={placeholder}
          _selectedItem={{
            bg: PRIMARY_COLOR,
            endIcon: <CheckIcon size="5" color={'black'} />,
          }}
          onValueChange={itemValue => handleChange(nameSelect, itemValue)}>
          {data?.map((item, index) => {
            return (
              <Select.Item
                shadow={2}
                label={
                  item.name ||
                  item?.bank_name +
                    (item?.accountName || item?.account_name
                      ? ` - ${item.accountName || item?.account_name} - ${
                          item?.accountNumber || item?.account_number
                        }`
                      : '')
                }
                value={item.name || item?.bank_name}
                key={index}
                onTouchStart={
                  handleSetItem ? () => handleSetItem(item) : () => {}
                }
              />
            );
          })}
        </Select>
      </VStack>
    </View>
  );
};

export default SelectValueCp;
