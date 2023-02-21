/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import {View, RefreshControl} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import styles from './ReceivingAccountCss';
import {ScrollView, useToast} from 'native-base';
import stylesStatus from '../../styles/Status';
import {dataBank} from '../../utils/dataBank/';
import {useAppContext} from '../../utils';
import {setReceivingAccountPL} from '../../app/payloads/receivingAccount';
import {
  ButtonSubmitCp,
  CreditCard,
  Footer,
  InputItem,
  SelectValueCp,
} from '../../components';
import {toastShow} from '../../utils/toast';
import {adminGetUserByIdSV} from '../../services/admin';
import {userAddPaymentSV} from '../../services/user';
import requestRefreshToken from '../../utils/axios/refreshToken';
import {setCurrentUserPL} from '../../app/payloads/user';

const ReceivingAccount = ({navigation}) => {
  const toast = useToast();
  const {state, dispatch} = useAppContext();
  const {
    currentUser,
    userById,
    receivingAccount: {bankName, accountNumber, accountName},
  } = state;
  const [refreshing, setRefreshing] = useState(false);
  const [isProcess, setIsProcess] = useState(false);
  useEffect(() => {
    dispatch(
      setReceivingAccountPL({
        accountName: '',
        accountNumber: '',
        bankName: '',
      }),
    );
    adminGetUserByIdSV({
      id_user: currentUser?.id,
      dispatch,
      toast,
    });
  }, []);
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    adminGetUserByIdSV({
      id_user: currentUser?.id,
      dispatch,
      toast,
    });
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const handleChange = (name, value) => {
    dispatch(setReceivingAccountPL({[name]: value}));
  };
  const handleSendReceivingAccount = dataToken => {
    userAddPaymentSV({
      id_user: currentUser?.id,
      account: accountNumber,
      bankName: bankName,
      name: accountName,
      toast,
      setIsProcess,
      navigation,
      token: dataToken?.token,
    });
  };
  const handleSubmit = async () => {
    await 1;
    if (!accountName || !accountNumber || !bankName) {
      toastShow(toast, 'Vui lòng nhập đầy đủ thông tin');
    } else {
      setIsProcess(true);
      requestRefreshToken(
        currentUser,
        handleSendReceivingAccount,
        state,
        dispatch,
        setCurrentUserPL,
        toast,
      );
      dispatch(
        setReceivingAccountPL({
          accountName: '',
          accountNumber: '',
          bankName: '',
        }),
      );
    }
  };
  const checkBank =
    userById?.payment?.bank?.account &&
    userById?.payment?.bank?.name &&
    userById?.payment?.bank?.bankName;
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={[styles.container]}>
      {checkBank ? (
        <CreditCard
          bankName={userById?.payment?.bank?.bankName || '___'}
          cardNumber={userById?.payment?.bank?.account || '___'}
          accountName={userById?.payment?.bank?.name || '___'}
        />
      ) : (
        <>
          <View style={[styles.fragment_input_container]}>
            <InputItem
              label="Tên tài khoản"
              placeholder="Nhập tên tài khoản"
              nameInput="accountName"
              value={accountName}
              handleChange={handleChange}
            />
            <InputItem
              label="Số tài khoản"
              placeholder="Nhập số tài khoản"
              nameInput="accountNumber"
              value={accountNumber}
              handleChange={handleChange}
              marginTop={10}
            />
            <SelectValueCp
              label="Ngân hàng"
              placeholder="Chọn ngân hàng"
              valueSelect={bankName}
              data={dataBank}
              handleChange={handleChange}
              nameSelect="bankName"
              marginTop={10}
            />
          </View>
          <ButtonSubmitCp
            isProcess={isProcess}
            handleSubmit={handleSubmit}
            bgcButton={stylesStatus.confirmbgcbold}
            buttonText="Tiếp tục"
            marginTop={15}
          />
        </>
      )}
      <Footer marginTop={20} marginBottom={20} />
    </ScrollView>
  );
};

export default ReceivingAccount;
