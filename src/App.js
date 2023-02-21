/* eslint-disable no-unused-vars */
import React, {useEffect} from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {NativeBaseProvider} from 'native-base';
import {ProviderContext} from './app/';
import {Main} from './navigation';
import codePush from 'react-native-code-push';
import {Image, Text, View, BackHandler} from 'react-native';
import stylesStatus from './styles/Status';
import stylesGeneral from './styles/General';
import styles from './styles/AppCss';

const CODE_PUSH_OPTIONS = {
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
  // installMode: codePush.InstallMode.IMMEDIATE,
};

const App = () => {
  const [updateApp, setUpdateApp] = React.useState(false);
  const [versionNew, setVersionNew] = React.useState(null);
  useEffect(() => {
    const init = async () => {
      const update = await codePush.checkForUpdate();
      if (update) {
        codePush.sync({
          updateDialog: true,
          installMode: codePush.InstallMode.IMMEDIATE,
        });
        setVersionNew(update?.appVersion);
        setUpdateApp(true);
      } else {
        codePush.sync({
          updateDialog: false,
          installMode: codePush.InstallMode.IMMEDIATE,
        });
        setUpdateApp(false);
        console.log('The app is up to date.');
      }
    };
    // init();
  }, []);
  const toogleUpdateApp = () => {
    setUpdateApp(!updateApp);
  };
  const handleExitApp = () => {
    BackHandler.exitApp();
  };
  return (
    <ProviderContext>
      <NativeBaseProvider>
        <PaperProvider>
          <Main />
        </PaperProvider>
      </NativeBaseProvider>
      {/* {updateApp && versionNew && (
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
                <Text style={[styles.version]}>Phiên bản: v{versionNew}</Text>
              </View>
            </View>
            <View style={[styles.modal_body]}>
              <Text style={[styles.text_body]}>
                Phiên bản v{versionNew} đã có sẵn. Vui lòng cập nhật để có trải
                nghiệm tốt nhất bằng cách đóng và trở lại ứng dụng, Cảm ơn quý
                khách!
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
                onPress={handleExitApp}
                style={[styles.text_footer, stylesStatus.confirmbgc]}>
                Thoát
              </Text>
            </View>
          </View>
        </View>
      )} */}
    </ProviderContext>
  );
};

export default codePush(CODE_PUSH_OPTIONS)(App);
