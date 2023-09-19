import React from 'react';
import {TouchableOpacity, View, Text, Image} from 'react-native';
import tw from '../../styles/twrnc.global';

export default function RadioGroupCP({
  dataOptions,
  valueSelect,
  setValSelect,
  style,
  styleLabel,
}) {
  return (
    <>
      {dataOptions.map((item, _idx) => {
        const isCheckedList = dataOptions.filter(item => {
          return item?.value === valueSelect?.value;
        });
        return (
          <TouchableOpacity
            key={_idx}
            onPress={() => {
              setValSelect(item);
            }}
            activeOpacity={0.9}>
            <View
              style={tw.style(
                'px-3 py-1 border rounded-lg flex-row justify-center items-center',
                {
                  borderColor:
                    isCheckedList[0]?.value !== item?.value
                      ? '#707070'
                      : '#0C7CFF',
                  ...style,
                },
              )}>
              {isCheckedList[0]?.value === item?.value && (
                <View
                  style={tw`w-[15px] h-[15px] rounded-full mr-1 bg-[#0C7CFF] justify-center items-center`}>
                  <Image
                    source={require('../../assets/images/icons/tick_ok_small.png')}
                    style={{alignSelf: 'center'}}
                  />
                </View>
              )}
              {isCheckedList[0]?.value !== item?.value && (
                <View
                  style={tw`w-[15px] h-[15px] rounded-full mr-1 border border-gray-400`}
                />
              )}

              <Text
                style={tw.style({
                  color:
                    isCheckedList[0]?.value !== item?.value
                      ? '#707070'
                      : '#0C7CFF',
                  fontSize: 14.5,
                  alignSelf: 'center',
                  ...styleLabel,
                })}>
                {item?.label}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </>
  );
}
