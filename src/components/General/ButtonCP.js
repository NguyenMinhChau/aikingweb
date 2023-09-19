import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import tw from '../../styles/twrnc.global';

export default function ButtonCP({
  colorBorder = '#7635DC',
  colorBG = '#7635DC',
  colorText = '#fff',
  text = 'Xác nhận',
  onPress,
  disabled = false,
  styleContainer = {},
  styleText = {},
  variant = 'contained',
}) {
  const bgBtn =
    variant === 'contained'
      ? disabled
        ? `bg-gray-300 border-gray-300`
        : `bg-[${colorBG}] border-[${colorBorder}]`
      : disabled
      ? `bg-transparent border-gray-300`
      : `bg-transparent border-[${colorBorder}]`;
  const clText =
    variant === 'contained'
      ? disabled
        ? `text-gray-400`
        : `text-[${colorText}]`
      : disabled
      ? `text-gray-400`
      : `text-[${colorBorder}]`;
  return (
    <>
      <TouchableOpacity
        onPress={disabled ? () => {} : onPress}
        activeOpacity={disabled ? 1 : 0.9}
        style={tw.style(
          `border rounded-md p-2 justify-center items-center `,
          bgBtn,
          {...styleContainer},
        )}>
        <Text
          style={tw.style(`font-bold text-[12px]`, clText, {
            ...styleText,
          })}>
          {text}
        </Text>
      </TouchableOpacity>
    </>
  );
}
