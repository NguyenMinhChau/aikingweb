/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import {
  Image,
  ImageBackground,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
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
import {Toast} from 'native-base';
import {TOAST_COLOR_SUCCESS, WHITE_COLOR} from '../../styles/colors';
import {formatUSDT} from '../../utils/format/Money';
import Top from '../../HeaderStyles/Top';
import WelcomeHD from '../../HeaderStyles/WelcomeHD';
import LoginRegisterHD from '../../HeaderStyles/LoginRegisterHD';

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
  const {state} = useAppContext();
  const {currentUser} = state;
  const [isShowAssets, setIsShowAssets] = React.useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showEye, setShowEye] = useState(false);
  const handleShowEye = () => {
    setShowEye(!showEye);
  };
  // console.log('currentUser', currentUser);
  const handleShowAssest = () => {
    setIsShowAssets(!isShowAssets);
  };
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const showToast = () => {
    Toast.show({
      render: () => {
        return (
          <ToastCp
            colorIcon={TOAST_COLOR_SUCCESS}
            bgc={WHITE_COLOR}
            title="Thông báo"
            desc="Màn hình đang được phát triển, quý khách vui lòng quay lại sau. Xin cám ơn!"
          />
        );
      },
      placement: 'top',
    });
  };
  return (
    <>
      <ImageBackground
        borderBottomLeftRadius={30}
        borderBottomRightRadius={30}
        style={[styles.container_bgc]}
        source={require('../../assets/images/bg-login.png')}
        resizeMode="cover">
        <View style={[styles.container_total]}>
          <Top showEye={showEye} onTouchStart={handleShowEye} />
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
            {/* <View style={[styles.total_assets]}>
              <View style={[styles.total_assets_header]}>
                <View style={[styles.total_assets_header_image_container]}>
                  <Image
                    source={require('../../assets/images/ProvidentFundLogo.png')}
                    style={[styles.total_assets_header_image]}
                    resizeMode="contain"
                  />
                </View>
                <View style={[styles.total_assets_header_text_container]}>
                  <Text style={[styles.total_assets_header_text]}>Chào bạn,</Text>
                </View>
              </View>
              <View style={[stylesGeneral.flexSpaceBetween]}>
                <View>
                  <View style={[styles.total_assets_body]}>
                    <Text style={[styles.total_assets_body_text]}>
                      Tổng tài sản:{' '}
                    </Text>
                    <View style={[styles.icon]} onTouchStart={handleShowAssest}>
                      <FontAwesome5
                        name={isShowAssets ? 'eye' : 'eye-slash'}
                        color={'#000'}
                        size={20}
                      />
                    </View>
                  </View>
                  <View style={[styles.total_assets_footer]}>
                    <Text style={[styles.total_assets_footer_text]}>
                      {isShowAssets
                        ? formatUSDT(currentUser?.balance)
                        : '********USD'}
                    </Text>
                  </View>
                </View>
                <View>
                  <Image
                    source={require('../../assets/images/ProvidentFundLogo.png')}
                    style={[styles.total_assets_footer_image]}
                    resizeMode="contain"
                  />
                </View>
              </View>
            </View> */}
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
            <View style={[styles.product_container]}>
              <Text style={[styles.product_title]}>Sản phẩm</Text>
              <ScrollView
                showsVerticalScrollIndicator={false}
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                <View style={[styles.product_list]}>
                  <ProductItem
                    uri={require('../../assets/images/mockup.png')}
                    titleHeader="Lợi nhuận tốt nhất"
                    timer="18 tháng"
                    timer_desc="Hạn mức 10 tỷ đồng"
                    interest_rate="8.5"
                    onTouchStart={() => {}}
                  />
                  <ProductItem
                    uri={require('../../assets/images/mockup.png')}
                    titleHeader="Khuyên dùng"
                    timer="12 tháng"
                    timer_desc="Hạn mức 8.5 tỷ đồng"
                    interest_rate="7.0"
                    onTouchStart={() => {}}
                  />
                  <ProductItem
                    uri={require('../../assets/images/mockup.png')}
                    titleHeader="Lợi nhuận tốt nhất"
                    timer="6 tháng"
                    timer_desc="Hạn mức 7.6 tỷ đồng"
                    interest_rate="6.3"
                    onTouchStart={() => {}}
                  />
                  <ProductItem
                    uri={require('../../assets/images/mockup.png')}
                    titleHeader="Lợi nhuận tốt nhất"
                    timer="3 tháng"
                    timer_desc="Hạn mức 5.4 tỷ đồng"
                    interest_rate="5.4"
                    onTouchStart={() => {}}
                  />
                  <ProductItem
                    uri={require('../../assets/images/mockup.png')}
                    titleHeader="Lợi nhuận tốt nhất"
                    timer="1 tháng"
                    timer_desc="Hạn mức 4.2 tỷ đồng"
                    interest_rate="4.2"
                    resetMargin={true}
                    onTouchStart={() => {}}
                  />
                </View>
              </ScrollView>
            </View>
          </>
        )}
        <Footer marginTop={0} marginBottom={20} />
      </ScrollView>
    </>
  );
};

export default Home;
