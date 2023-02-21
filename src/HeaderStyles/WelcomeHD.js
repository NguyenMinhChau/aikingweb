/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
import {View, Text} from 'react-native';
import React from 'react';
import styles from './HeadersCss';
import {useAppContext} from '../utils';
import {formatVND} from '../utils/format/Money';

const WelcomeHD = ({
  showEye,
  fund,
  totalFundInvestment = 0,
  totalFundAgricultural = 0,
  walletFund = 0,
  walletInvestment = 0,
  surplus = 0,
}) => {
  const {state} = useAppContext();
  const {currentUser} = state;
  return (
    <View style={[styles.container]}>
      {!currentUser ? (
        <View style={[styles.container_desc]}>
          <Text style={[styles.text_header]}>Chào mừng bạn đến với</Text>
          <Text style={[styles.text_middle]}>AIKING GROUP</Text>
          <Text style={[styles.text_footer]}>Đầu tư & tích lũy</Text>
        </View>
      ) : (
        <>
          {fund ? (
            <View style={[styles.Total_capital_container_list]}>
              <View style={[styles.Total_capital_container]}>
                <Text style={[styles.Total_capital_text]}>Tổng đầu tư USD</Text>
                <Text style={[styles.Total_capital_number]}>
                  {showEye ? formatVND(totalFundInvestment) : '*****₫'}{' '}
                  <Text style={[styles.Total_capital_number_curency]}></Text>
                </Text>
              </View>
              <View style={[styles.Total_capital_container]}>
                <Text style={[styles.Total_capital_text]}>
                  Quỹ phát triển nông nghiệp
                </Text>
                <Text style={[styles.Total_capital_number]}>
                  {showEye ? formatVND(totalFundAgricultural) : '*****₫'}{' '}
                  <Text style={[styles.Total_capital_number_curency]}></Text>
                </Text>
              </View>
            </View>
          ) : (
            <View style={[styles.Total_capital_container_list]}>
              <View style={[styles.Total_capital_container]}>
                <Text style={[styles.Total_capital_text]}>Ví quỹ</Text>
                <Text style={[styles.Total_capital_number]}>
                  {showEye ? formatVND(walletFund) : '*****₫'}{' '}
                  <Text style={[styles.Total_capital_number_curency]}></Text>
                </Text>
              </View>
              <View style={[styles.Total_capital_container]}>
                <Text style={[styles.Total_capital_text]}>Ví đầu tư</Text>
                <Text style={[styles.Total_capital_number]}>
                  {showEye ? formatVND(walletInvestment) : '*****₫'}{' '}
                  <Text style={[styles.Total_capital_number_curency]}></Text>
                </Text>
              </View>
              <View style={[styles.Total_capital_container]}>
                <Text style={[styles.Total_capital_text]}>Số dư</Text>
                <Text style={[styles.Total_capital_number]}>
                  {showEye ? formatVND(surplus) : '*****₫'}{' '}
                  <Text style={[styles.Total_capital_number_curency]}></Text>
                </Text>
              </View>
            </View>
          )}
        </>
      )}
    </View>
  );
};

export default WelcomeHD;
