import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Linking,
} from 'react-native';

import OTPView from '../OTP/OTPView.js';

import tw from '../../../styles/twrnc.global';
import TextInputCP from '../../General/TextInputCP';
import {Iconify} from 'react-native-iconify';
import {ToastShow} from '../../../utils/Toast';
import {TYPE_TOAST} from '../../../utils/toast.config';
import {emailPerm} from '../../../utils/checkPerm/email';
import {ActivityIndicator} from 'react-native-paper';
import LoadingScreen from '../../General/LoadingScreen';
import {
  AUTH_REGISTER,
  AUTH_SEND_OTP_CODE,
  AUTH_VERIFY_OTP_CODE,
} from '../../../services/auth.js';
import useAppContext from '../../../utils/hooks/useAppContext.js';
import {isValidToken} from '../../../services/jwt.js';
import {SCREEN_NAVIGATE} from '../../routersConfig/General.config.js';
import {ENV} from '@env';
import LoaderSliderCP from '../../LoaderApp/LoaderSlider.js';
import {
  getAsyncCacheLoaderSliderUsed,
  setAsyncCacheLoaderSliderUsed,
} from '../../../utils/cache.services.js';
import CustomSelectCP from '../../General/CustomSelectCP.js';
import {DATA_DEPARTMENT} from './config.js';

const checkEnvDev = ENV === 'development';

export default function Login({navigation}) {
  const {dispatch, state} = useAppContext();
  const {currentUser, accessToken, loader_slider_used} = state.set_data;

  const [showOtpInput, setShowOtpInput] = React.useState(false);
  const [isLoad, setLoad] = React.useState(false);
  const [isRegister, setIsRegister] = React.useState(false);
  const [toggleDropDownDepartment, setToggleDropDownDepartment] =
    React.useState(false);
  const [emailValue, setEmailValue] = React.useState('');
  const [userNameValue, setUserNameValue] = React.useState('');
  const [departmentValue, setDepartmentValue] = React.useState('');
  const [otpValue, setOtpValue] = React.useState('');
  const [txtButtonLogin, setTxtButtonLogin] = React.useState('GET OTP');

  const refEmail = React.useRef(null);
  const refUserName = React.useRef(null);

  // ?! CHECK CURRENT USER
  React.useEffect(() => {
    const tokenAccess = accessToken?.accessToken;
    if (currentUser?.user?.email && isValidToken(tokenAccess)) {
      navigation.navigate(SCREEN_NAVIGATE.Bottom_Tab_Screen);
    }
  }, []);
  // ?!

  const handleChangeInputEmail = value => {
    setEmailValue(value);
  };
  const handleChangeInputUserName = value => {
    setUserNameValue(value);
  };
  const handleChangeDepartment = value => {
    setDepartmentValue(value);
  };

  const onPressRegister = async () => {
    const checkEmail = emailPerm(emailValue);
    if (!checkEmail) {
      ToastShow({
        type: TYPE_TOAST.ERROR,
        props: {
          message: 'Email không hợp lệ vui lòng thử lại!',
        },
      });
      refEmail.current.focus();
    } else {
      setLoad(true);
      AUTH_REGISTER({
        email: emailValue,
        username: userNameValue,
        department: departmentValue,
        setTxtButtonLogin,
        setShowOtpInput,
        setIsRegister,
        setLoad,
      });
    }
  };

  const onPressLogin = async () => {
    const checkEmail = emailPerm(emailValue);
    if (!checkEmail) {
      ToastShow({
        type: TYPE_TOAST.ERROR,
        props: {
          message: 'Email không hợp lệ vui lòng thử lại!',
        },
      });
      refEmail.current.focus();
    } else {
      setLoad(true);
      AUTH_SEND_OTP_CODE({
        email: emailValue,
        setTxtButtonLogin,
        setShowOtpInput,
        setLoad,
      });
    }
  };

  const onSendingOTP = () => {
    if (otpValue.length === 6) {
      ToastShow({
        type: TYPE_TOAST.INFO,
        props: {
          message: 'Vui lòng đợi, chúng tôi đang kiểm tra...',
        },
      });
      setTxtButtonLogin(<ActivityIndicator size={12} color="#fff" />);
      setLoad(true);
      AUTH_VERIFY_OTP_CODE({
        dispatch,
        state,
        otpCode: otpValue,
        email: emailValue,
        setTxtButtonLogin,
        setShowOtpInput,
        setEmailValue,
        setLoad,
        navigation,
      });
    } else {
      ToastShow({
        type: TYPE_TOAST.ERROR,
        props: {
          message: 'Mã OTP không hợp lệ!',
        },
      });
    }
  };

  const openDocs = () => {
    Linking.openURL('https://aiking.ltd/');
  };

  const handleShowToast = action => {
    ToastShow({
      type: TYPE_TOAST.INFO,
      props: {
        message: 'Coming soon!',
      },
    });
  };

  const handleRetypedOTP = () => {
    if (!emailValue) {
      ToastShow({
        type: TYPE_TOAST.INFO,
        props: {
          message: 'Vui lòng nhập email trước khi nhập mã OTP',
        },
      });
    } else {
      const checkEmail = emailPerm(emailValue);
      if (!checkEmail) {
        ToastShow({
          type: TYPE_TOAST.ERROR,
          props: {
            message: 'Email không hợp lệ vui lòng thử lại!',
          },
        });
        setShowOtpInput(false);
        refEmail.current.focus();
      } else {
        setShowOtpInput(!showOtpInput);
      }
    }
  };

  return (
    <>
      {isLoad ? (
        <LoadingScreen />
      ) : loader_slider_used?.state ? (
        <LoaderSliderCP
          redirect={navigation}
          onClick={async () => {
            await setAsyncCacheLoaderSliderUsed({state: false});
            await getAsyncCacheLoaderSliderUsed(dispatch);
          }}
        />
      ) : (
        <LinearGradient
          style={tw`w-full h-full flex-1`}
          colors={['#157bfb', '#78b3fd']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}>
          <View style={tw`flex-1`}>
            <KeyboardAvoidingView
              style={tw`flex-1`}
              behavior={Platform.OS === 'ios' ? 'height' : 'height'}
              keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={tw`flex-grow`}>
                <View
                  style={tw.style(
                    `items-center justify-center my-${
                      Platform.OS === 'ios' ? 15 : 10
                    }`,
                  )}>
                  <Text style={tw`font-bold text-[16px] text-white uppercase`}>
                    AIKING GROUP - HCMC
                  </Text>
                </View>
                <View style={tw`items-center justify-center w-full h-[150px]`}>
                  <Image
                    style={tw`w-[150px] h-full`}
                    source={require('../../../assets/images/logo_company/logo_square.png')}
                    resizeMode="contain"
                  />
                </View>
                <View
                  style={tw`w-full justify-center items-center flex-1 mt-5`}>
                  <View
                    style={tw`w-[80%] p-2 bg-white h-full rounded-xl justify-start items-center rounded-bl-0 rounded-br-0`}>
                    <Text
                      style={tw`text-[21px] items-center pt-5 pb-2 text-[#163892] font-bold`}>
                      Welcome to AIKING Group
                    </Text>
                    <Text style={tw`font-bold text-[10px] text-gray-400`}>
                      Hướng dẫn đăng nhập hệ thống{' '}
                      <Text style={tw`text-green-400`} onPress={openDocs}>
                        Tại đây
                      </Text>
                    </Text>
                    {isRegister && (
                      <View
                        style={tw`w-[80%] flex-row items-center gap-1 h-[35px] mt-3`}>
                        <Iconify
                          icon="solar:user-bold-duotone"
                          size={25}
                          color="#ee0050"
                          style={tw`w-[10%]`}
                        />
                        <TextInputCP
                          placeholder="Enter your user name"
                          style={tw`w-full`}
                          contentStyle={tw.style(
                            'p-2 w-full',
                            showOtpInput && 'text-gray-400',
                          )}
                          outlinedStyle={tw`border-0 border-b-[1px] rounded-none w-[88%]`}
                          onChange={val => handleChangeInputUserName(val)}
                          keyboardType="default"
                          returnKeyType="next"
                          autoCorrect={false}
                          disabled={showOtpInput}
                          value={userNameValue}
                          ref={refUserName}
                        />
                      </View>
                    )}
                    <View
                      style={tw`w-[80%] flex-row items-center gap-1 h-[35px] mt-3`}>
                      <Iconify
                        icon="ic:twotone-email"
                        size={25}
                        color="#ee0050"
                        style={tw`w-[10%]`}
                      />
                      <TextInputCP
                        placeholder="Enter your email ID"
                        style={tw`w-full`}
                        contentStyle={tw.style(
                          'p-2 w-full',
                          showOtpInput && 'text-gray-400',
                        )}
                        outlinedStyle={tw`border-0 border-b-[1px] rounded-none w-[88%]`}
                        onChange={val =>
                          handleChangeInputEmail(val?.toLowerCase())
                        }
                        keyboardType="email-address"
                        returnKeyType="next"
                        autoCorrect={false}
                        disabled={showOtpInput}
                        value={emailValue}
                        ref={refEmail}
                      />
                    </View>

                    {isRegister && (
                      <View style={tw.style('w-[80%] mt-5')}>
                        <CustomSelectCP
                          dataList={DATA_DEPARTMENT}
                          placeholder="Chọn phòng ban"
                          toggleDropDown={toggleDropDownDepartment}
                          setToggleDropDown={setToggleDropDownDepartment}
                          selectList={[departmentValue]}
                          onSelectValue={val => handleChangeDepartment(val)}
                          isQuantityInitData
                          quantityDataInit={10}
                          styleContainer={tw.style('mb-0')}
                        />
                      </View>
                    )}

                    {showOtpInput ? (
                      <View style={tw`mt-5 w-[80%]`}>
                        <OTPView setOtpValue={setOtpValue} />
                      </View>
                    ) : null}
                    <TouchableOpacity
                      onPress={
                        showOtpInput
                          ? () => onSendingOTP()
                          : isRegister
                          ? () => onPressRegister()
                          : () => onPressLogin()
                      }
                      activeOpacity={0.9}
                      style={tw`w-[80%] h-[30px] bg-blue-500 rounded-md mt-6 py-1 justify-center items-center`}>
                      <Text style={tw`text-white font-bold`}>
                        {txtButtonLogin}
                      </Text>
                    </TouchableOpacity>
                    <View style={tw.style('items-center mt-3', {})}>
                      <Text style={tw`text-gray-500 mx-3 my-2`}>
                        <View style={tw`w-[90px] h-[1px] bg-gray-500`} />
                        Trợ giúp
                        <View style={tw`w-[90px] h-[1px] bg-gray-500`} />
                      </Text>
                      {checkEnvDev && !isRegister && (
                        <Text
                          style={tw`font-bold text-[11px] text-gray-500 my-2`}
                          onPress={handleRetypedOTP}>
                          NHẬP LẠI MÃ OTP
                        </Text>
                      )}
                      {showOtpInput && (
                        <Text
                          style={tw`font-bold text-[11px] text-gray-500 my-2`}
                          onPress={() => handleShowToast('RESEND OTP')}>
                          GỬI LẠI MÃ OTP
                        </Text>
                      )}
                      <Text
                        style={tw`font-bold text-[11px] text-gray-500 my-2`}
                        onPress={() => setIsRegister(!isRegister)}>
                        ĐĂNG {isRegister ? 'NHẬP' : 'KÝ'} TÀI KHOẢN?
                      </Text>
                      {!isRegister && (
                        <Text
                          style={tw`font-bold text-[11px] text-gray-500 my-2`}
                          onPress={() => handleShowToast('CAN NOT LOGIN')}>
                          KHÔNG THỂ ĐĂNG NHẬP?
                        </Text>
                      )}
                    </View>
                    <View
                      style={tw`flex-grow flex-1 justify-end items-center mt-6`}>
                      <Image
                        source={require('../../../assets/images/logo_company/logo_square.png')}
                        resizeMode="contain"
                        style={tw.style('w-[150px] h-[50px]')}
                      />
                    </View>
                  </View>
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
          </View>
        </LinearGradient>
      )}
    </>
  );
}
