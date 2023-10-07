import React from 'react';
import {View, TouchableOpacity, Text, Dimensions, FlatList} from 'react-native';
import Banner from '../Banner/Banner';
import {SliderBox} from 'react-native-image-slider-box';
import tw from '../../../styles/twrnc.global';
import {Iconify} from 'react-native-iconify';
import {CARD_DATA} from './Dashboard.data';
import {
  SET_DATA_PAYLOAD,
  SET_TOGGLE_PAYLOAD,
} from '../../Context/AppContext.reducer';
import useAppContext from '../../../utils/hooks/useAppContext';
import {
  BLACK_COLOR,
  MAIN_TEXT_COLOR,
  PRIMARY_COLOR,
  WHITE_COLOR,
} from '../../../styles/colors.global';
import {isValidToken} from '../../../services/jwt';
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
import {IconCP} from '../../../utils/icon.utils';
import FastImage from 'react-native-fast-image';

const IMAGE_SLIDER = [
  require('../../../assets/images/slider_images/image_six.png'),
  require('../../../assets/images/slider_images/image_seven.png'),
  require('../../../assets/images/slider_images/image_eight.png'),
  require('../../../assets/images/slider_images/image_night.png'),
  require('../../../assets/images/slider_images/image_one.png'),
  require('../../../assets/images/slider_images/image_two.png'),
];

const DashboardPage = ({navigation, route}) => {
  const {dispatch, state} = useAppContext();

  const {data} = {...route.params};

  const {accessToken, loader_slider_used, currentUser} = state.set_data;
  const {colors} = useGetColorThemeDisplay();

  const {role} = {...currentUser?.user};

  // ?! CHECK CURRENT USER AND ACCESS TOKEN
  React.useEffect(() => {
    const initialize = async () => {
      const tokenAccess = accessToken?.accessToken;
      try {
        if (currentUser?.user?.email && isValidToken(tokenAccess)) {
          AUTH_RETRIEVE({
            dispatch,
            state,
            data: currentUser,
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

  const handleRedirect = (router, group) => {
    navigation.navigate({
      name: router,
      params: {
        data: data,
      },
    });
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'admin',
        value: {
          ...state.set_data.admin,
          group: group,
        },
      }),
    );
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
          `shadow-md bg-white rounded-lg p-2 justify-center items-center gap-1`,
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
            ? handleRedirect(item?.router, item?.group)
            : handleCardPress(item.id);
        }}>
        <IconCP
          name={item?.iconName}
          size={25}
          color={BLACK_COLOR}
          typeIcon={item?.typeIcon}
        />
        <Text style={tw`font-bold text-black text-[14px] mt-1`}>
          {item.title}
        </Text>
        <Text style={tw`text-gray-400 text-[13px]`}>{item.category}</Text>
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
        <View style={tw`flex-1 justify-start items-start bg-white`}>
          <Banner navigation={navigation} />
          <View
            style={tw.style('h-[30%] w-full', {
              backgroundColor: WHITE_COLOR,
            })}>
            <SliderBox
              ImageComponent={FastImage}
              images={IMAGE_SLIDER}
              sliderBoxHeight={200}
              paginationBoxVerticalPadding={20}
              autoplay
              autoplayInterval={5000}
              resizeMethod={'resize'}
              // resizeMode={'contain'}
              resizeMode={'cover'}
              paginationBoxStyle={tw.style(
                'absolute bottom-0 p-0 m-0 items-center justify-center py-4 self-center',
              )}
              dotColor={PRIMARY_COLOR}
              inactiveDotColor={tw.color('gray-400')}
              dotStyle={tw.style('h-1 w-4 rounded-lg')}
              ImageComponentStyle={tw.style(
                'w-[97%] my-2 bg-white shadow rounded-lg',
              )}
              imageLoadingColor={PRIMARY_COLOR}
            />
          </View>
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
              data={CARD_DATA(role)}
              contentContainerStyle={{
                flexGrow: 1,
                justifyContent: 'flex-start',
                marginTop: 16,
                paddingBottom: 50,
                gap: 10,
                paddingHorizontal: 12,
                paddingVertical: 8,
              }}
              numColumns={CARD_DATA(role).length === 2 ? 1 : 2}
              keyExtractor={item => item.id}
              renderItem={RenderFlatList}
            />
          </View>
        </View>
      )}
    </>
  );
};

export default DashboardPage;
