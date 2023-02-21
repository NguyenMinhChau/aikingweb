/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import {View, Text, TouchableOpacity} from 'react-native';
import {setFormValuePL} from '../../app/payloads/form';
import {useAppContext} from '../../utils/';
import {Form} from '../../components';
import {routersMain} from '../../routers/Main';
import styles from './RegisterCss';
import stylesGeneral from '../../styles/General';
import {useState} from 'react';
import {useToast} from 'native-base';
import {toastShow} from '../../utils/toast';
import {authRegisterSV} from '../../services/authen';

const Register = ({navigation}) => {
  const toast = useToast();
  const {state, dispatch} = useAppContext();
  const {
    form: {username, email, password, phone},
  } = state;
  const [isProcess, setIsProcess] = useState(false);
  const handleRegister = async () => {
    await 1;
    if (!username || !email || !password) {
      toastShow(toast, 'Vui lòng nhập đầy đủ thông tin');
    } else {
      setIsProcess(true);
      authRegisterSV({
        email,
        password,
        username,
        toast,
        setIsProcess,
        navigation,
      });
      dispatch(
        setFormValuePL({
          email: '',
          username: '',
          password: '',
        }),
      );
      navigation.navigate(routersMain.Login);
    }
  };
  return (
    <Form
      navigation={navigation}
      titleForm="Đăng ký"
      textBtn="Đăng ký"
      bolUsername
      // bolPhone
      bolEmail
      bolPwd
      isProcess={isProcess}
      onPress={handleRegister}>
      <View style={[styles.desc, stylesGeneral.flexRow]}>
        <Text style={[styles.desc_text]}>Bạn đã có một tài khoản?</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate(routersMain.Login)}>
          <Text style={[stylesGeneral.ml4, styles.register]}>Đăng nhập</Text>
        </TouchableOpacity>
      </View>
    </Form>
  );
};

export default Register;
