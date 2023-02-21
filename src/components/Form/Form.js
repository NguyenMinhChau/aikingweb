/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {Footer, FormInput} from '../../components';
import {useAppContext} from '../../utils';
import {setFormValuePL} from '../../app/payloads/form';
import styles from './FormCss';
import stylesGeneral from '../../styles/General';
// import SvgUri from 'react-native-svg-uri';
import {routers} from '../../routers/Routers';
import {WHITE_COLOR} from '../../styles/colors';
import {useEffect} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import {SvgUri} from 'react-native-svg';

const Form = ({
  uriBgc = require('../../assets/images/bg-login.png'),
  uriLogo = require('../../assets/Icons/logo.svg'),
  titleForm,
  textBtn,
  bolUsername,
  bolEmail,
  bolPhone,
  bolPwd,
  bolOTP,
  refEmail,
  refPhone,
  refPwd,
  refUsername,
  refOtp,
  children,
  onPress,
  isProcess,
  navigation,
}) => {
  const {state, dispatch} = useAppContext();
  const {
    form: {username, email, password, otpCode, phone},
    message: {error, success},
  } = state;
  useEffect(() => {
    dispatch(
      setFormValuePL({
        username: '',
        email: '',
        password: '',
        otpCode: '',
        phone: '',
      }),
    );
  }, []);
  const handleChange = (name, value) => {
    dispatch(
      setFormValuePL({
        ...state.form,
        [name]: value,
      }),
    );
  };
  return (
    <ImageBackground
      style={[styles.container]}
      resizeMode="cover"
      source={uriBgc}>
      <ScrollView
        style={[styles.scrollview]}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          flexDirection: 'column',
        }}
        showsVerticalScrollIndicator={false}>
        <View style={[styles.content]}>
          <View
            style={[styles.logoContainer]}
            onTouchStart={() => {
              navigation.navigate(routers.Home);
            }}>
            <FontAwesome5 name="hand-holding-usd" size={70} color={'white'} />
            {/* <SvgUri
              width="80"
              height="80"
              source={uriLogo}
              // uri="http://thenewcode.com/assets/images/thumbnails/homer-simpson.svg"
            /> */}
          </View>
          <View style={[styles.form_container]}>
            {bolUsername && (
              <FormInput
                labelTransform="Họ và tên"
                ref={refUsername}
                onChangeText={value => handleChange('username', value)}
                value={username}
                nameSymbol="user"
                colorSymbol="#fff"
                isTransformFocus={username ? false : true}
              />
            )}
            {bolPhone && (
              <FormInput
                labelTransform="Phone"
                ref={refPhone}
                onChangeText={value => handleChange('phone', value)}
                value={phone}
                nameSymbol="phone"
                colorSymbol="#fff"
                keyboardType="phone-pad"
                isTransformFocus={phone ? false : true}
              />
            )}
            {bolEmail && (
              <FormInput
                labelTransform="Email"
                ref={refEmail}
                onChangeText={value => handleChange('email', value)}
                value={email}
                nameSymbol="envelope"
                colorSymbol="#fff"
                isTransformFocus={email ? false : true}
              />
            )}
            {bolOTP && (
              <FormInput
                labelTransform="OTP"
                ref={refOtp}
                onChangeText={value => handleChange('otpCode', value)}
                value={otpCode}
                nameSymbol="shield-alt"
                colorSymbol="#fff"
                isTransformFocus={otpCode ? false : true}
              />
            )}
            {bolPwd && (
              <FormInput
                labelTransform="Mật khẩu"
                secureTextEntry={true}
                ref={refPwd}
                onChangeText={value => handleChange('password', value)}
                value={password}
                color="#fff"
                showPwd
                nameSymbol="lock"
                colorSymbol="#fff"
                isTransformFocus={password ? false : true}
              />
            )}
            <TouchableOpacity
              activeOpacity={1}
              onPress={onPress}
              style={[isProcess && stylesGeneral.op6]}
              disabled={isProcess}>
              <Text style={[styles.button, stylesGeneral.fz16]}>
                {isProcess ? <ActivityIndicator color="white" /> : textBtn}
              </Text>
            </TouchableOpacity>
            {children}
          </View>
        </View>
        <Footer colorText={WHITE_COLOR} marginTop={10} />
      </ScrollView>
    </ImageBackground>
  );
};

export default Form;
