/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {View, Text, TextInput} from 'react-native';
import React from 'react';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import styles from './InputItemCss';
import {PRIMARY_COLOR} from '../../styles/colors';
import stylesGeneral from '../../styles/General';

const InputItem = ({
  label,
  placeholder,
  nameInput,
  value,
  handleChange,
  marginTop,
  isPassword,
  isShowPwd,
  handleShowPwd,
  typeInput,
  disabled,
  unit,
}) => {
  return (
    <View style={[styles.input_container, {marginTop: marginTop}]}>
      <Text style={[styles.input_label]}>{label}</Text>
      <View style={[isPassword && styles.input_relative]}>
        <TextInput
          style={[
            styles.input,
            disabled && styles.input_disabled,
            {paddingRight: isPassword ? 35 : unit ? 70 : 10},
          ]}
          placeholder={placeholder}
          keyboardType={typeInput ? typeInput : 'default'}
          placeholderTextColor="#999999"
          cursorColor={PRIMARY_COLOR}
          secureTextEntry={isPassword && (isShowPwd ? false : true)}
          onChangeText={itemValue => handleChange(nameInput, itemValue)}
          value={value}
          editable={!disabled}
        />
        {isPassword && (
          <View style={[styles.icon]} onTouchStart={handleShowPwd}>
            <FontAwesome5Icon
              name={isShowPwd ? 'eye' : 'eye-slash'}
              size={15}
              color="#999999"
            />
          </View>
        )}
        {unit && (
          <View style={[styles.icon, stylesGeneral.flexRow]}>
            <Text style={[styles.border_left]}>|</Text>
            <Text style={[styles.text_unit]}>{unit}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default InputItem;
