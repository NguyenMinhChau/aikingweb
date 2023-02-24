/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import {Text, RefreshControl, View, Image, ImageBackground} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import styles from './InterestRateTableCss';
import {ScrollView, useToast} from 'native-base';
import {Footer} from '../../components';
import Top from '../../HeaderStyles/Top';
import WelcomeHD from '../../HeaderStyles/WelcomeHD';
import LoginRegisterHD from '../../HeaderStyles/LoginRegisterHD';
import {useAppContext} from '../../utils';
import {userGetAssetSV} from '../../services/user';
import requestRefreshToken from '../../utils/axios/refreshToken';
import {setCurrentUserPL} from '../../app/payloads/user';

const LIST_TABS = [
  {
    id: 1,
    name: 'Quỹ đầu tư USD',
    uriImage: require('../../assets/images/quydautuusd.png'),
  },
  {
    id: 2,
    name: 'Quỹ phát triển nông nghiệp',
    uriImage: require('../../assets/images/quyphattriennongnghiep.png'),
  },
];

const InterestRateTable = ({navigation}) => {
  const toast = useToast();
  const {state, dispatch} = useAppContext();
  const {currentUser, dataAssets} = state;
  const [refreshing, setRefreshing] = useState(false);
  const [showEye, setShowEye] = useState(false);
  const [isTab, setIsTab] = useState(1);
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const handleSendAssets = dataToken => {
    userGetAssetSV({
      id_user: currentUser?.id,
      token: dataToken?.token,
      dispatch,
      toast,
    });
  };
  useEffect(() => {
    requestRefreshToken(
      currentUser,
      handleSendAssets,
      state,
      dispatch,
      setCurrentUserPL,
      toast,
    );
  }, []);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    requestRefreshToken(
      currentUser,
      handleSendAssets,
      state,
      dispatch,
      setCurrentUserPL,
      toast,
    );
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const handleShowEye = () => {
    setShowEye(!showEye);
  };
  const totalAssets =
    parseFloat(dataAssets?.fund_wallet) +
    parseFloat(0) +
    parseFloat(dataAssets?.surplus);
  return (
    <>
      <ImageBackground
        borderBottomLeftRadius={30}
        borderBottomRightRadius={30}
        style={[styles.container_bgc]}
        source={require('../../assets/images/bg_fund01.png')}
        resizeMode="cover">
        <View style={[styles.container_total]}>
          <Top
            showEye={showEye}
            onTouchStart={handleShowEye}
            paddingHorizontal={15}
            navigation={navigation}
            totalAssets={totalAssets || 0}
          />
          <WelcomeHD
            showEye={showEye}
            walletFund={parseFloat(dataAssets?.fund_wallet) || 0}
            walletInvestment={0}
            surplus={parseFloat(dataAssets?.surplus) || 0}
          />
          {!currentUser && <LoginRegisterHD navigation={navigation} />}
        </View>
      </ImageBackground>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={[styles.container]}>
        <View style={[styles.list_actions]}>
          {LIST_TABS.map((item, index) => {
            return (
              <View
                key={index}
                style={[
                  styles.actions_item,
                  index === LIST_TABS.length - 1 && styles.borderRight,
                  isTab === item?.id && styles.active,
                ]}
                onTouchStart={() => setIsTab(item?.id)}>
                <Text style={[styles.item_text]}>{item.name}</Text>
              </View>
            );
          })}
        </View>
        {/* <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        </ScrollView> */}
        <View style={[styles.body]}>
          {/* <AssetsTotalCp
            priceAsset={0}
            fundWallet={0}
            investmentWallet={0}
            surplus={0}
            marginBottom={15}
            marginTop={30}
          /> */}
          {LIST_TABS.map((Item, index) => {
            return (
              isTab === Item?.id && (
                <Image
                  key={index}
                  source={Item?.uriImage}
                  style={[styles.image]}
                  resizeMode="cover"
                />
              )
            );
          })}
        </View>
        <Footer marginTop={20} marginBottom={20} />
      </ScrollView>
    </>
  );
};

export default InterestRateTable;
