import {View, Text, TouchableOpacity, Image} from 'react-native';
import tw from '../styles/twrnc.global';
import {IconCP} from './icon.utils';
import Toast from 'react-native-toast-message';
import {fList} from './array.utils';
import FastImageCP from '../components/General/FastImageCP';
import moment from 'moment';

export const TYPE_TOAST = {
  SUCCESS: 'successToast',
  ERROR: 'errorToast',
  WARNING: 'warningToast',
  INFO: 'infoToast',
  NOTIFICATION: 'notification',
};

export const toastConfig = () => {
  return {
    [TYPE_TOAST.SUCCESS]: ({props}) => {
      const {title, message, buttons, MessageCustom} = {...props};
      return (
        <View
          style={tw.style(
            `shadow-lg rounded-lg w-[95%] flex-row gap-3 items-start p-2 bg-white`,
          )}>
          <IconCP name="checkmark-circle" size={23} color="#3ab952" />
          <View style={tw.style(`flex-col items-start justify-start flex-1`)}>
            <View
              style={tw.style(`flex-row items-center justify-between w-full`)}>
              <Text style={tw.style(`text-[#3ab952] font-bold text-[16px]`)}>
                {title || 'Đã xử lý thành công'}
              </Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  Toast.hide();
                }}>
                <IconCP name="close-outline" size={23} color="#9bafb8" />
              </TouchableOpacity>
            </View>
            {MessageCustom ? (
              <MessageCustom />
            ) : (
              <Text
                style={tw.style(
                  `text-[14px] leading-6 text-justify my-2 text-black`,
                )}>
                {message || 'Xử lý thành công'}
              </Text>
            )}
            <View style={tw`flex-row gap-2 justify-end w-full`}>
              {fList(buttons || [])?.map((item, index) => {
                const {onPress, styleBtn, styleText, textBtn} = {...item};
                return (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    key={index}
                    onPress={() => {
                      onPress && onPress();
                      Toast.hide();
                    }}
                    style={tw.style(
                      `bg-blue-500 rounded py-[6px] px-1 min-w-[80px] items-center justify-center`,
                      {
                        ...styleBtn,
                      },
                    )}>
                    <Text
                      style={tw.style(`text-white text-[13px] font-bold`, {
                        ...styleText,
                      })}>
                      {textBtn || 'OK'}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>
      );
    },
    [TYPE_TOAST.ERROR]: ({props}) => {
      const {title, message, buttons, MessageCustom} = {...props};
      return (
        <View
          style={tw.style(
            `shadow-lg rounded-lg w-[95%] flex-row gap-3 items-start p-2 bg-white`,
          )}>
          <IconCP name="close-circle-outline" size={23} color="#e85450" />
          <View style={tw.style(`flex-col items-start justify-start flex-1`)}>
            <View
              style={tw.style(`flex-row items-center justify-between w-full`)}>
              <Text style={tw.style(`text-[#e85450] font-bold text-[16px]`)}>
                {title || 'Đã xảy ra lỗi'}
              </Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  Toast.hide();
                }}>
                <IconCP name="close-outline" size={23} color="#9bafb8" />
              </TouchableOpacity>
            </View>
            {MessageCustom ? (
              <MessageCustom />
            ) : (
              <Text
                style={tw.style(
                  `text-[14px] leading-6 text-justify my-2 text-black`,
                )}>
                {message ||
                  'Xử lý thất bại. Vui lòng liên hệ phòng KTHT - INFMN để được hỗ trợ.'}
              </Text>
            )}
            <View style={tw`flex-row gap-2 justify-end w-full`}>
              {fList(buttons || [])?.map((item, index) => {
                const {onPress, styleBtn, styleText, textBtn} = {...item};
                return (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    key={index}
                    onPress={() => {
                      onPress && onPress();
                      Toast.hide();
                    }}
                    style={tw.style(
                      `bg-blue-500 rounded py-[6px] px-1 min-w-[80px] items-center justify-center`,
                      {
                        ...styleBtn,
                      },
                    )}>
                    <Text
                      style={tw.style(`text-white text-[13px] font-bold`, {
                        ...styleText,
                      })}>
                      {textBtn || 'OK'}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>
      );
    },
    [TYPE_TOAST.WARNING]: ({props}) => {
      const {title, message, buttons, MessageCustom} = {...props};
      return (
        <View
          style={tw.style(
            `shadow-lg rounded-lg w-[95%] flex-row gap-3 items-start p-2 bg-white`,
          )}>
          <IconCP name="alert-circle-outline" size={23} color="#e3b432" />
          <View style={tw.style(`flex-col items-start justify-start flex-1`)}>
            <View
              style={tw.style(`flex-row items-center justify-between w-full`)}>
              <Text style={tw.style(`text-[#e3b432] font-bold text-[16px]`)}>
                {title || 'Đã xảy vấn đề'}
              </Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  Toast.hide();
                }}>
                <IconCP name="close-outline" size={23} color="#9bafb8" />
              </TouchableOpacity>
            </View>
            {MessageCustom ? (
              <MessageCustom />
            ) : (
              <Text
                style={tw.style(
                  `text-[14px] leading-6 text-justify my-2 text-black`,
                )}>
                {message ||
                  'Có thể bạn đang gặp một vài vấn đề. Vui lòng liên hệ phòng KTHT - INFMN để được hỗ trợ.'}
              </Text>
            )}
            <View style={tw`flex-row gap-2 justify-end w-full`}>
              {fList(buttons || [])?.map((item, index) => {
                const {onPress, styleBtn, styleText, textBtn} = {...item};
                return (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    key={index}
                    onPress={() => {
                      onPress && onPress();
                      Toast.hide();
                    }}
                    style={tw.style(
                      `bg-blue-500 rounded py-[6px] px-1 min-w-[80px] items-center justify-center`,
                      {
                        ...styleBtn,
                      },
                    )}>
                    <Text
                      style={tw.style(`text-white text-[13px] font-bold`, {
                        ...styleText,
                      })}>
                      {textBtn || 'OK'}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>
      );
    },
    [TYPE_TOAST.INFO]: ({props}) => {
      const {title, message, buttons, MessageCustom} = {...props};
      return (
        <View
          style={tw.style(
            `shadow-lg rounded-lg w-[95%] flex-row gap-3 items-start p-2 bg-white`,
          )}>
          <IconCP name="information-circle-outline" size={23} color="#1e90ff" />
          <View style={tw.style(`flex-col items-start justify-start flex-1`)}>
            <View
              style={tw.style(`flex-row items-center justify-between w-full`)}>
              <Text style={tw.style(`text-[#1e90ff] font-bold text-[16px]`)}>
                {title || 'Thông báo'}
              </Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  Toast.hide();
                }}>
                <IconCP name="close-outline" size={23} color="#9bafb8" />
              </TouchableOpacity>
            </View>
            {MessageCustom ? (
              <MessageCustom />
            ) : (
              <Text
                style={tw.style(
                  `text-[14px] leading-6 text-justify my-2 text-black`,
                )}>
                {message || 'Aiking Group có một vài thông tin gửi đến bạn.'}
              </Text>
            )}
            <View style={tw`flex-row gap-2 justify-end w-full`}>
              {fList(buttons || [])?.map((item, index) => {
                const {onPress, styleBtn, styleText, textBtn} = {...item};
                return (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    key={index}
                    onPress={() => {
                      onPress && onPress();
                      Toast.hide();
                    }}
                    style={tw.style(
                      `bg-blue-500 rounded py-[6px] px-1 min-w-[80px] items-center justify-center`,
                      {
                        ...styleBtn,
                      },
                    )}>
                    <Text
                      style={tw.style(`text-white text-[13px] font-bold`, {
                        ...styleText,
                      })}>
                      {textBtn || 'OK'}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>
      );
    },
    [TYPE_TOAST.NOTIFICATION]: ({props}) => {
      const {title, message, time, buttons, MessageCustom} = {...props};
      return (
        <View
          style={tw.style(
            `shadow-lg rounded-lg w-[95%] flex-row gap-3 items-start p-2 bg-white`,
          )}>
          <Image
            source={require('../assets/images/logo_company/logo_square.png')}
            resizeMode="contain"
            style={tw.style(
              'rounded-full w-[30px] h-[30px] border border-gray-100',
            )}
          />
          <View style={tw.style(`flex-col items-start justify-start flex-1`)}>
            <View
              style={tw.style(`flex-row items-start justify-between w-full`)}>
              <Text style={tw.style(`text-black font-bold text-[16px] flex-1`)}>
                {title || 'Aiking Group'}{' '}
                <Text style={tw.style(`text-gray-400 font-medium text-[12px]`)}>
                  • {moment(time).format('HH:mm')}
                </Text>
              </Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  Toast.hide();
                }}>
                <IconCP name="close-outline" size={23} color="#9bafb8" />
              </TouchableOpacity>
            </View>
            {MessageCustom ? (
              <MessageCustom />
            ) : (
              <Text
                style={tw.style(
                  `text-[14px] leading-6 text-justify my-2 text-black`,
                )}>
                {message || 'Aiking Group có một vài thông tin gửi đến bạn.'}
              </Text>
            )}
            <View style={tw`flex-row gap-2 justify-end w-full`}>
              {fList(buttons || [])?.map((item, index) => {
                const {onPress, styleBtn, styleText, textBtn} = {...item};
                return (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    key={index}
                    onPress={() => {
                      onPress && onPress();
                      Toast.hide();
                    }}
                    style={tw.style(
                      `bg-blue-500 rounded py-[6px] px-1 min-w-[80px] items-center justify-center`,
                      {
                        ...styleBtn,
                      },
                    )}>
                    <Text
                      style={tw.style(`text-white text-[13px] font-bold`, {
                        ...styleText,
                      })}>
                      {textBtn || 'OK'}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>
      );
    },
  };
};
