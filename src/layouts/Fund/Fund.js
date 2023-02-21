/* eslint-disable prettier/prettier */
import {ImageBackground, RefreshControl, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import styles from './FundCss';
import {ScrollView} from 'native-base';
import {Footer, LoginRegisterAction, MenuItem} from '../../components';
import {useAppContext} from '../../utils';
import stylesGeneral from '../../styles/General';
import {routersMain} from '../../routers/Main';
import Top from '../../HeaderStyles/Top';
import WelcomeHD from '../../HeaderStyles/WelcomeHD';
import LoginRegisterHD from '../../HeaderStyles/LoginRegisterHD';

const Fund = ({navigation}) => {
  const {state} = useAppContext();
  const {currentUser} = state;
  const [refreshing, setRefreshing] = useState(false);
  const [showEye, setShowEye] = useState(false);
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const handleShowEye = () => {
    setShowEye(!showEye);
  };
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
          />
          <WelcomeHD showEye={showEye} fund />
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
