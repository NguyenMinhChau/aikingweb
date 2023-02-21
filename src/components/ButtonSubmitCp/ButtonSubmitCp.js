/* eslint-disable prettier/prettier */
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import React from 'react';
import styles from './ButtonSubmitCpCss';
import stylesStatus from '../../styles/Status';
import stylesGeneral from '../../styles/General';

const ButtonSubmitCp = ({
  isProcess,
  buttonText,
  handleSubmit,
  bgcButton,
  marginTop,
  marginBottom,
}) => {
  return (
    <View style={[styles.container]}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handleSubmit}
        disabled={isProcess}
        style={[
          styles.btn_submit,
          stylesStatus.status,
          bgcButton ? bgcButton : stylesStatus.confirmbgcbold,
          isProcess && stylesGeneral.op6,
          {
            marginTop: marginTop,
            marginBottom: marginBottom,
          },
        ]}>
        <Text style={[styles.btn_text, stylesStatus.white]}>
          {isProcess ? <ActivityIndicator color="white" /> : buttonText}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ButtonSubmitCp;
