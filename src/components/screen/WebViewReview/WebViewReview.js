import React from 'react';
import {
  View,
  ScrollView,
  Image,
  ActivityIndicator,
  Platform,
  Text,
  Dimensions,
} from 'react-native';
import {WebView} from 'react-native-webview';
import tw from '../../../styles/twrnc.global';
import BannerNestedScreen from '../../General/BannerNestedScreen';
import ButtonCP from '../../General/ButtonCP';
import {PRIMARY_COLOR} from '../../../styles/colors.global';

export default function WebViewReviewScreen({navigation, route}) {
  const [onLoad, setOnLoad] = React.useState(true);
  const webview = React.useRef(null);
  const {url, title, sourceHTML} = {...route?.params};

  let urlWebView =
    Platform.OS === 'ios'
      ? url
      : 'https://docs.google.com/gview?embedded=true&url=' + url;

  const reload = () => webview.current.reload();
  return (
    <View style={tw.style(`flex-1 flex-col bg-white`)}>
      <BannerNestedScreen navigation={navigation} title={title} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw.style('flex-grow flex-1 bg-white')}>
        <View
          style={tw.style(
            'w-full flex-1 items-center justify-center bg-white',
            {
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').height,
            },
          )}>
          {url || sourceHTML ? (
            <View style={tw.style('flex-1 w-full h-full bg-white')}>
              <WebView
                ref={webview}
                source={sourceHTML ? sourceHTML : {uri: urlWebView}}
                onLoad={() => {
                  setOnLoad(false);
                }}
                style={tw.style(`flex-1`)}
                originWhitelist={['*']}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                allowFileAccess={true}
                scalesPageToFit={true}
                thirdPartyCookiesEnabled={true}
                startInLoadingState={true}
                useWebKit={true}
                renderLoading={() => <Loading />}
                renderError={() => <Error reload={reload} />}
              />
            </View>
          ) : (
            <Image
              source={require('../../../assets/images/no_data.png')}
              resizeMode="contain"
              style={tw.style('w-full h-[400px]')}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
}
const Loading = () => {
  return (
    <View
      style={tw.style(
        'absolute top-0 right-0 left-0 bottom-0 flex-1 items-center justify-center mb-auto mt-auto mr-auto ml-auto bg-white',
      )}>
      <ActivityIndicator size="small" color={PRIMARY_COLOR} />
      <Text style={tw.style('text-[15px] mb-3 text-black')}>
        Đang tải, vui lòng chờ
      </Text>
    </View>
  );
};
const Error = ({reload}) => {
  return (
    <View
      style={tw.style(
        'absolute top-0 right-0 left-0 bottom-0 flex-1 items-center justify-center mb-auto mt-auto mr-auto ml-auto bg-white',
      )}>
      <Text style={tw.style('text-[15px] mb-3 text-black')}>
        Đã xảy ra lỗi khi tải file
      </Text>
      <ButtonCP
        text="Tải lại"
        colorBG={PRIMARY_COLOR}
        colorBorder={PRIMARY_COLOR}
        styleContainer={tw.style('w-[150px] h-[45px]')}
        styleText={tw.style('text-base font-semibold')}
      />
    </View>
  );
};
