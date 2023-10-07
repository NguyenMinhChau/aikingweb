import React from 'react';
import {
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import tw from '../../../styles/twrnc.global';
import {IconCP} from '../../../utils/icon.utils';
import {
  BLACK_COLOR,
  MAIN_COLOR,
  PRIMARY_COLOR,
  WHITE_COLOR,
} from '../../../styles/colors.global';
import RowDialogCP from '../../General/Dialog/RowDialogCP';
import {DATA_SETTING_APP_INFO_CONFIG} from './config';
import DeviceInfo from 'react-native-device-info';
import VersionCheck from 'react-native-version-check';
import {PACKAGE_NAME_APP, URL_APP_PLAY_STORE} from '@env';
import ButtonCP from '../../General/ButtonCP';
import {EMPTY_CHAR} from '../../../helpers/_empty';
import LoadingScreen from '../../General/LoadingScreen';
import {SCREEN_NAVIGATE} from '../../routersConfig/General.config';
import BannerNestedScreen from '../../General/BannerNestedScreen';

export default function AppInfoScreen({navigation}) {
  const [isUpdateApp, setIsUpdateApp] = React.useState(false);
  const [isLoadingFile, setIsLoadingFile] = React.useState(false);
  const [versionNewApp, setVersionNewApp] = React.useState(null);

  React.useEffect(() => {
    const initCheckApp = async () => {
      // VersionCheck.needUpdate({
      //   packageName: PACKAGE_NAME_APP,
      // }).then(async res => {
      //   if (res?.isNeeded) {
      //     setIsUpdateApp(true);
      //     setVersionNewApp(res?.latestVersion);
      //   } else {
      //     setIsUpdateApp(false);
      //     setVersionNewApp(null);
      //   }
      // });
    };
    initCheckApp();
  }, []);

  const openStore = async () => {
    await Linking.openURL(URL_APP_PLAY_STORE);
  };

  return (
    <>
      {isLoadingFile ? (
        <LoadingScreen />
      ) : (
        <View style={tw.style(`flex-1 flex-col`)}>
          <BannerNestedScreen
            navigation={navigation}
            title="Điều khoản và thông tin ứng dụng"
            styleText={tw`text-[14px]`}
          />
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={tw.style(
              'flex-grow bg-gray-50 p-3 bg-white',
            )}>
            <View
              style={tw.style(
                `flex-col gap-2 px-3 py-2 rounded-xl shadow-md bg-white`,
              )}>
              {DATA_SETTING_APP_INFO_CONFIG.map((item, index) => {
                return (
                  <RowDialogCP
                    key={index}
                    label={item?.label}
                    styleLabel={tw`font-medium`}
                    leftNameIcon={item?.iconName}
                    noneBorderBottom={item?.noneBorderBottom}
                    ValueCP={() => {
                      return (
                        <IconCP
                          size={15}
                          color={BLACK_COLOR}
                          name="chevron-forward-outline"
                        />
                      );
                    }}
                    styleRow={tw.style(
                      `py-3 border-b-[${
                        item?.noneBorderBottom ? '0px' : '0.5px'
                      }]`,
                    )}
                    onClickAccord={() => {
                      navigation.navigate({
                        name: SCREEN_NAVIGATE.WebView_Review_Screen,
                        params: {
                          url: item?.urlWeb,
                          title: item?.label,
                          sourceHTML: item?.sourceHTML,
                        },
                      });
                    }}
                    noBullet
                  />
                );
              })}
            </View>
            <View
              style={tw.style('w-full p-2 mt-3 px-5 py-2 rounded-xl bg-white')}>
              <Text style={tw.style('font-medium text-[15px] bg-white')}>
                Phiên bản
              </Text>

              {isUpdateApp && versionNewApp ? (
                <>
                  <View style={tw.style('flex-row items-center mt-1 flex-1')}>
                    <Text
                      style={tw.style(
                        'text-green-500 font-medium text-[13px] leading-5 flex-grow w-1',
                      )}>
                      Đã có phiên bản mới, phiên bản{' '}
                      <Text
                        style={tw.style(
                          'text-blue-500 font-bold text-[13px] leading-5',
                        )}>
                        {versionNewApp || EMPTY_CHAR}.{' '}
                      </Text>
                      <Text
                        style={tw.style(
                          'text-green-500 font-medium text-[13px] leading-5',
                        )}>
                        Vui lòng cập nhật để có trải nghiệm tốt nhất. Cảm ơn!
                      </Text>
                    </Text>
                  </View>
                  <View style={tw.style('justify-end mt-3')}>
                    <ButtonCP
                      text="Cập nhật ngay"
                      onPress={openStore}
                      colorBG={PRIMARY_COLOR}
                      colorBorder={PRIMARY_COLOR}
                    />
                  </View>
                </>
              ) : (
                <View style={tw.style('flex-row items-center mt-1 flex-1')}>
                  <Text
                    style={tw.style(
                      'text-slate-400 font-medium text-[13px] leading-5 mt-1 flex-grow w-1',
                    )}>
                    Bạn đang sử dụng phiên bản mới nhất, phiên bản{' '}
                    <Text
                      style={tw.style(
                        'text-blue-500 font-bold text-[13px] leading-5',
                      )}>
                      {DeviceInfo.getVersion() || EMPTY_CHAR}{' '}
                    </Text>
                  </Text>
                </View>
              )}
            </View>
          </ScrollView>
        </View>
      )}
    </>
  );
}
