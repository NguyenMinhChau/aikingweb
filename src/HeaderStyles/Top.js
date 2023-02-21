/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {View, Text} from 'react-native';
import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import styles from './HeadersCss';
import {useAppContext} from '../utils';
import {formatVND} from '../utils/format/Money';

const Top = ({
  showEye,
  onTouchStart,
  marginTop,
  paddingHorizontal,
  navigation,
  fund,
  totalAssets = 0,
  totalFund = 0,
}) => {
  const {state} = useAppContext();
  const {currentUser} = state;
  return (
    <View
      style={[
        styles.container_header,
        {marginTop: marginTop, paddingHorizontal: paddingHorizontal},
      ]}>
      <View onTouchStart={navigation ? () => navigation.goBack() : () => {}}>
        <FontAwesome5
          name={navigation ? 'arrow-left' : 'hand-holding-usd'}
          size={navigation ? 22 : 30}
          color={'white'}
        />
      </View>
      {currentUser && (
        <View
          style={[styles.Total_capital_container, {marginLeft: 20}]}
          onTouchStart={onTouchStart}>
          <Text style={[styles.Total_capital_text]}>
            {fund ? 'Tổng quỹ' : 'Tổng tài sản'}
            {'  '}
            <FontAwesome5
              name={showEye ? 'eye' : 'eye-slash'}
              size={12}
              color={'white'}
            />
          </Text>
          <Text style={[styles.Total_capital_number]}>
            {showEye
              ? formatVND(fund ? totalFund : totalAssets).replace('VND', '')
              : '*****₫'}{' '}
            <Text style={[styles.Total_capital_number_curency]}></Text>
          </Text>
        </View>
      )}
      <View style={[styles.date_container]}>
        <Text style={[styles.date_text]}>
          {(new Date().getDate() < 9
            ? '0' + new Date().getDate()
            : new Date().getDate()) +
            '/' +
            (new Date().getMonth() + 1 < 9
              ? '0' + (new Date().getMonth() + 1)
              : new Date().getMonth() + 1) +
            '/' +
            new Date().getFullYear()}
        </Text>
      </View>
    </View>
  );
};

export default Top;
