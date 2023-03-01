/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {View, Text, Linking} from 'react-native';
import React from 'react';
import stylesGeneral from '../../styles/General';
import styles from './RowDetailCss';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import stylesStatus from '../../styles/Status';

export default function RowDetail({
  title,
  text,
  styleDesc,
  colorStatus,
  nameIcon,
  nameIconFront,
  colorIconFront,
  redirectName,
  navigation,
  noneBorderBottom,
  eye,
  showEye,
  onTouchStartEye,
  onTouchStart,
  marginTop,
  marginLeft,
  marginRight,
  urlLink,
  bankMethod,
  nameBank,
  accountNumber,
  accountName,
  copy,
  funcCopy,
  maxWidth,
}) {
  // const toast = useToast();
  const handlePress = async () => {
    // const supported = await Linking.canOpenURL(urlLink);
    // if (supported) {
    //   await Linking.openURL(urlLink);
    // } else {
    //   toastShow(toast, "Don't know how to open URI: " + urlLink);
    // }
    await Linking.openURL(urlLink);
  };
  return (
    <View
      onTouchStart={
        onTouchStart
          ? onTouchStart
          : redirectName
          ? () => navigation.navigate(redirectName)
          : () => {}
      }>
      <View
        style={[
          styles.info_detail_item,
          stylesGeneral.flexRow,
          noneBorderBottom && styles.borderBt0,
          {
            paddingBottom: !noneBorderBottom ? 10 : 0,
            marginTop: marginTop,
          },
        ]}>
        {nameIconFront && (
          <FontAwesome5 name={nameIconFront} size={20} color={colorIconFront} />
        )}
        <Text
          style={[
            styles.info_detail_title,
            {
              marginLeft: marginLeft,
              maxWidth: maxWidth,
              marginRight: marginRight,
            },
          ]}
          onTouchStart={eye ? onTouchStartEye : () => {}}>
          {title}{' '}
          {eye && (
            <FontAwesome5
              name={showEye ? 'eye' : 'eye-slash'}
              size={15}
              color={'#000'}
            />
          )}
        </Text>
        {text && (
          <Text
            style={[
              styles.info_detail_desc,
              stylesGeneral.text_black,
              styleDesc,
              stylesStatus[colorStatus],
            ]}
            onPress={urlLink ? handlePress : () => {}}>
            {text}
          </Text>
        )}
        {bankMethod && (
          <View style={{flex: 1, marginLeft: 8}}>
            <Text
              style={[
                styles.info_detail_desc,
                stylesGeneral.text_black,
                stylesGeneral.text_right,
              ]}>
              {nameBank}
            </Text>
            <Text
              style={[
                styles.info_detail_desc,
                stylesGeneral.text_black,
                stylesGeneral.text_right,
              ]}>
              {accountName}
            </Text>
            <Text
              style={[
                styles.info_detail_desc,
                stylesGeneral.text_black,
                stylesGeneral.text_right,
              ]}>
              {accountNumber}
              {copy && (
                <>
                  {' | '}
                  <Text
                    style={[
                      styles.text_copy,
                      stylesStatus.confirm,
                      stylesGeneral.fwbold,
                    ]}
                    onPress={() => funcCopy(accountNumber)}>
                    Sao chép
                  </Text>
                </>
              )}
            </Text>
          </View>
        )}
        {nameIcon && (
          <FontAwesome5
            name={nameIcon}
            size={12}
            style={{flex: 1, textAlign: 'right'}}
          />
        )}
      </View>
    </View>
  );
}
