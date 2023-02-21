/* eslint-disable prettier/prettier */
import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './LoginRegisterActionCss';
import stylesStatus from '../../styles/Status';
import stylesGeneral from '../../styles/General';
import {routersMain} from '../../routers/Main';

const LoginRegisterAction = ({
  navigation,
  marginTop,
  marginBottom,
  paddingVertical,
  paddingHorizontal,
}) => {
  return (
    <View
      style={[
        styles.btn_actions_container,
        {
          marginTop: marginTop,
          marginBottom: marginBottom,
          paddingVertical: paddingVertical,
          paddingHorizontal: paddingHorizontal,
        },
      ]}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate(routersMain.Login)}
        style={[
          styles.btn_submit,
          stylesStatus.status,
          stylesStatus.cancelbgcbold,
          stylesGeneral.mr10,
        ]}>
        <Text style={[styles.btn_text, stylesStatus.white]}>Đăng nhập</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate(routersMain.Register)}
        style={[
          styles.btn_submit,
          stylesStatus.status,
          stylesStatus.confirmbgcbold,
          stylesGeneral.ml10,
        ]}>
        <Text style={[styles.btn_text, stylesStatus.white]}>Đăng ký</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginRegisterAction;
