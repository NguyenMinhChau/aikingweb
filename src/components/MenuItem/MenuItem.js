/* eslint-disable prettier/prettier */
import {View, Text} from 'react-native';
import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import styles from './MenuItemCss';

const MenuItem = ({nameIcon, textDesc, onTouchStart, resetMargin}) => {
  return (
    <View
      style={[
        styles.actions_item,
        resetMargin && styles.actions_item_reset_margin,
      ]}
      onTouchStart={onTouchStart}>
      <View style={[styles.actions_item_logo]}>
        <FontAwesome5 name={nameIcon} size={20} color="white" />
      </View>
      <View style={[styles.actions_item_text]}>
        <Text style={[styles.actions_item_text_title]}>{textDesc}</Text>
      </View>
    </View>
  );
};

export default MenuItem;
