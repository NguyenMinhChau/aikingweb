import {View, Text} from 'react-native';
import tw from '../styles/twrnc.global';
import {Iconify} from 'react-native-iconify';
import {ENV} from '@env';
import {onCopyToClipboard} from './copy.clipboard';

const checkEnvDev = ENV === 'development';

export const TYPE_TOAST = {
  SUCCESS: 'successToast',
  ERROR: 'errorToast',
  WARNING: 'warningToast',
  INFO: 'infoToast',
};

export const toastConfig = {
  [TYPE_TOAST.SUCCESS]: ({props}) => (
    <View
      style={tw`bg-white shadow-sm rounded-md p-2 w-[90%] border-l-4 flex-row gap-2 items-start border-green-500`}>
      <Iconify icon="gg:check-o" size={25} color="#22c55e" />
      <View style={tw`flex-col items-start justify-start flex-1`}>
        <Text style={tw`text-black font-bold text-[15px]`}>
          {props.title || 'Thông báo'}
        </Text>
        <View style={tw`flex-col`}>
          <Text style={tw`text-black text-[12px] leading-5 text-justify`}>
            {props.message || 'Xử lý thành công'}
          </Text>
          {checkEnvDev && (
            <>
              {props.action && (
                <Text
                  style={tw`text-blue-500 text-[12px] leading-5 font-bold`}
                  onPress={() => onCopyToClipboard(props.action)}>
                  Action: {props.action || ''}
                </Text>
              )}
              {props.pathFile && (
                <Text
                  style={tw`text-red-500 text-[12px] leading-5 font-bold`}
                  onPress={() => onCopyToClipboard(props.pathFile)}>
                  PathFile: {props.pathFile || ''}
                </Text>
              )}
            </>
          )}
        </View>
      </View>
    </View>
  ),
  [TYPE_TOAST.ERROR]: ({props}) => (
    <View
      style={tw`bg-white shadow-sm rounded-md p-2 w-[90%] border-l-4 flex-row gap-2 items-start border-red-500`}>
      <Iconify icon="codicon:error" size={25} color="#ef4444" />
      <View style={tw`flex-col items-start justify-start flex-1`}>
        <Text style={tw`text-black font-bold text-[15px]`}>
          {props.title || 'Thông báo'}
        </Text>
        <View style={tw`flex-col`}>
          <Text style={tw`text-black text-[12px] leading-5 text-justify`}>
            {props.message || 'Xử lý thất bại'}
          </Text>
          {checkEnvDev && (
            <>
              {props.action && (
                <Text
                  style={tw`text-blue-500 text-[12px] leading-5 font-bold`}
                  onPress={() => onCopyToClipboard(props.action)}>
                  Action: {props.action || ''}
                </Text>
              )}
              {props.pathFile && (
                <Text
                  style={tw`text-red-500 text-[12px] leading-5 font-bold`}
                  onPress={() => onCopyToClipboard(props.pathFile)}>
                  PathFile: {props.pathFile || ''}
                </Text>
              )}
            </>
          )}
        </View>
      </View>
    </View>
  ),
  [TYPE_TOAST.WARNING]: ({props}) => (
    <View
      style={tw`bg-white shadow-sm rounded-md p-2 w-[90%] border-l-4 flex-row gap-2 items-start border-orange-500`}>
      <Iconify icon="bx:error" size={25} color="#f97316" />
      <View style={tw`flex-col items-start justify-start flex-1`}>
        <Text style={tw`text-black font-bold text-[15px]`}>
          {props.title || 'Thông báo'}
        </Text>
        <View style={tw`flex-col`}>
          <Text style={tw`text-black text-[12px] leading-5 text-justify`}>
            {props.message || 'Đã xảy ra vấn đề'}
          </Text>
          {checkEnvDev && (
            <>
              {props.action && (
                <Text
                  style={tw`text-blue-500 text-[12px] leading-5 font-bold`}
                  onPress={() => onCopyToClipboard(props.action)}>
                  Action: {props.action || ''}
                </Text>
              )}
              {props.pathFile && (
                <Text
                  style={tw`text-red-500 text-[12px] leading-5 font-bold`}
                  onPress={() => onCopyToClipboard(props.pathFile)}>
                  PathFile: {props.pathFile || ''}
                </Text>
              )}
            </>
          )}
        </View>
      </View>
    </View>
  ),
  [TYPE_TOAST.INFO]: ({props}) => (
    <View
      style={tw`bg-white shadow-sm rounded-md p-2 w-[90%] border-l-4 flex-row gap-2 items-start border-blue-500`}>
      <Iconify icon="octicon:info-24" size={25} color="#3b82f6" />
      <View style={tw`flex-col items-start justify-start flex-1`}>
        <Text style={tw`text-black font-bold text-[15px]`}>
          {props.title || 'Thông báo'}
        </Text>
        <View style={tw`flex-col`}>
          <Text style={tw`text-black text-[12px] leading-5 text-justify`}>
            {props.message || 'Đề xuất một số thông tin'}
          </Text>
          {checkEnvDev && (
            <>
              {props.action && (
                <Text
                  style={tw`text-blue-500 text-[12px] leading-5 font-bold`}
                  onPress={() => onCopyToClipboard(props.action)}>
                  Action: {props.action || ''}
                </Text>
              )}
              {props.pathFile && (
                <Text
                  style={tw`text-red-500 text-[12px] leading-5 font-bold`}
                  onPress={() => onCopyToClipboard(props.pathFile)}>
                  PathFile: {props.pathFile || ''}
                </Text>
              )}
            </>
          )}
        </View>
      </View>
    </View>
  ),
};
