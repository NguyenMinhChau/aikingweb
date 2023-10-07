import * as React from 'react';
import {TextInput} from 'react-native-paper';
import tw from '../../styles/twrnc.global';

const TextInputCP = (
  {
    value,
    onChange,
    type = 'outlined',
    label,
    disabled = false,
    placeholder,
    placeholderTextColor,
    error = false,
    style,
    contentStyle,
    outlinedStyle,
    outlineColor = '#ccc',
    editable = true,
    leftContent,
    rightContent,
    multiline = false,
    textColor = '#000000',
    secureTextEntry = false,
    onSubmitEditing,
    keyboardType = 'default',
    autoCorrect = false,
    returnKeyType = 'next',
    cursorColor = '#000000',
    theme = {
      colors: {
        primary: tw.color('gray-500'),
      },
    },
  },
  ref,
) => {
  return (
    <TextInput
      mode={type}
      label={label}
      value={value}
      onChangeText={text => onChange(text)}
      disabled={disabled}
      editable={editable}
      placeholder={placeholder}
      style={tw.style('min-h-[40px] mb-2 bg-white text-[15px]', {
        ...style,
      })}
      cursorColor={cursorColor}
      textColor={textColor}
      placeholderTextColor={
        placeholderTextColor ? placeholderTextColor : tw.color('gray-400')
      }
      error={error}
      outlineColor={outlineColor}
      outlineStyle={tw.style('rounded-lg', {...outlinedStyle})}
      left={leftContent}
      right={rightContent}
      multiline={multiline}
      contentStyle={tw.style({...contentStyle})}
      secureTextEntry={secureTextEntry}
      onSubmitEditing={onSubmitEditing}
      keyboardType={keyboardType}
      returnKeyType={returnKeyType}
      autoCorrect={autoCorrect}
      ref={ref}
      theme={theme}
    />
  );
};

export default React.forwardRef(TextInputCP);
