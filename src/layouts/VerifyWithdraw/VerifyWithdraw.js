/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {
  ActivityIndicator,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import Clipboard from '@react-native-community/clipboard';
import styles from './VerifyWithdrawCss';
import {ScrollView, useToast} from 'native-base';
import {Footer, InputItem, RowDetail} from '../../components';
import {BLACK_COLOR, PRIMARY_COLOR} from '../../styles/colors';
import {dateFormat} from '../../utils/format/Date';
import {formatVND} from '../../utils/format/Money';
import {useAppContext} from '../../utils';
import {setWithdrawsPL} from '../../app/payloads/withdraw';
import stylesStatus from '../../styles/Status';
import stylesGeneral from '../../styles/General';
import {toastShow} from '../../utils/toast';
import {routersMain} from '../../routers/Main';
import {
  userCancelWithdrawSV,
  userResendOtpWithdrawSV,
  userVerifyWithdrawSV,
} from '../../services/user';
import requestRefreshToken from '../../utils/axios/refreshToken';
import {setCurrentUserPL} from '../../app/payloads/user';

const VerifyWithdraw = ({navigation, route}) => {
  const toast = useToast();
  const {data} = route.params;
  const {state, dispatch} = useAppContext();
  const {
    currentUser,
    withdraw: {otpCode},
  } = state;
  const [refreshing, setRefreshing] = useState(false);
  const [isProcess, setIsProcess] = useState(false);
  const [isProcessCancel, setIsProcessCancel] = useState(false);
  const [isProcessResendOTP, setIsProcessResendOTP] = useState(false);
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setIsProcess(false);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const handleChange = (name, value) => {
    dispatch(
      setWithdrawsPL({
        [name]: value,
      }),
    );
  };
  const handleSendOTP = dataToken => {
    userVerifyWithdrawSV({
      id_user: currentUser?.id,
      dispatch,
      code: otpCode,
      token: dataToken?.token,
      toast,
      setIsProcess,
      navigation,
    });
  };
  const handleSubmit = async () => {
    await 1;
    if (!otpCode) {
      toastShow(toast, 'Vui lòng nhập mã OTP');
    } else {
      setIsProcess(true);
      requestRefreshToken(
        currentUser,
        handleSendOTP,
        state,
        dispatch,
        setCurrentUserPL,
        toast,
      );
      dispatch(
        setWithdrawsPL({
          amount: '',
          otpCode: '',
        }),
      );
    }
  };
  const handleCancelSV = (dataToken, id) => {
    userCancelWithdrawSV({
      id_user: currentUser?.id,
      dispatch,
      id_withdraw: id,
      token: dataToken?.token,
      toast,
      setIsProcessCancel,
      navigation,
    });
  };
  const handleCancel = async id => {
    await 1;
    setIsProcessCancel(true);
    requestRefreshToken(
      currentUser,
      handleCancelSV,
      state,
      dispatch,
      setCurrentUserPL,
      toast,
      id,
    );
    dispatch(
      setWithdrawsPL({
        amount: '',
        otpCode: '',
      }),
    );
  };
  const handleResendOtpSV = (dataToken, id) => {
    userResendOtpWithdrawSV({
      id_user: currentUser.id,
      id_withdraw: id,
      dispatch,
      token: dataToken?.token,
      toast,
      setIsProcessResendOTP,
    });
  };
  const handleResendOTP = async id => {
    await 1;
    setIsProcessResendOTP(true);
    requestRefreshToken(
      currentUser,
      handleResendOtpSV,
      state,
      dispatch,
      setCurrentUserPL,
      toast,
      id,
    );
  };
  const copyToClipboard = value => {
    Clipboard.setString(value);
    toastShow(toast, 'Sao chép thành công.');
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={[styles.container]}>
      <View style={[styles.fragment_input_container]}>
        <RowDetail
          title="Trạng thái"
          text={data?.data?.status}
          marginLeft={0}
          marginRight={8}
          colorIconFront={PRIMARY_COLOR}
          styleDesc={{flex: 1, textAlign: 'right', color: PRIMARY_COLOR}}
        />
        <RowDetail
          title="Ngày tạo"
          text={dateFormat(data?.data?.createdAt, 'DD/MM/YYYY HH:mm:ss')}
          marginLeft={0}
          marginRight={8}
          colorIconFront={PRIMARY_COLOR}
          styleDesc={{flex: 1, textAlign: 'right', color: BLACK_COLOR}}
          marginTop={10}
        />
        <RowDetail
          title="Số tiền rút"
          text={formatVND(data?.data?.amount)}
          marginLeft={0}
          marginRight={8}
          colorIconFront={PRIMARY_COLOR}
          styleDesc={{flex: 1, textAlign: 'right', color: BLACK_COLOR}}
          marginTop={10}
        />
        <RowDetail
          title="Ngân hàng thụ hưởng"
          marginLeft={0}
          marginRight={8}
          colorIconFront={PRIMARY_COLOR}
          styleDesc={{flex: 1, textAlign: 'right', color: BLACK_COLOR}}
          marginTop={10}
          bankMethod
          nameBank={data?.bankName}
          accountNumber={data?.accountNumber}
          accountName={data?.accountName}
          maxWidth={100}
          copy
          funcCopy={copyToClipboard}
        />
        <InputItem
          label="OTP"
          placeholder="Nhập OTP"
          nameInput="otpCode"
          value={otpCode}
          handleChange={handleChange}
          marginTop={12}
        />
        <Text
          style={[styles.text_resend, stylesStatus.cancel]}
          onPress={
            isProcessResendOTP
              ? () => {}
              : () => handleResendOTP(data?.data?.id)
          }>
          {isProcessResendOTP ? 'Đang gửi mã...' : 'Gửi lại mã'}
        </Text>
      </View>
      <View style={[styles.btn_actions_container]}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => handleCancel(data?.data?.id)}
          disabled={isProcessCancel}
          style={[
            styles.btn_submit,
            stylesStatus.status,
            stylesStatus.cancelbgcbold,
            isProcessCancel && stylesGeneral.op6,
            stylesGeneral.mr10,
          ]}>
          <Text style={[styles.btn_text, stylesStatus.white]}>
            {isProcessCancel ? <ActivityIndicator color="white" /> : 'Hủy bỏ'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleSubmit}
          disabled={isProcess}
          style={[
            styles.btn_submit,
            stylesStatus.status,
            stylesStatus.confirmbgcbold,
            isProcess && stylesGeneral.op6,
            stylesGeneral.ml10,
          ]}>
          <Text style={[styles.btn_text, stylesStatus.white]}>
            {isProcess ? <ActivityIndicator color="white" /> : 'Xác nhận'}
          </Text>
        </TouchableOpacity>
      </View>
      <Footer marginTop={20} marginBottom={20} />
    </ScrollView>
  );
};

export default VerifyWithdraw;
