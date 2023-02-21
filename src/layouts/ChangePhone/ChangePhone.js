/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import {View, RefreshControl} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import styles from './ChangePhoneCss';
import stylesStatus from '../../styles/Status';
import {
  ButtonSubmitCp,
  Footer,
  InputItem,
  ModalAuthenPhone,
} from '../../components';
import {useAppContext} from '../../utils';
import {setFormValuePL} from '../../app/payloads/form';
import {ScrollView, useToast} from 'native-base';
import {toastShow} from '../../utils/toast';
import {routers} from '../../routers/Routers';

const ChangePhone = ({navigation}) => {
  const toast = useToast();
  const {state, dispatch} = useAppContext();
  const [refreshing, setRefreshing] = useState(false);
  const {
    form: {otpCode, email},
  } = state;
  const [showModal, setShowModal] = useState(false);
  const [isProcess, setIsProcess] = useState(false);
  const [isProcessOTP, setIsProcessOTP] = useState(false);
  useEffect(() => {
    dispatch(
      setFormValuePL({
        email: '',
      }),
    );
  }, []);
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
  const handleSubmit = async () => {
    try {
      await 1;
      if (!email) {
        toastShow(toast, 'Vui lòng nhập email');
      } else if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
        toastShow(toast, 'Email không hợp lệ');
      } else {
        setIsProcess(true);
        setTimeout(() => {
          setIsProcess(false);
          setShowModal(true);
          console.log(email);
          toastShow(toast, `Vui lòng kiểm tra mã OTP đã gửi về: ${email}`);
          dispatch(
            setFormValuePL({
              email: '',
              username: '',
              password: '',
              phone: '',
              oldPwd: '',
              confirmPwd: '',
              otpCode: '',
            }),
          );
        }, 3000);
      }
    } catch (err) {
      console.log(err);
    }
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
              otpCode: '',
              email: '',
            }),
          );
          // toastShow(toast, 'Thay đổi email thành công');
          toastShow(toast, 'Chức năng đang được phát triển!');
          navigation.navigate(routers.Profile);
        }, 3000);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={[styles.container]}>
      <View style={[styles.fragment_input_container]}>
        <InputItem
          label="Email mới"
          placeholder="Nhập email mới"
          nameInput="email"
          value={email}
          handleChange={handleChange}
        />
      </View>
      <ButtonSubmitCp
        isProcess={isProcess}
        handleSubmit={handleSubmit}
        bgcButton={stylesStatus.confirmbgcbold}
        buttonText="Thay đổi"
        marginTop={15}
      />
      {/* MODAL */}
      <ModalAuthenPhone
        stateModal={showModal}
        setModal={setShowModal}
        onPress={handleSendOTP}
        valueInput={otpCode}
        isProcessOTP={isProcessOTP}
        handleChange={handleChange}
      />
      <Footer marginTop={20} marginBottom={20} />
    </ScrollView>
  );
};

export default ChangePhone;
