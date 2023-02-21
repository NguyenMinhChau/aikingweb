/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/react-in-jsx-scope */
import {useEffect, useRef, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useAppContext} from '../../utils';
import {setFormValuePL} from '../../app/payloads/form';
import {Form} from '../../components';
import {routersMain} from '../../routers/Main';
import styles from './LoginCss';
import stylesGeneral from '../../styles/General';
import {setCurrentUserPL} from '../../app/payloads/user';
import {toastShow} from '../../utils/toast';
import {useToast} from 'native-base';
import {authLoginSV} from '../../services/authen';

const Login = ({navigation}) => {
  const toast = useToast();
  const {state, dispatch} = useAppContext();
  const {
    currentUser,
    form: {email, password, phone},
  } = state;
  const [isProcess, setIsProcess] = useState(false);
  const refEmail = useRef();
  const refPhone = useRef();
  const refPwd = useRef();
  useEffect(() => {
    if (currentUser) {
      navigation.navigate(routersMain.MainPage);
    }
  }, [currentUser]);
  const handleLogin = async () => {
    await 1;
    if (!email || !password) {
      toastShow(toast, 'Vui lòng nhập đầy đủ thông tin');
    } else {
      setIsProcess(true);
      authLoginSV({
        email,
        password,
        toast,
        setIsProcess,
        navigation,
        dispatch,
      });
      dispatch(
        setFormValuePL({
          email: '',
          password: '',
        }),
      );
    }
  };
  return (
    <Form
      navigation={navigation}
      titleForm="Đăng nhập"
      textBtn="Đăng nhập"
      // bolPhone
      bolEmail
      bolPwd
      refPhone={refPhone}
      refEmail={refEmail}
      refPwd={refPwd}
      isProcess={isProcess}
      onPress={handleLogin}>
      <View style={[styles.desc, stylesGeneral.flexRow]}>
        <Text style={[styles.desc_text]}>Bạn chưa có tài khoản?</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate(routersMain.Register)}>
          <Text style={[stylesGeneral.ml4, styles.register]}>Đăng ký</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.desc, stylesGeneral.flexRow, stylesGeneral.mt10]}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate(routersMain.ForgotPassword)}>
          <Text style={[stylesGeneral.ml4, styles.register]}>
            Quên mật khẩu?
          </Text>
        </TouchableOpacity>
      </View>
    </Form>
  );
};

export default Login;
