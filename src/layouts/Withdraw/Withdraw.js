/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import {RefreshControl, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import styles from './WithdrawCss';
import {ScrollView, useToast} from 'native-base';
import {
  ButtonSubmitCp,
  CreditCard,
  Footer,
  InputItem,
  LoginRegisterAction,
} from '../../components';
import {useAppContext} from '../../utils';
import {setWithdrawsPL} from '../../app/payloads/withdraw';
import {formatVND} from '../../utils/format/Money';
import stylesStatus from '../../styles/Status';
import {toastShow} from '../../utils/toast';
import {routersMain} from '../../routers/Main';
import {adminGetUserByIdSV} from '../../services/admin';
import {autoFormatNumberInputChange} from '../../utils/format/NumberFormat';
import {userCreateWithdrawSV} from '../../services/user';
import requestRefreshToken from '../../utils/axios/refreshToken';
import {setCurrentUserPL} from '../../app/payloads/user';
import {getAsyncStore} from '../../utils/localStore/localStore';

const Withdraw = ({navigation}) => {
  const toast = useToast();
  const {state, dispatch} = useAppContext();
  const {
    currentUser,
    userById,
    withdraw: {amount},
  } = state;
  const [refreshing, setRefreshing] = useState(false);
  const [isProcess, setIsProcess] = useState(false);
  useEffect(() => {
    dispatch(
      setWithdrawsPL({
        amount: '',
      }),
    );
  }, []);
  useEffect(() => {
    if (currentUser) {
      adminGetUserByIdSV({
        id_user: currentUser?.id,
        dispatch,
        toast,
      });
    }
  }, [currentUser]);
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(
      setWithdrawsPL({
        amount: '',
      }),
    );
    setIsProcess(false);
    if (currentUser) {
      adminGetUserByIdSV({
        id_user: currentUser?.id,
        dispatch,
        toast,
      });
    }
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const handleChange = (name, value) => {
    dispatch(setWithdrawsPL({[name]: value}));
  };
  const handleSendWithdraw = data => {
    userCreateWithdrawSV({
      id_user: currentUser?.id,
      idPayment: userById?.payment?.bank?.idPayment,
      email_user: currentUser?.email,
      amountVND: Number(amount.replace(/\./g, '')),
      toast,
      navigation,
      token: data?.token,
      setIsProcess,
      userById: userById,
    });
  };
  const handleSubmit = async () => {
    await 1;
    if (!amount) {
      toastShow(toast, 'Vui lòng nhập đầy đủ thông tin');
    } else {
      setIsProcess(true);
      requestRefreshToken(
        currentUser,
        handleSendWithdraw,
        state,
        dispatch,
        setCurrentUserPL,
        toast,
      );
    }
  };
  const checkBank =
    userById?.payment?.bank?.account &&
    userById?.payment?.bank?.name &&
    userById?.payment?.bank?.bankName
      ? true
      : false;
  return (
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
          {checkBank ? (
            <>
              <CreditCard
                bankName={userById?.payment?.bank?.bankName || '___'}
                cardNumber={userById?.payment?.bank?.account || '___'}
                accountName={userById?.payment?.bank?.name || '___'}
              />
              <View style={[styles.fragment_input_container]}>
                <InputItem
                  label="Số tiền"
                  placeholder="Nhập số tiền cần rút"
                  nameInput="amount"
                  value={autoFormatNumberInputChange(amount)}
                  handleChange={handleChange}
                  unit={amount && 'VND'}
                />
              </View>
              <Text
                onPress={() => navigation.navigate(routersMain.History)}
                style={[styles.text_link]}>
                *Xem lịch sử nạp tiền/rút tiền
              </Text>
              <ButtonSubmitCp
                isProcess={isProcess}
                handleSubmit={handleSubmit}
                bgcButton={stylesStatus.confirmbgcbold}
                buttonText="Tiếp tục"
                marginTop={15}
              />
            </>
          ) : (
            <ButtonSubmitCp
              handleSubmit={() =>
                navigation.navigate(routersMain.ReceivingAccount)
              }
              bgcButton={stylesStatus.confirmbgcbold}
              buttonText="Tạo tài khoản ngân hàng"
            />
          )}
        </>
      )}
      <Footer marginTop={20} marginBottom={20} />
    </ScrollView>
  );
};

export default Withdraw;
