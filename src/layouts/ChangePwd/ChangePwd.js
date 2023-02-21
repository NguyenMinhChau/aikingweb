/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import {View, RefreshControl} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import styles from './ChangePwdCss';
import stylesStatus from '../../styles/Status';
import {useAppContext} from '../../utils';
import {setFormValuePL} from '../../app/payloads/form';
import {ScrollView, useToast} from 'native-base';
import {toastShow} from '../../utils/toast';
import {ButtonSubmitCp, Footer, InputItem} from '../../components';
import {userChangePasswordSV} from '../../services/user';
import requestRefreshToken from '../../utils/axios/refreshToken';
import {setCurrentUserPL} from '../../app/payloads/user';

const ChangePwd = ({navigation}) => {
  const toast = useToast();
  const {state, dispatch} = useAppContext();
  const {
    currentUser,
    form: {oldPwd, newPwd, confirmPwd},
  } = state;
  const [refreshing, setRefreshing] = useState(false);
  const [pwdCr, setPwdCr] = useState(false);
  const [pwdNew, setPwdNew] = useState(false);
  const [pwdNewConfirm, setPwdNewConfirm] = useState(false);
  const [isProcess, setIsProcess] = useState(false);
  useEffect(() => {
    dispatch(
      setFormValuePL({
        oldPwd: '',
        newPwd: '',
        confirmPwd: '',
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
  const handlePwdCr = () => {
    setPwdCr(!pwdCr);
  };
  const handlePwdNew = () => {
    setPwdNew(!pwdNew);
  };
  const handlePwdNewConfirm = () => {
    setPwdNewConfirm(!pwdNewConfirm);
  };
  const handleChange = (name, value) => {
    dispatch(
      setFormValuePL({
        ...state.form,
        [name]: value,
      }),
    );
  };
  const handleSendPwd = dataToken => {
    userChangePasswordSV({
      id_user: currentUser?.id,
      token: dataToken?.token,
      oldPassword: oldPwd,
      newPassword: newPwd,
      toast,
      setIsProcess,
      navigation,
    });
  };
  const handleSubmit = async () => {
    try {
      await 1;
      if (!oldPwd || !newPwd || !confirmPwd) {
        toastShow(toast, 'Vui lòng nhập đầy đủ thông tin');
        return;
      } else if (newPwd !== confirmPwd) {
        toastShow(toast, 'Mật khẩu xác thực không khớp');
        return;
      } else {
        setIsProcess(true);
        requestRefreshToken(
          currentUser,
          handleSendPwd,
          state,
          dispatch,
          setCurrentUserPL,
          toast,
        );
        dispatch(
          setFormValuePL({
            oldPwd: '',
            newPwd: '',
            confirmPwd: '',
          }),
        );
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
          label="Mật khẩu hiện tại"
          placeholder="Nhập mật khẩu hiện tại"
          nameInput="oldPwd"
          value={oldPwd}
          handleChange={handleChange}
          isPassword
          isShowPwd={pwdCr}
          handleShowPwd={handlePwdCr}
        />
        <InputItem
          label="Mật khẩu mới"
          placeholder="Nhập mật khẩu mới"
          nameInput="newPwd"
          value={newPwd}
          handleChange={handleChange}
          isPassword
          isShowPwd={pwdNew}
          handleShowPwd={handlePwdNew}
          marginTop={10}
        />
        <InputItem
          label="Xác nhận mật khẩu"
          placeholder="Xác nhận mật khẩu"
          nameInput="confirmPwd"
          value={confirmPwd}
          handleChange={handleChange}
          isPassword
          isShowPwd={pwdNewConfirm}
          handleShowPwd={handlePwdNewConfirm}
          marginTop={10}
        />
      </View>
      <ButtonSubmitCp
        isProcess={isProcess}
        handleSubmit={handleSubmit}
        bgcButton={stylesStatus.confirmbgcbold}
        buttonText="Thay đổi"
        marginTop={15}
      />
      <Footer marginTop={20} marginBottom={20} />
    </ScrollView>
  );
};

export default ChangePwd;
