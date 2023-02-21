/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {View, Text, Image} from 'react-native';
import React, {useState} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import styles from './AssetsTotalCpCss';
import {BLACK_COLOR, PRIMARY_COLOR} from '../../styles/colors';
import RowDetail from '../RowDetail/RowDetail';
import {formatVND} from '../../utils/format/Money';

const AssetsTotalCp = ({
  priceAsset,
  fundWallet,
  investmentWallet,
  surplus,
  marginTop,
  marginBottom,
}) => {
  const [showEye, setShowEye] = useState(false);
  const handleShowEye = () => {
    setShowEye(!showEye);
  };
  return (
    <View
      style={[
        styles.total_assets,
        {marginTop: marginTop, marginBottom: marginBottom},
      ]}>
      <View style={[styles.total_assets_header]}>
        <View style={[styles.total_assets_header_image_container]}>
          <Image
            source={require('../../assets/images/ProvidentFundLogo.png')}
            style={[styles.total_assets_header_image]}
            resizeMode="contain"
          />
        </View>
        <View
          style={[styles.total_assets_header_text_container]}
          onTouchStart={handleShowEye}>
          <Text style={[styles.total_assets_header_text]}>
            Chào bạn,{' '}
            <FontAwesome5
              name={showEye ? 'eye' : 'eye-slash'}
              size={15}
              color={BLACK_COLOR}
            />
          </Text>
        </View>
      </View>
      <View style={{marginTop: 30}}>
        <RowDetail
          title="Tổng tài sản"
          text={showEye ? formatVND(priceAsset) : '******VND'}
          marginLeft={0}
          colorIconFront={PRIMARY_COLOR}
          styleDesc={{flex: 1, textAlign: 'right', color: PRIMARY_COLOR}}
        />
        <RowDetail
          title="Ví quỹ"
          text={showEye ? formatVND(fundWallet) : '******VND'}
          marginLeft={0}
          marginTop={10}
          colorIconFront={PRIMARY_COLOR}
          styleDesc={{flex: 1, textAlign: 'right', color: PRIMARY_COLOR}}
        />
        <RowDetail
          title="Ví đầu tư"
          text={showEye ? formatVND(investmentWallet) : '******VND'}
          marginLeft={0}
          marginTop={10}
          colorIconFront={PRIMARY_COLOR}
          styleDesc={{flex: 1, textAlign: 'right', color: PRIMARY_COLOR}}
        />
        <RowDetail
          title="Số dư"
          text={showEye ? formatVND(surplus) : '******VND'}
          marginLeft={0}
          marginTop={10}
          colorIconFront={PRIMARY_COLOR}
          styleDesc={{flex: 1, textAlign: 'right', color: PRIMARY_COLOR}}
          noneBorderBottom
        />
      </View>
    </View>
  );
};

export default AssetsTotalCp;
