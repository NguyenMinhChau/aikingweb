import React, {useEffect} from 'react';
import {
  useColorScheme,
  Linking,
  View,
  Text,
  Image,
  ScrollView,
} from 'react-native';
import {MD3DarkTheme, MD3LightTheme, PaperProvider} from 'react-native-paper';
import VersionCheck from 'react-native-version-check';
import {
  getAsyncCacheAccessToken,
  getAsyncCacheCurrentUser,
  getAsyncCacheLoaderBgc,
  getAsyncCacheLoaderGif,
  getAsyncCacheLoaderSliderUsed,
  getAsyncCacheSettingAppearance,
  getAsyncCacheSettingAppearanceKEY,
  setAsyncCacheLoaderBgc,
  setAsyncCacheLoaderGif,
  setAsyncCacheSettingAppearance,
} from '../utils/cache.services';
import useAppContext from '../utils/hooks/useAppContext';
import TabHomeStackCP from './routersRender/TabHomeStackCP';
import {URL_APP_PLAY_STORE, PACKAGE_NAME_APP} from '@env';
import DialogCP from './General/Dialog/DialogCP';
import tw from '../styles/twrnc.global';
import {Iconify} from 'react-native-iconify';
import RowDialogCP from './General/Dialog/RowDialogCP';
import ButtonCP from './General/ButtonCP';
import {CRITICAL_COLOR, PRIMARY_COLOR} from '../styles/colors.global';
import LoaderGifCP from './LoaderApp/LoaderGif';
import LoaderBgcCP from './LoaderApp/LoaderBgc';

export default function Main() {
  const {dispatch, state} = useAppContext();
  const {appearance_display, currentUser} = state.set_data;
  const displaySystem = useColorScheme();
  const [isUpdateApp, setIsUpdateApp] = React.useState(false);
  const [versionNewApp, setVersionNewApp] = React.useState(null);
  const [loaderGif, setLoaderGif] = React.useState(false);
  const [loaderBgc, setLoaderBgc] = React.useState(false);

  useEffect(() => {
    getAsyncCacheCurrentUser(dispatch);
    getAsyncCacheAccessToken(dispatch);
    getAsyncCacheLoaderSliderUsed(dispatch);
    const checkSettingAppearance = async () => {
      const settingAppearance = await getAsyncCacheSettingAppearanceKEY();
      if (settingAppearance) {
        await getAsyncCacheSettingAppearance(dispatch);
      } else {
        await setAsyncCacheSettingAppearance({
          label: 'Hệ thống',
          value: displaySystem || 'light',
        });
      }
    };
    checkSettingAppearance();
    const initCheckApp = async () => {
      VersionCheck.needUpdate({
        packageName: PACKAGE_NAME_APP,
      }).then(async res => {
        if (res?.isNeeded) {
          setIsUpdateApp(true);
          setVersionNewApp(res?.latestVersion);
        } else {
          setIsUpdateApp(false);
          setVersionNewApp(null);
        }
      });
      setLoaderGif(true);
      setTimeout(() => {
        setLoaderGif(false);
        // setLoaderBgc(true);
        // setTimeout(() => {
        //   setLoaderBgc(false);
        // }, 2000);
      }, 2000);
    };
    initCheckApp();
  }, []);

  const toggleUpdateApp = () => {
    setIsUpdateApp(!isUpdateApp);
  };
  const handleRedirectPlayStore = () => {
    Linking.openURL(`${URL_APP_PLAY_STORE}`);
  };

  const theme =
    appearance_display?.value === 'dark' ? MD3DarkTheme : MD3LightTheme;

  return (
    <>
      <PaperProvider theme={theme}>
        {loaderGif ? (
          <LoaderGifCP />
        ) : (
          <>
            <TabHomeStackCP />
            <DialogCP
              visible={isUpdateApp && versionNewApp}
              setVisible={val => setIsUpdateApp(val)}>
              <View
                style={tw`w-full flex-row items-center px-2 justify-between bg-white`}
                onTouchStart={() => {
                  setIsUpdateApp(!isUpdateApp);
                }}>
                <View style={tw`h-[40px] w-[80px] items-start justify-start`}>
                  <Image
                    source={require('../assets/images/logo_company/logo_square.png')}
                    style={tw`w-full h-full`}
                    resizeMode="contain"
                  />
                </View>
                <Iconify
                  icon="iconamoon:close"
                  color={tw.color('gray-400')}
                  width={30}
                  height={30}
                  style={tw`justify-end`}
                />
              </View>
              <ScrollView
                style={tw`h-auto p-2`}
                showsVerticalScrollIndicator={false}>
                <View style={tw`px-2`}>
                  <Text
                    style={tw`text-center font-bold text-[16px] text-black px-1 leading-5`}>
                    Thông báo: Cập nhật ứng dụng
                  </Text>
                </View>
                <RowDialogCP
                  header="Thông tin chung"
                  label="Phiên bản"
                  value={`v${versionNewApp}`}
                  noBullet
                />
                <View style={tw.style('items-center justify-center')}>
                  <Text
                    style={tw.style(
                      `text-[14px] text-[${PRIMARY_COLOR}] text-center leading-5 italic font-bold mt-2`,
                    )}>
                    Vui lòng cập nhật để có trải nghiệm tốt nhất. Cảm ơn!
                  </Text>
                </View>
                <View
                  style={tw.style(
                    'w-full flex-row justify-end items-end gap-2 mt-3',
                  )}>
                  <ButtonCP
                    onPress={toggleUpdateApp}
                    text="Để sau"
                    style={tw.style('w-[150px]')}
                    variant="outlined"
                    colorBG="transparent"
                    colorBorder={CRITICAL_COLOR}
                  />
                  <ButtonCP
                    onPress={handleRedirectPlayStore}
                    text="Cập nhật"
                    style={tw.style('w-[150px]')}
                    colorBG={PRIMARY_COLOR}
                    colorBorder={PRIMARY_COLOR}
                  />
                </View>
              </ScrollView>
            </DialogCP>
          </>
        )}
      </PaperProvider>
    </>
  );
}
