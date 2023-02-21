/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {View, Text, Image} from 'react-native';
import React from 'react';
import styles from './CreditCardCss';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {PRIMARY_COLOR} from '../../styles/colors';

const CreditCard = ({bankName, cardNumber, accountName}) => {
  return (
    <View style={[styles.Credit_card_container]}>
      <View style={[styles.Credit_card_header]}>
        <View style={[styles.trademark_container]}>
          <Image
            style={[styles.trademark_logo]}
            source={require('../../assets/images/ProvidentFundLogo.png')}
            resizeMode="contain"
          />
          <Text style={[styles.trademark_name_bank]}>{bankName}</Text>
        </View>
        <FontAwesome5 name="money-check" size={25} color={PRIMARY_COLOR} />
      </View>
      <View style={[styles.Credit_card_middle]}>
        <FontAwesome5
          name="caret-left"
          size={25}
          color={'#ccc'}
          style={{marginTop: 12}}
        />
        <View style={[styles.card_info_footer]}>
          <Image
            style={[styles.card_info_footer_logo]}
            source={require('../../assets/images/chip.png')}
            resizeMode="contain"
          />
          <Text style={[styles.number_card]}>{cardNumber}</Text>
        </View>
      </View>
      <View style={[styles.Credit_card_footer]}>
        <View style={[styles.accountName_card_container]}>
          <View style={[styles.ext_card_container]}>
            <Text style={[styles.ext_card_title]}>Ext:</Text>
            <Text style={[styles.ext_card_text]}>MM/YY</Text>
          </View>
          <Text style={[styles.accountName_card_text]}>{accountName}</Text>
        </View>
        <Image
          style={[styles.Credit_card_footer_logo]}
          source={require('../../assets/images/napas.png')}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

export default CreditCard;
