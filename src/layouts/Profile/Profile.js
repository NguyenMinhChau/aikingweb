/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {View, Text, RefreshControl, Image} from 'react-native';
import React, {useCallback, useState} from 'react';
import styles from './ProfileCss';
import {ScrollView, useToast} from 'native-base';
import {
  Footer,
  LoginRegisterAction,
  ModalAuthenPhone,
  RowDetail,
  ToastCp,
} from '../../components';
import {useAppContext} from '../../utils';
import {routersMain} from '../../routers/Main';
import {routers} from '../../routers/Routers';
import {
  TOAST_COLOR_SUCCESS,
  PRIMARY_COLOR,
  VIP_COLOR,
  CANCEL_COLOR,
  WHITE_COLOR,
  COMPLETE_COLOR,
} from '../../styles/colors';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {setFormValuePL} from '../../app/payloads/form';
import {toastShow} from '../../utils/toast';
import stylesGeneral from '../../styles/General';
import {formatVND} from '../../utils/format/Money';
import {authLogoutSV} from '../../services/authen';

const Profile = ({navigation}) => {
  const toast = useToast();
  const [refreshing, setRefreshing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showMoney, setShowMoney] = useState(false);
  const [isProcessOTP, setIsProcessOTP] = useState(false);
  const {state, dispatch} = useAppContext();
  const {
    currentUser,
    form: {otpCode},
  } = state;
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const handleChange = (name, value) => {
    dispatch(
      setFormValuePL({
        ...state.form,
        [name]: value,
      }),
    );
  };
  const handleLogout = async () => {
    await 1;
    authLogoutSV({
      id_user: currentUser?.id,
      navigation,
      toast,
      dispatch,
    });
  };
  const handleSendOTP = async () => {
    try {
      await 1;
      if (!otpCode) {
        toastShow(toast, 'Vui lòng nhập mã OTP');
      } else {
        setIsProcessOTP(true);
        setTimeout(() => {
          setIsProcessOTP(false);
          setShowModal(false);
          console.log(otpCode);
          dispatch(
            setFormValuePL({
              email: '',
              otpCode: '',
            }),
          );
          // toastShow(toast, 'Thay đổi email thành công');
          toastShow(toast, 'Chức năng đang đuược phát triển!');
          navigation.navigate(routers.Profile);
        }, 3000);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const showToast = () => {
    toast.show({
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
  const uriImage = require('../../assets/images/ProvidentFundLogo.png');
  return (
    <ScrollView
      style={[styles.container]}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {currentUser && (
        <>
          <View style={[styles.item_container]}>
            <View style={[styles.user_info_container]}>
              <Image
                source={uriImage}
                style={[styles.image_user]}
                resizeMode="cover"
              />
              <View style={[styles.user_desc_container]}>
                <Text style={[styles.user_name]}>{currentUser?.username}</Text>
                <View
                  style={[styles.user_phone_container]}
                  onTouchStart={() => {
                    navigation.navigate(routersMain.ChangePhone);
                  }}>
                  <Text style={[styles.user_phone]}>{currentUser?.email}</Text>
                  <FontAwesome5Icon
                    name="chevron-right"
                    size={15}
                    color={'#000'}
                  />
                </View>
                <View
                  style={[styles.authen_btn, stylesGeneral.mt10]}
                  onTouchStart={() => setShowModal(true)}>
                  <Text style={[styles.authen_text]}>Xác thực ngay</Text>
                </View>
                <ModalAuthenPhone
                  stateModal={showModal}
                  setModal={setShowModal}
                  onPress={handleSendOTP}
                  valueInput={otpCode}
                  isProcessOTP={isProcessOTP}
                  handleChange={handleChange}
                />
              </View>
            </View>
          </View>
          <View style={[styles.item_container]}>
            <RowDetail
              title="Tổng tài sản"
              text={showMoney ? formatVND(currentUser?.balance) : '*****₫'}
              nameIconFront="hand-holding-usd"
              colorIconFront={PRIMARY_COLOR}
              styleDesc={{flex: 1, textAlign: 'right', color: PRIMARY_COLOR}}
              eye
              showEye={showMoney}
              onTouchStartEye={() => setShowMoney(!showMoney)}
              marginLeft={10}
            />
            <RowDetail
              title="Tài khoản nhận tiền"
              nameIcon="chevron-right"
              navigation={navigation}
              redirectName={routersMain.ReceivingAccount}
              // onTouchStart={showToast}
              marginTop={10}
              nameIconFront="money-check"
              colorIconFront={COMPLETE_COLOR}
              marginLeft={10}
            />
            <RowDetail
              title="Giấy phép lái xe/CCCD"
              nameIcon="chevron-right"
              navigation={navigation}
              redirectName={routersMain.UploadDocument}
              // onTouchStart={showToast}
              noneBorderBottom
              marginTop={10}
              nameIconFront="id-badge"
              colorIconFront={VIP_COLOR}
              marginLeft={20}
            />
          </View>
          <View style={[styles.item_container]}>
            <RowDetail
              title="Đổi mật khẩu"
              nameIcon="chevron-right"
              navigation={navigation}
              redirectName={routersMain.ChangePassword}
              nameIconFront="sync-alt"
              colorIconFront={PRIMARY_COLOR}
              marginLeft={10}
            />
            <RowDetail
              title="Tài khoản liên kết"
              nameIcon="chevron-right"
              navigation={navigation}
              redirectName={routersMain.AffiliateAccount}
              onTouchStart={showToast}
              nameIconFront="link"
              colorIconFront={PRIMARY_COLOR}
              marginTop={10}
              noneBorderBottom
              marginLeft={10}
            />
          </View>
        </>
      )}

      <View style={[styles.item_container]}>
        <RowDetail
          title="Điều kiện và điều khoản"
          nameIcon="chevron-right"
          navigation={navigation}
          redirectName={routersMain.TermsAndConditions}
          onTouchStart={showToast}
          nameIconFront="swatchbook"
          colorIconFront={PRIMARY_COLOR}
          marginLeft={10}
        />
        <RowDetail
          title="Mời bạn bè"
          nameIcon="chevron-right"
          navigation={navigation}
          redirectName={routersMain.InviteFriends}
          onTouchStart={showToast}
          nameIconFront="share-alt"
          colorIconFront={VIP_COLOR}
          marginTop={10}
          marginLeft={10}
        />
        <RowDetail
          title="Hoa hồng cho nhà đầu tư"
          nameIcon="chevron-right"
          navigation={navigation}
          redirectName={routersMain.CommissionsForInvestors}
          onTouchStart={showToast}
          nameIconFront="users"
          colorIconFront={CANCEL_COLOR}
          marginTop={10}
          marginLeft={10}
        />
        <RowDetail
          title="Aiking.com trên website"
          nameIcon="chevron-right"
          navigation={navigation}
          redirectName={routersMain.AikingOnWebsite}
          onTouchStart={showToast}
          nameIconFront="blog"
          colorIconFront={PRIMARY_COLOR}
          marginTop={10}
          marginLeft={10}
        />
        <RowDetail
          title="Hướng dẫn sử dụng"
          nameIcon="chevron-right"
          navigation={navigation}
          redirectName={routersMain.UserManual}
          onTouchStart={showToast}
          nameIconFront="info-circle"
          colorIconFront={PRIMARY_COLOR}
          marginTop={10}
          marginLeft={10}
        />
        <RowDetail
          title="CSKH"
          nameIcon="chevron-right"
          navigation={navigation}
          redirectName={routersMain.CustomerCare}
          nameIconFront="phone"
          colorIconFront={PRIMARY_COLOR}
          marginTop={10}
          noneBorderBottom
          marginLeft={10}
        />
      </View>
      {currentUser ? (
        <View style={[styles.btn_actions]} onTouchStart={handleLogout}>
          <Text style={[styles.logout_text]}>Đăng xuất</Text>
        </View>
      ) : (
        <LoginRegisterAction navigation={navigation} marginBottom={20} />
      )}
      <Footer marginTop={0} marginBottom={20} />
    </ScrollView>
  );
};

export default Profile;
