/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import {
  Image,
  ImageBackground,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import styles from './HomeCss';
import {
  Footer,
  MenuItem,
  ProductItem,
  SliderHome,
  PackFutureItem,
  ToastCp,
} from '../../components';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import stylesGeneral from '../../styles/General';
import {routersMain} from '../../routers/Main';
import {useAppContext} from '../../utils';
import {Toast, useToast} from 'native-base';
import {TOAST_COLOR_SUCCESS, WHITE_COLOR} from '../../styles/colors';
import {formatUSDT} from '../../utils/format/Money';
import Top from '../../HeaderStyles/Top';
import WelcomeHD from '../../HeaderStyles/WelcomeHD';
import LoginRegisterHD from '../../HeaderStyles/LoginRegisterHD';
import {userGetAssetSV} from '../../services/user';
import requestRefreshToken from '../../utils/axios/refreshToken';
import {setCurrentUserPL} from '../../app/payloads/user';
import {DataFundUSD} from '../../utils/dataFund/usd';
import {DataFundAgritural} from '../../utils/dataFund/agricutural';

const images = [
  {
    id: '1',
    uri: 'https://media.istockphoto.com/id/1403479115/photo/employee-benifits-concept-indirect-and-non-cash-compensation-paid-to-employees-offered-to.jpg?b=1&s=170667a&w=0&k=20&c=HussAB8PU5yLocJBI45eYAG68eVfnT3M0aLLz-GTpBM=',
  },
  {
    id: '2',
    uri: 'https://media.istockphoto.com/id/172332507/photo/money-is-medicine-of-all.jpg?b=1&s=170667a&w=0&k=20&c=89Arf0kPrPQ66WqqZJcYMsR_UvOF96qxI5mRlpY66eY=',
  },
  {
    id: '3',
    uri: 'https://media.istockphoto.com/id/1372362922/photo/a-glass-jar-full-of-coins-and-a-plant-growing-through-it-concept-image-showing-investing-in.jpg?b=1&s=170667a&w=0&k=20&c=UQrsQuMZ6Zvi05A5ttLhR05V4qaAtON5SA9posN-_Xk=',
  },
];

const Home = ({navigation}) => {
  const toast = useToast();
  const {state, dispatch} = useAppContext();
  const {currentUser, dataAssets} = state;
  const [isShowAssets, setIsShowAssets] = React.useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showEye, setShowEye] = useState(false);
  const handleShowEye = () => {
    setShowEye(!showEye);
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
  }, [currentUser]);

  const handleShowAssest = () => {
    setIsShowAssets(!isShowAssets);
  };
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
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
  const showToast = () => {
    toast.show({
      title:
        'Màn hình đang được phát triển, quý khách vui lòng quay lại sau. Xin cám ơn!',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  const totalAssets =
    parseFloat(dataAssets?.fundWallet) +
    parseFloat(0) +
    parseFloat(dataAssets?.surplus);
  return (
    <>
      <ImageBackground
        borderBottomLeftRadius={30}
        borderBottomRightRadius={30}
        style={[styles.container_bgc]}
        source={require('../../assets/images/bg-login.png')}
        resizeMode="cover">
        <View style={[styles.container_total]}>
          <Top
            showEye={showEye}
            onTouchStart={handleShowEye}
            totalAssets={totalAssets || 0}
          />
          <WelcomeHD
            showEye={showEye}
            walletFund={parseFloat(dataAssets?.fundWallet) || 0}
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
        {!currentUser ? (
          <View style={[styles.welcome_container]}>
            <Text style={[styles.welcome_title]}>Các gói nổi bật</Text>
            <View style={[styles.future_pack_list]}>
              <PackFutureItem
                money="200.000.000"
                percent="18%"
                timer="18"
                totalInterest="20.031.098"
                onTouchStart={showToast}
              />
              <PackFutureItem
                money="200.000.000"
                percent="15.6%"
                timer="12"
                totalInterest="15.031.098"
                onTouchStart={showToast}
              />
              <PackFutureItem
                money="200.000.000"
                percent="12.3%"
                timer="6"
                totalInterest="12.031.098"
                onTouchStart={showToast}
              />
              <PackFutureItem
                money="200.000.000"
                percent="5.6%"
                timer="3"
                totalInterest="5.031.098"
                onTouchStart={showToast}
              />
              <PackFutureItem
                money="200.000.000"
                percent="3.7%"
                timer="1"
                totalInterest="3.031.098"
                onTouchStart={showToast}
              />
            </View>
          </View>
        ) : (
          <>
            <SliderHome images={images} />
            <View style={[styles.actions_container, stylesGeneral.mt10]}>
              <Text style={[styles.actions_title]}>Menu</Text>
              <ScrollView
                showsVerticalScrollIndicator={false}
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                <View style={[styles.actions_list]}>
                  <MenuItem
                    nameIcon="piggy-bank"
                    textDesc="Quỹ"
                    onTouchStart={() => {
                      navigation.navigate(routersMain.Fund);
                    }}
                  />
                  <MenuItem
                    nameIcon="layer-group"
                    textDesc="Đầu tư"
                    // onTouchStart={() => {
                    //   navigation.navigate(routersMain.Investment);
                    // }}
                    onTouchStart={showToast}
                  />
                  <MenuItem
                    nameIcon="users"
                    textDesc="Đối tác"
                    // onTouchStart={() => {
                    //   navigation.navigate(routersMain.Partner);
                    // }}
                    onTouchStart={showToast}
                  />
                  <MenuItem
                    nameIcon="phone"
                    textDesc="CSKH"
                    onTouchStart={() => {
                      navigation.navigate(routersMain.CustomerCare);
                    }}
                    resetMargin={true}
                  />
                </View>
              </ScrollView>
            </View>
            {DataFundUSD.map((item, index) => {
              return (
                <View
                  style={[styles.product_container]}
                  key={`${item.id}_${index}`}>
                  <Text style={[styles.product_title]}>
                    Quỹ đầu tư USD (Vốn {item.capital})
                  </Text>
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}>
                    <View style={[styles.product_list]}>
                      {item.timer.list.map((time, indexTime) => {
                        return (
                          <ProductItem
                            index={`${item.id}_${time.id}_${indexTime}`}
                            key={`${item.id}_${time.id}_${indexTime}`}
                            uri={
                              item?.timer?.urlImage
                                ? item?.timer?.urlImage
                                : require('../../assets/images/background01.png')
                            }
                            titleHeader={item.timer.desc}
                            timer={`${time.period} tháng`}
                            timer_desc={`Vốn ${item.capital} VNĐ`}
                            interest_rate={time.interestRate}
                            onTouchStart={() => {
                              navigation.navigate({
                                name: routersMain.SendFunds,
                                params: {
                                  interestRate: time.interestRate,
                                  period: time.period,
                                  type: time.type,
                                  capital: item.capital,
                                },
                              });
                            }}
                          />
                        );
                      })}
                    </View>
                  </ScrollView>
                </View>
              );
            })}
            {DataFundAgritural.map((item, index) => {
              return (
                <View
                  style={[styles.product_container]}
                  key={`${item.id}_${index}`}>
                  <Text style={[styles.product_title]}>
                    Quỹ đầu tư Nông nghiệp (Hạn mức {item.capital} triệu)
                  </Text>
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}>
                    <View style={[styles.product_list]}>
                      {item.timer.list.map((time, indexTime) => {
                        return (
                          <ProductItem
                            index={`${item.id}_${time.id}_${indexTime}`}
                            key={`${item.id}_${time.id}_${indexTime}`}
                            uri={
                              item?.timer?.urlImage
                                ? item?.timer?.urlImage
                                : require('../../assets/images/background01.png')
                            }
                            titleHeader={item.timer.desc}
                            timer={`${time.period} mùa`}
                            timer_desc={`Hạn mức ${item.capital} triệu VNĐ`}
                            interest_rate={time.interestRate}
                            onTouchStart={() => {
                              navigation.navigate({
                                name: routersMain.SendFunds,
                                params: {
                                  interestRate: time.interestRate,
                                  period: time.period,
                                  type: time.type,
                                  capital: item.capital,
                                },
                              });
                            }}
                            agicutural
                          />
                        );
                      })}
                    </View>
                  </ScrollView>
                </View>
              );
            })}
          </>
        )}
        <Footer marginTop={0} marginBottom={20} />
      </ScrollView>
    </>
  );
};

export default Home;
