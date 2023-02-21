/* eslint-disable prettier/prettier */
import {View, Text} from 'react-native';
import React from 'react';
import styles from './HeadersCss';
import {routersMain} from '../routers/Main';

const LoginRegisterHD = ({navigation}) => {
  return (
    <View style={[styles.login_register_container]}>
      <View
        style={[styles.login_container]}
        onTouchStart={() => {
          navigation.navigate(routersMain.Login);
        }}>
        <Text style={[styles.login_text]}>Đăng nhập</Text>
      </View>
      <View
        style={[styles.register_container]}
        onTouchStart={() => {
          navigation.navigate(routersMain.Register);
        }}>
        <Text style={[styles.register_text]}>Đăng ký</Text>
      </View>
    </View>
  );
};

export default LoginRegisterHD;
