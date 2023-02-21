/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useAppContext} from '../../utils';
import {Form, ModalLoading} from '../../components';
import {routersMain} from '../../routers/Main';
import styles from './ResetPwdCss';
import stylesGeneral from '../../styles/General';
import stylesStatus from '../../styles/Status';
import {toastShow} from '../../utils/toast';
import {useToast} from 'native-base';
import {setFormValuePL} from '../../app/payloads/form';
import {userOTPForgotPwdSV} from '../../services/user';

const ResetPwd = ({navigation}) => {
  const toast = useToast();
  const {state, dispatch} = useAppContext();
  const {
    tokenForgot,
    form: {password, otpCode},
  } = state;
  const [loading, setLoading] = useState(false);
  const [isProcess, setIsProcess] = useState(false);
  const handleSubmit = async () => {
    await 1;
    if (!otpCode) {
      toastShow(toast, 'Vui lòng nhập mã xác thực');
    } else {
      setIsProcess(true);
      setTimeout(() => {
        userOTPForgotPwdSV({
          code: otpCode,
          toast,
          setIsProcess,
          navigation,
        });
        dispatch(
          setFormValuePL({
            password: '',
            otpCode: '',
          }),
        );
      }, 3000);
    }
  };
  return (
    <>
      <Form
        navigation={navigation}
        titleForm="Xác thực"
        textBtn="Gửi"
        bolOTP
        // bolPwd
        isProcess={isProcess}
        onPress={handleSubmit}>
        <View style={[styles.desc, stylesGeneral.flexRow]}>
          <Text style={[styles.desc_text]}>Bạn đã có một tài khoản?</Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate(routersMain.Login)}>
            <Text
              style={[
                stylesGeneral.ml4,
                styles.register,
                stylesStatus.primary,
              ]}>
              Đăng nhập
            </Text>
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

export default ResetPwd;
