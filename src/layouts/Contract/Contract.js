/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import {View, RefreshControl} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import styles from './ContractCss';
import {ScrollView, useToast} from 'native-base';
import {ButtonSubmitCp, InputItem, ModalAuthenPhone} from '../../components';
import {useAppContext} from '../../utils';
import {setContractsPL} from '../../app/payloads/contracts';
import stylesStatus from '../../styles/Status';
import {toastShow} from '../../utils/toast';

const Contract = () => {
  const toast = useToast();
  const {state, dispatch} = useAppContext();
  const {
    contract: {cycle, principal, rate, otpCode},
  } = state;
  const [refreshing, setRefreshing] = useState(false);
  const [isProcess, setIsProcess] = useState(false);
  const [isProcessOTP, setIsProcessOTP] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  useEffect(() => {
    dispatch(
      setContractsPL({
        cycle: '',
        principal: '',
        rate: '',
        otpCode: '',
      }),
    );
  }, []);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const handleChange = (name, value) => {
    dispatch(
      setContractsPL({
        [name]: value,
      }),
    );
  };
  const handleSubmit = async () => {
    await 1;
    if (!cycle || !principal || !rate) {
      toastShow(toast, 'Vui lòng nhập đầy đủ thông tin');
    } else {
      setIsProcess(true);
      setTimeout(() => {
        setIsProcess(false);
        setShowModal(true);
        console.log(cycle, principal, rate);
      }, 1000);
    }
  };
  const handleSendOTP = async () => {
    await 1;
    if (!otpCode) {
      toastShow(toast, 'Vui lòng nhập mã OTP');
    } else {
      setIsProcessOTP(true);
      setTimeout(() => {
        setIsProcessOTP(false);
        setShowModal(false);
        console.log(otpCode);
        toastShow(toast, 'Thêm hợp đồng thành công');
        dispatch(
          setContractsPL({
            cycle: '',
            principal: '',
            rate: '',
            otpCode: '',
          }),
        );
      }, 1000);
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
          label="Rate"
          placeholder="Nhập rate"
          nameInput="rate"
          value={rate}
          handleChange={handleChange}
        />
        <InputItem
          label="Cycle"
          placeholder="Nhập cycle"
          nameInput="cycle"
          value={cycle}
          handleChange={handleChange}
          marginTop={10}
        />
        <InputItem
          label="Principal"
          placeholder="Nhập principal"
          nameInput="principal"
          value={principal}
          handleChange={handleChange}
          marginTop={10}
        />
      </View>
      <ButtonSubmitCp
        isProcess={isProcess}
        handleSubmit={handleSubmit}
        bgcButton={stylesStatus.confirmbgcbold}
        buttonText="Tiếp tục"
      />
      <ModalAuthenPhone
        stateModal={showModal}
        setModal={setShowModal}
        onPress={handleSendOTP}
        valueInput={otpCode}
        isProcessOTP={isProcessOTP}
        handleChange={handleChange}
      />
    </ScrollView>
  );
};

export default Contract;
