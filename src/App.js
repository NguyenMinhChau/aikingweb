import React, {useEffect, useState} from 'react';
import {Image, Text, View, Linking, Animated} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {NativeBaseProvider} from 'native-base';
import {ProviderContext} from './app/';
import {Main} from './navigation';
import VersionCheck from 'react-native-version-check';
import stylesStatus from './styles/Status';
import stylesGeneral from './styles/General';
import styles from './styles/AppCss';
import {URL_APP_PLAY_STORE, PACKAGE_NAME_APP} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const [updateApp, setUpdateApp] = React.useState(false);
  const [modalLoadApp, setModalLoadApp] = React.useState(false);
  const [versionNew, setVersionNew] = React.useState(null);
  useEffect(() => {
    const init = async () => {
      await AsyncStorage.setItem(
        '@modalLoader',
        JSON.stringify({
          modalLoadApp: true,
        }),
      );
      await AsyncStorage.getItem('@modalLoader').then(res => {
        const data = JSON.parse(res);
        setModalLoadApp(data.modalLoadApp);
      });
      VersionCheck.needUpdate({
        packageName: PACKAGE_NAME_APP,
      }).then(async res => {
        if (res?.isNeeded) {
          setUpdateApp(true);
          setVersionNew(res?.latestVersion);
        } else {
          setUpdateApp(false);
          setVersionNew(null);
        }
      });
      setTimeout(async () => {
        await AsyncStorage.setItem(
          '@modalLoader',
          JSON.stringify({
            modalLoadApp: false,
          }),
        );
        await AsyncStorage.getItem('@modalLoader').then(res => {
          const data = JSON.parse(res);
          setModalLoadApp(data.modalLoadApp);
        });
      }, 2000);
    };
    init();
  }, []);

  const toogleUpdateApp = () => {
    setUpdateApp(!updateApp);
  };
  const handleRedirectPlayStore = () => {
    Linking.openURL(`${URL_APP_PLAY_STORE}`);
  };
  const [animation] = useState(new Animated.Value(0));
  Animated.timing(animation, {
    toValue: 1,
    duration: 1000,
    useNativeDriver: true,
  }).start();
  const animatedStylesOpacity = {
    opacity: animation.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0.5, 1],
    }),
    transform: [
      {
        scale: animation.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [0.5, 0.75, 1],
        }),
      },
    ],
  };
  return (
    <ProviderContext>
      {modalLoadApp ? (
        <View style={[styles.image_loader]}>
          <Animated.View style={[animatedStylesOpacity]}>
            <Text style={[styles.text_loader]}>
              Provident Fund ©{' '}
              <Text style={[stylesStatus.primary]}>AIKING GROUP</Text>
            </Text>
          </Animated.View>
          <Animated.View style={[animatedStylesOpacity]}>
            <Image
              style={[styles.image_loader_item]}
              source={require('./assets/images/ProvidentFundLogo.png')}
              resizeMode="contain"
            />
          </Animated.View>
        </View>
      ) : (
        <>
          <NativeBaseProvider>
            <PaperProvider>
              <Main />
            </PaperProvider>
          </NativeBaseProvider>
          {updateApp && versionNew && (
            <View style={[styles.modal_container]}>
              <View style={[styles.modal_content]}>
                <View style={[styles.modal_header]}>
                  <Image
                    style={[styles.modal_header_img]}
                    source={require('./assets/images/logo.png')}
                    resizeMode="contain"
                  />
                  <View style={[styles.modal_header_text]}>
                    <Text style={[styles.text]}>Cập nhật ứng dụng</Text>
                    <Text style={[styles.version]}>
                      Phiên bản: v{versionNew}
                    </Text>
                  </View>
                </View>
                <View style={[styles.modal_body]}>
                  <Text style={[styles.text_body]}>
                    Phiên bản v{versionNew} đã có sẵn. Vui lòng cập nhật để có
                    trải nghiệm tốt nhất. Cảm ơn quý khách!
                  </Text>
                </View>
                <View style={[styles.modal_footer]}>
                  <Text
                    onPress={toogleUpdateApp}
                    style={[
                      styles.text_footer,
                      stylesStatus.cancelbgc,
                      stylesGeneral.mr10,
                    ]}>
                    Bỏ qua
                  </Text>
                  <Text
                    onPress={handleRedirectPlayStore}
                    style={[styles.text_footer, stylesStatus.confirmbgc]}>
                    Cập nhật
                  </Text>
                </View>
              </View>
            </View>
          )}
        </>
      )}
    </ProviderContext>
  );
};

export default App;
