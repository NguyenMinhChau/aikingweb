import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  Dimensions,
  SafeAreaView,
  FlatList,
} from 'react-native';
import Banner from '../Banner/Banner';
import tw from '../../../styles/twrnc.global';
import {Iconify} from 'react-native-iconify';
import {CARD_DATA} from './Dashboard.data';
import {SET_TOGGLE_PAYLOAD} from '../../Context/AppContext.reducer';
import useAppContext from '../../../utils/hooks/useAppContext';
import {
  MAIN_COLOR,
  MAIN_TEXT_COLOR,
  PRIMARY_COLOR,
} from '../../../styles/colors.global';
import {isValidToken, processToken} from '../../../services/jwt';
import {AUTH_RETRIEVE} from '../../../services/auth';
import {SCREEN_NAVIGATE} from '../../routersConfig/General.config';
import {ToastShow} from '../../../utils/Toast';
import {TYPE_TOAST} from '../../../utils/toast.config';
import {useGetColorThemeDisplay} from '../../../utils/appearance.utils';
import LoaderSliderCP from '../../LoaderApp/LoaderSlider';
import {
  getAsyncCacheLoaderSliderUsed,
  setAsyncCacheLoaderSliderUsed,
} from '../../../utils/cache.services';

const DashboardPage = ({navigation, route}) => {
  const {dispatch, state} = useAppContext();

  const {data} = {...route.params};

  const {accessToken, loader_slider_used} = state.set_data;
  const {colors} = useGetColorThemeDisplay();

  // ?! CHECK CURRENT USER AND ACCESS TOKEN
  React.useEffect(() => {
    const initialize = async () => {
      getAsyncCacheLoaderSliderUsed(dispatch);
      const tokenAccess = accessToken?.accessToken;
      try {
        if (tokenAccess && isValidToken(tokenAccess)) {
          const user = await processToken(
            tokenAccess,
            false,
            navigation,
            dispatch,
          );
          AUTH_RETRIEVE({
            dispatch,
            state,
            data: user,
            accessToken: tokenAccess,
          });
          navigation.navigate(SCREEN_NAVIGATE.Bottom_Tab_Screen);
        } else {
          AUTH_RETRIEVE({dispatch, state, data: null, accessToken: null});
          ToastShow({
            type: TYPE_TOAST.INFO,
            propsMessage: {
              message: 'Hết phiên đăng nhập!',
              action: 'isValidToken',
              pathFile: 'services/jwt.js',
            },
          });
          navigation.navigate(SCREEN_NAVIGATE.Login_Screen);
        }
      } catch (err) {
        AUTH_RETRIEVE({dispatch, state, data: null, accessToken: null});
        navigation.navigate(SCREEN_NAVIGATE.Login_Screen);
      }
    };
    initialize();
  }, []);

  const handleCardPress = cardId => {
    console.log('Card ID: ', cardId);
    ToastShow({
      type: TYPE_TOAST.INFO,
      propsMessage: {
        message: 'Giao diện đang được phát triển!',
        action: 'handleCardPress',
        pathFile: 'components/screen/Dashboard/Dashboard.js',
      },
    });
  };

  const handleRedirect = router => {
    navigation.navigate({
      name: router,
      params: {
        data: data,
      },
    });
  };

  // ?! DIVIDED COLUMNS FOR LAYOUT (2 COLUMNS)
  const screenWidth = Dimensions.get('window').width;
  const widthEventUsed = screenWidth / 2 - 8 * 2;
  // ?!

  const RenderFlatList = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        key={item.id}
        style={tw.style(
          `border-2 border-[${PRIMARY_COLOR}] bg-white rounded-lg p-2 justify-center items-center gap-1`,
          {
            width: widthEventUsed,
            marginLeft: index % 2 === 0 ? 0 : 8,
          },
        )}
        onPress={() => {
          dispatch(
            SET_TOGGLE_PAYLOAD({
              key: 'isVisible_menu',
              value: false,
            }),
          );
          item?.router
            ? handleRedirect(item?.router)
            : handleCardPress(item.id);
        }}>
        {item?.icon ? (
          item?.icon
        ) : (
          <Image source={item.image} style={tw`w-[30px] h-[30px]`} />
        )}
        <Text style={tw`font-bold text-black text-[14px] mt-1`}>
          {item.title}
        </Text>
        <Text style={tw`text-gray-400 text-[13px]`}>{item.category}</Text>
        {/* <Image source={require('../../../assets/images/arrow.png')}></Image> */}
      </TouchableOpacity>
    );
  };

  return (
    <>
      {loader_slider_used?.state ? (
        <LoaderSliderCP
          redirect={navigation}
          onClick={async () => {
            await setAsyncCacheLoaderSliderUsed({state: false});
            await getAsyncCacheLoaderSliderUsed(dispatch);
          }}
        />
      ) : (
        <SafeAreaView
          style={tw`flex-1 justify-start items-start bg-[${MAIN_COLOR}]`}>
          <Banner navigation={navigation} />

          <View
            style={tw.style(`flex-1 w-full `, {
              backgroundColor: colors.background,
            })}>
            <View style={tw`flex-row items-center gap-1 mt-4 mx-2`}>
              <Text style={tw`text-[${MAIN_TEXT_COLOR}] font-bold text-[20px]`}>
                Công cụ nổi bật{' '}
              </Text>
              <Iconify
                icon="tabler:bulb-filled"
                size={25}
                color={MAIN_TEXT_COLOR}
              />
            </View>

            <FlatList
              showsVerticalScrollIndicator={false}
              data={CARD_DATA('admin')}
              contentContainerStyle={{
                flexGrow: 1,
                justifyContent: 'flex-start',
                marginTop: 16,
                paddingBottom: 50,
                gap: 7,
                paddingHorizontal: 12,
              }}
              numColumns={CARD_DATA('admin').length === 2 ? 1 : 2}
              keyExtractor={item => item.id}
              renderItem={RenderFlatList}
            />
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

export default DashboardPage;
