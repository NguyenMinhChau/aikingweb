/* eslint-disable prettier/prettier */
import {View, Text} from 'react-native';
import React from 'react';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import styles from './ToastCpCss';

const ToastCp = ({colorIcon, title, desc, borderTopColor, bgc}) => {
  return (
    <View style={[styles.container]}>
      <View
        style={[
          styles.toast_custom_container,
          {borderTopColor: colorIcon, backgroundColor: bgc},
        ]}>
        <View style={[styles.toast_left]}>
          <FontAwesome5Icon
            name="info-circle"
            size={18}
            color={colorIcon}
            style={[styles.toast_icon]}
          />
        </View>
        <View style={[styles.toast_right]}>
          <Text style={[styles.toast_header]}>{title}</Text>
          <Text style={[styles.toast_desc]}>{desc}</Text>
        </View>
      </View>
    </View>
  );
};

export default ToastCp;
