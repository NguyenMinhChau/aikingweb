/* eslint-disable prettier/prettier */
import {View, Text} from 'react-native';
import React from 'react';
import styles from './FooterCss';

const Footer = ({marginTop, marginBottom, colorText}) => {
  return (
    <View style={[styles.footer, {marginTop: marginTop}]}>
      <Text
        style={[
          styles.footer_text,
          {marginBottom: marginBottom, color: colorText},
        ]}>
        © 2023{' '}
        {new Date().getFullYear() > 2023 && '- ' + new Date().getFullYear()} |
        AIKING GROUP
      </Text>
    </View>
  );
};

export default Footer;
