/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import {View, Text, RefreshControl} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import styles from './DepositsCss';
import {ScrollView, useToast} from 'native-base';
import {
  ButtonSubmitCp,
  Footer,
  InputItem,
  LoginRegisterAction,
  SelectValueCp,
} from '../../components';
import {useAppContext} from '../../utils';
import {setDepositsPL} from '../../app/payloads/deposits';
import {dataBankAdmin} from '../../utils/dataBankAdmin';
import stylesStatus from '../../styles/Status';
import {formatVND} from '../../utils/format/Money';
import {toastShow} from '../../utils/toast';
import {routersMain} from '../../routers/Main';
import {
  autoFormatNumberInputChange,
  convertNumberMultiple,
} from '../../utils/format/NumberFormat';
import {userCreateDepositsSV} from '../../services/user';
import requestRefreshToken from '../../utils/axios/refreshToken';
import {setCurrentUserPL} from '../../app/payloads/user';
import stylesGeneral from '../../styles/General';

const Deposits = ({navigation}) => {
  const toast = useToast();
  const {state, dispatch} = useAppContext();
  const {
    currentUser,
    deposits: {amount, bankId},
  } = state;
  const [refreshing, setRefreshing] = useState(false);
  const [isProcess, setIsProcess] = useState(false);
  const [itemBank, setItemBank] = useState(null);
  useEffect(() => {
    dispatch(
      setDepositsPL({
        amount: '',
        bankId: '',
      }),
    );
  }, []);
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(
      setDepositsPL({
        amount: '',
        bankId: '',
      }),
    );
    setIsProcess(false);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const handleChange = (name, value) => {
    dispatch(setDepositsPL({[name]: value}));
  };
  const handleSetItem = item => {
    setItemBank(item);
  };
  const handleSenDeposits = data => {
    userCreateDepositsSV({
      id_user: currentUser?.id,
      email_user: currentUser?.email,
      idPayment: 1,
      amountVND: Number(amount.replace(/\./g, '')),
      token: data?.token,
      toast,
      setIsProcess,
      navigation,
      itemBank,
    });
  };
  const handleSubmit = async () => {
    await 1;
    if (!amount || !bankId) {
      toastShow(toast, 'Vui lòng nhập đầy đủ thông tin');
    } else {
      setIsProcess(true);
      requestRefreshToken(
        currentUser,
        handleSenDeposits,
        state,
        dispatch,
        setCurrentUserPL,
        toast,
      );
    }
  };
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
          <View style={[styles.fragment_input_container]}>
            <SelectValueCp
              label="Ngân hàng thụ hưởng"
              placeholder="Chọn ngân hàng thụ hưởng"
              valueSelect={bankId}
              data={dataBankAdmin}
              handleChange={handleChange}
              nameSelect="bankId"
              marginTop={10}
              handleSetItem={handleSetItem}
            />
            <InputItem
              label="Số tiền nạp"
              placeholder="Nhập số tiền cần nạp"
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
      )}
      <Footer marginTop={20} marginBottom={20} />
    </ScrollView>
  );
};

export default Deposits;
