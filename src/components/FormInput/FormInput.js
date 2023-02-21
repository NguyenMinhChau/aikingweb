/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import {forwardRef, useRef, useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {PRIMARY_COLOR} from '../../styles/colors';
import styles from './FormInputCss';

const FormInput = (
  {
    label,
    labelTransform,
    isTransformFocus,
    value,
    placeholder,
    secureTextEntry = false,
    onChangeText,
    onChange,
    keyboardType,
    icon,
    name,
    nameSymbol,
    color,
    colorSymbol,
    showPwd,
  },
  ref,
) => {
  const [isShowPwd, setIsShowPwd] = useState(false);
  const handleShowPwd = () => {
    setIsShowPwd(!isShowPwd);
  };
  const refLabelFocus = useRef(null);
  return (
    <View style={[styles.input_item]}>
      {label && <Text style={[styles.label]}>{label}</Text>}
      <View style={[styles.input_relative]}>
        {nameSymbol && (
          <View style={[styles.icon_symbol]}>
            <FontAwesome5 name={nameSymbol} size={20} color={colorSymbol} />
          </View>
        )}
        {labelTransform && (
          <Text ref={refLabelFocus} style={[styles.labelTransform]}>
            {labelTransform}
          </Text>
        )}
        <TextInput
          // ascii-capable, number-pad, name-phone-pad, numbers-and-punctuation, phone-pad
          keyboardType={keyboardType}
          placeholder={placeholder ? placeholder : ''}
          style={[
            styles.input,
            icon && styles.input_padding_right,
            nameSymbol && styles.input_padding_left,
          ]}
          placeholderTextColor="#fff"
          secureTextEntry={!isShowPwd && secureTextEntry}
          ref={ref}
          onChangeText={onChangeText}
          onChange={onChange}
          value={value}
          cursorColor={PRIMARY_COLOR}
          onFocus={() => {
            if (isTransformFocus) {
              refLabelFocus &&
                refLabelFocus.current.setNativeProps({
                  style: {
                    top: '10%',
                    left: 0,
                  },
                });
            }
          }}
          onBlur={() => {
            if (isTransformFocus) {
              refLabelFocus &&
                refLabelFocus.current.setNativeProps({
                  style: {
                    top: '50%',
                    left: 30,
                  },
                });
            }
          }}
        />
        {(icon || color) && (
          <View style={[styles.icon]}>
            {showPwd ? (
              <>
                {isShowPwd ? (
                  <View onTouchStart={handleShowPwd}>
                    <FontAwesome5 name="eye" size={20} color={color} />
                  </View>
                ) : (
                  <View onTouchStart={handleShowPwd}>
                    <FontAwesome5 name="eye-slash" size={20} color={color} />
                  </View>
                )}
              </>
            ) : (
              <FontAwesome5 name={name} size={20} color={color} />
            )}
          </View>
        )}
      </View>
    </View>
  );
};

export default forwardRef(FormInput);
