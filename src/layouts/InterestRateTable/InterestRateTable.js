/* eslint-disable prettier/prettier */
import {Text, RefreshControl, View, Image, ImageBackground} from 'react-native';
import React, {useCallback, useState} from 'react';
import styles from './InterestRateTableCss';
import {ScrollView} from 'native-base';
import {Footer} from '../../components';
import Top from '../../HeaderStyles/Top';
import WelcomeHD from '../../HeaderStyles/WelcomeHD';
import LoginRegisterHD from '../../HeaderStyles/LoginRegisterHD';
import {useAppContext} from '../../utils';

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
  const {state} = useAppContext();
  const {currentUser} = state;
  const [refreshing, setRefreshing] = useState(false);
  const [showEye, setShowEye] = useState(false);
  const [isTab, setIsTab] = useState(1);
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
        source={require('../../assets/images/bg_fund01.png')}
        resizeMode="cover">
        <View style={[styles.container_total]}>
          <Top
            showEye={showEye}
            onTouchStart={handleShowEye}
            paddingHorizontal={15}
            navigation={navigation}
          />
          <WelcomeHD showEye={showEye} />
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
