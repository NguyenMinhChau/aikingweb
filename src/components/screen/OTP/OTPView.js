import React from 'react';
import {Text, View} from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';

import tw from '../../../styles/twrnc.global';
import {PRIMARY_COLOR} from '../../../styles/colors.global';

export default function OTPScreen({
  setOtpValue,
  styleContainer,
  textInputStyle,
}) {
  const otpRef = React.useRef(null);
  // React.useEffect(() => {
  //   if (otpRef?.current) {
  //     setTimeout(() => otpRef?.current?.focusField(0), 10);
  //   }
  // }, []);
  return (
    <View style={tw`w-full justify-start`}>
      <Text style={tw`font-bold text-[14px] mb-1 text-black`}>Nhập mã OTP</Text>
      <OTPInputView
        ref={otpRef}
        autoFocusOnLoad={false}
        onCodeChanged={code => {
          setOtpValue(code);
        }}
        pinCount={6}
        style={tw.style('w-full h-[40px] mt-2 justify-between items-center', {
          ...styleContainer,
        })}
        codeInputHighlightStyle={tw`border-[${PRIMARY_COLOR}] border-2`}
        codeInputFieldStyle={tw.style(
          'text-black w-[30px] text-[15px] h-[40px] border border-gray-400 rounded-md text-center font-bold mb-0 p-0',
          {...textInputStyle},
        )}
        // onCodeFilled={code => {
        //   console.log(`Code is ${code}, you are good to go!`);
        // }}
      />
    </View>
  );
}
