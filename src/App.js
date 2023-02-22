import React, {useEffect} from 'react';
import {Image, Text, View, Linking} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {NativeBaseProvider} from 'native-base';
import {ProviderContext} from './app/';
import {Main} from './navigation';
import VersionCheck from 'react-native-version-check';
import stylesStatus from './styles/Status';
import stylesGeneral from './styles/General';
import styles from './styles/AppCss';
import {URL_APP_PLAY_STORE, PACKAGE_NAME_APP} from '@env';

const App = () => {
  const [updateApp, setUpdateApp] = React.useState(false);
  const [versionNew, setVersionNew] = React.useState(null);
  useEffect(() => {
    const init = async () => {
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
    };
    init();
  }, []);
  const toogleUpdateApp = () => {
    setUpdateApp(!updateApp);
  };
  const handleRedirectPlayStore = () => {
    Linking.openURL(`${URL_APP_PLAY_STORE}`);
  };
  return (
    <ProviderContext>
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
                <Text style={[styles.version]}>Phiên bản: v{versionNew}</Text>
              </View>
            </View>
            <View style={[styles.modal_body]}>
              <Text style={[styles.text_body]}>
                Phiên bản v{versionNew} đã có sẵn. Vui lòng cập nhật để có trải
                nghiệm tốt nhất. Cảm ơn quý khách!
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
    </ProviderContext>
  );
};

export default App;
