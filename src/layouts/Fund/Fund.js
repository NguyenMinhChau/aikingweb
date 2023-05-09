/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import {ImageBackground, RefreshControl, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import styles from './FundCss';
import {ScrollView, useToast} from 'native-base';
import {Footer, LoginRegisterAction, MenuItem} from '../../components';
import {useAppContext} from '../../utils';
import stylesGeneral from '../../styles/General';
import {routersMain} from '../../routers/Main';
import Top from '../../HeaderStyles/Top';
import WelcomeHD from '../../HeaderStyles/WelcomeHD';
import LoginRegisterHD from '../../HeaderStyles/LoginRegisterHD';
import {userGetAssetSV} from '../../services/user';
import requestRefreshToken from '../../utils/axios/refreshToken';
import {setCurrentUserPL} from '../../app/payloads/user';

const Fund = ({navigation}) => {
  const toast = useToast();
  const {state, dispatch} = useAppContext();
  const {currentUser, dataAssets} = state;
  const [refreshing, setRefreshing] = useState(false);
  const [showEye, setShowEye] = useState(false);
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
  const totalFund =
    parseFloat(dataAssets?.contractsUSD) +
    parseFloat(dataAssets?.contractsAGRICULTURE);
  return (
    <>
      <ImageBackground
        borderBottomLeftRadius={30}
        borderBottomRightRadius={30}
        style={[styles.container_bgc]}
        source={require('../../assets/images/bg_fund.png')}
        resizeMode="cover">
        <View style={[styles.container_total]}>
          <Top
            showEye={showEye}
            onTouchStart={handleShowEye}
            paddingHorizontal={15}
            navigation={navigation}
            fund
            totalFund={totalFund}
          />
          <WelcomeHD
            showEye={showEye}
            fund
            totalFundInvestment={parseFloat(dataAssets?.contractsUSD) || 0}
            totalFundAgricultural={
              parseFloat(dataAssets?.contractsAGRICULTURE) || 0
            }
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
        {!currentUser ? (
          <LoginRegisterAction navigation={navigation} marginBottom={15} />
        ) : (
          <>
            <View style={[styles.actions_container, stylesGeneral.mt10]}>
              <Text style={[styles.actions_title]}>Menu</Text>
              <ScrollView
                showsVerticalScrollIndicator={false}
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                <View style={[styles.actions_list]}>
                  <MenuItem
                    nameIcon="table"
                    textDesc="Bảng quỹ tham khảo"
                    onTouchStart={() => {
                      navigation.navigate(routersMain.InterestRateTable);
                    }}
                  />
                  <MenuItem
                    nameIcon="paper-plane"
                    textDesc="Gửi quỹ"
                    onTouchStart={() => {
                      navigation.navigate(routersMain.SendFunds);
                    }}
                  />
                  <MenuItem
                    nameIcon="tasks"
                    textDesc="Quản lý quỹ"
                    onTouchStart={() => {
                      navigation.navigate(routersMain.FundManagement);
                    }}
                  />
                </View>
              </ScrollView>
            </View>
          </>
        )}
        <Footer marginTop={20} marginBottom={20} />
      </ScrollView>
    </>
  );
};

export default Fund;
