/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useAppContext} from '../../utils';
import {setMessagePL} from '../../app/payloads/message';
import {setFormValuePL} from '../../app/payloads/form';
import {Form, ModalLoading} from '../../components';
import {routersMain} from '../../routers/Main';
import styles from './ForgotPwdCss';
import stylesGeneral from '../../styles/General';
import {useToast} from 'native-base';
import {toastShow} from '../../utils/toast';
import {userForgotPwdSV} from '../../services/user';

const ForgotPwd = ({navigation}) => {
  const toast = useToast();
  const {state, dispatch} = useAppContext();
  const {
    currentUser,
    form: {email, phone},
  } = state;
  const [loading, setLoading] = useState(false);
  const [isProcess, setIsProcess] = useState(false);
  const handleSubmit = async () => {
    await 1;
    if (!email) {
      toastShow(toast, 'Vui lòng nhập email');
    } else {
      setIsProcess(true);
      userForgotPwdSV({
        email_user: email,
        toast,
        navigation,
        setIsProcess,
      });
      dispatch(
        setFormValuePL({
          email: '',
        }),
      );
    }
  };
  return (
    <>
      <Form
        navigation={navigation}
        titleForm="Quên mật khẩu"
        textBtn="Tiếp tục"
        // bolPhone
        bolEmail
        isProcess={isProcess}
        onPress={handleSubmit}>
        <View style={[styles.desc, stylesGeneral.flexRow]}>
          <Text style={[styles.desc_text]}>Bạn đã có một tài khoản?</Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate(routersMain.Login)}>
            <Text style={[stylesGeneral.ml4, styles.register]}>Đăng nhập</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.desc, stylesGeneral.flexRow, stylesGeneral.mt10]}>
          <Text style={[styles.desc_text]}>Bạn chưa có tài khoản?</Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate(routersMain.Register)}>
            <Text style={[stylesGeneral.ml4, styles.register]}>Đăng ký</Text>
          </TouchableOpacity>
        </View>
      </Form>
      {loading && <ModalLoading />}
    </>
  );
};

export default ForgotPwd;
