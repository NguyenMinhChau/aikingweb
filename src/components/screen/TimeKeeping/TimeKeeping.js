import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  useWindowDimensions,
} from 'react-native';
import RenderHtml from 'react-native-render-html';
import ContextMenu from 'react-native-context-menu-view';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import tw from '../../../styles/twrnc.global';
import {
  BLACK_COLOR,
  MAIN_COLOR,
  PRIMARY_COLOR,
  WARNING_COLOR,
  WHITE_COLOR,
} from '../../../styles/colors.global';
import Banner from '../Banner/Banner';
import ButtonCP from '../../General/ButtonCP';
import {useLayoutAnimation} from '../../../utils/LayoutAnimation';
import {DATA_MENU} from './config';
import {ToastShow} from '../../../utils/Toast';
import {TYPE_TOAST} from '../../../utils/toast.config';
import {requestCameraPermission} from '../../../utils/camera.permission';
import {useRefreshList} from '../../../utils/refreshList.utils';
import {dd_mm_yy_hh_mm_ss} from '../../../utils/TimerFormat';
import {onCopyToClipboard} from '../../../utils/copy.clipboard';
import moment from 'moment';
import 'moment/locale/vi';
import useAppContext from '../../../utils/hooks/useAppContext';
import {SET_DATA_PAYLOAD} from '../../Context/AppContext.reducer';
import {CHECK_IN, CHECK_OUT} from '../../../services/time_keeping';

const MAX_IMAGES = 1;

export default function TimeKeepingScreen({navigation}) {
  const {state, dispatch} = useAppContext();
  const {content, action, image, data_chat, image64} = state.set_data.chat;
  const {currentUser} = state.set_data;

  const {_id: idUser} = {...currentUser?.user};

  const [currentPage, setCurrentPage] = React.useState(1);
  const [openMenu, setOpenMenu] = React.useState(false);
  const [isProgress, setProgress] = React.useState(false);
  const [isScroll, setIsScroll] = React.useState(false);
  const [isProcessSend, setIsProcessSend] = React.useState(false);
  const [selectedImages, setSelectedImages] = React.useState(null);
  const contentMessageRef = React.useRef(null);
  const {LayoutAnimationConfig, ANIMATION_TYPE, ANIMATION_PROPERTY} =
    useLayoutAnimation();

  const {onRefresh, refreshing} = useRefreshList();
  const {width} = useWindowDimensions();

  const toggleMenu = () => {
    LayoutAnimationConfig(
      300,
      ANIMATION_TYPE.EASE_IN_EASE_OUT,
      ANIMATION_PROPERTY.OPACITY,
    );
    setOpenMenu(!openMenu);
  };

  const handleChangeChat = (key, value) => {
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'chat',
        value: {
          ...state.set_data.chat,
          [key]: value,
        },
      }),
    );
  };

  const scrollToBottom = () => {
    if (contentMessageRef?.current) {
      contentMessageRef?.current?.scrollToEnd({animated: true});
    }
  };

  const handleScroll = ({nativeEvent}) => {
    const {contentOffset, layoutMeasurement, contentSize} = nativeEvent;
    const isCloseScroll =
      layoutMeasurement.height + contentOffset.y + 200 <= contentSize.height;
    if (isCloseScroll) {
      setIsScroll(true);
    } else {
      setIsScroll(false);
    }
  };

  const handleLoadMore = () => {
    if (!isProcessSend && currentPage < Math.floor(data_chat.length / 10)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const RenderMenuItem = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          handleChangeChat('action', item?.value);
          ToastShow({
            type: TYPE_TOAST.INFO,
            propsMessage: {
              message: `Mời bạn tải/chụp ảnh để ${
                item?.value === '/vao' ? 'checkIn' : 'checkOut'
              }`,
              action: 'RenderMenuItem',
              pathFile: 'components/screen/TimeKeeping/TimeKeeping.js',
            },
          });
          setOpenMenu(false);
        }}
        style={tw.style('p-2 flex-row items-center gap-1')}>
        <Icon name={item?.icon} size={15} color={BLACK_COLOR} />
        <Text style={tw.style('text-[14px] font-bold text-black')}>
          {item?.label}
        </Text>
      </TouchableOpacity>
    );
  };

  const ItemChat = ({index, source, tagsStyles, item}) => {
    return (
      <View
        key={index}
        style={tw.style(
          'rounded-t-[12px] overflow-hidden min-w-1/2 max-w-[70%]',
          {
            alignSelf: index % 2 === 0 ? 'flex-end' : 'flex-start',
            borderBottomLeftRadius: index % 2 === 0 ? 12 : 3,
            borderBottomRightRadius: index % 2 === 0 ? 3 : 12,
          },
        )}>
        <ContextMenu
          style={tw.style(
            'bg-gray-500 p-1 pt-0',
            index % 2 === 0 ? `bg-[${PRIMARY_COLOR}]` : 'bg-gray-500',
            {},
          )}
          actions={[{title: 'Sao chép'}]}
          onPress={e => {
            if (e.nativeEvent.name === 'Sao chép') {
              onCopyToClipboard('Copied!');
            }
          }}>
          <View style={tw.style('flex-col')}>
            <RenderHtml
              contentWidth={width}
              source={source}
              tagsStyles={tagsStyles}
            />
          </View>
          <Text
            style={tw.style('text-[12px] text-gray-200', {
              textAlign: 'right',
            })}>
            {moment(new Date()).locale('vi').fromNow()}
          </Text>
        </ContextMenu>
      </View>
    );
  };

  const RenderItemChat = ({item, index}) => {
    const sourceAction = {
      html: `<div>/vao ajgshajhdksahdkasjldkasjdhaskjdhkashdksajhdkjashkasjdjaskdkasjshjdhsjk</div>`,
    };
    const sourceContent = {
      html: `<div>Mời bạn upload hình ảnh!</div>`,
    };
    const sourceImage = {
      html: `<div><img src="${image64}" alt="image" /></div>`,
    };
    const tagsStyles = {
      div: {
        fontSize: 14,
        lineHeight: 25,
        color: WHITE_COLOR,
        letterSpacing: 1,
      },
      img: {
        width: '100%',
        height: '100%',
        borderRadius: 12,
      },
    };
    return (
      <View style={tw.style('flex-col gap-1')}>
        {/* <ItemChat
          index={index}
          source={sourceAction}
          item={item}
          tagsStyles={tagsStyles}
        />
        <ItemChat
          index={index}
          source={sourceContent}
          item={item}
          tagsStyles={tagsStyles}
        /> */}
        <ItemChat
          index={index}
          source={sourceImage}
          item={item}
          tagsStyles={tagsStyles}
        />
      </View>
    );
  };

  const handleChoosePhoto = async () => {
    const options = {
      title: 'Select Photo',
      mediaType: 'photo',
      maxWidth: 500,
      maxHeight: 500,
      multiple: true,
      selectionLimit: MAX_IMAGES,
      includeBase64: true,
      quality: 1,
    };
    await launchImageLibrary(options, async response => {
      try {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else {
          const image = response.assets[0];
          const body = {
            fileBinary: image.base64,
            nameFile: image.fileName || `image_${Date.now()}`,
          };
          handleChangeChat('image64', `data:image/png;base64,${image.base64}}`);
          setSelectedImages(body);
          setProgress(true);
          if (action && action === '/vao') {
            CallAPICheckIn();
          } else {
            CallAPICheckOut();
          }
        }
      } catch (error) {
        console.log(error);
      }
    });
  };

  const handleTakePhoto = async () => {
    const options = {
      title: 'Take Photo',
      maxWidth: 500,
      maxHeight: 500,
      includeBase64: true,
      quality: 1,
    };

    await requestCameraPermission();

    await launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.error) {
        console.log('Camera Error: ', response.error);
      } else {
        const image = response.assets[0];
        if (image) {
          const body = {
            fileBinary: image.base64,
            nameFile: image.fileName || `image_${Date.now()}`,
          };
          handleChangeChat('image64', `data:image/png;base64,${image.base64}}`);
          setSelectedImages(body);
          setProgress(true);
          if (action && action === '/vao') {
            CallAPICheckIn();
          } else {
            CallAPICheckOut();
          }
        } else {
          ToastShow({
            type: TYPE_TOAST.ERROR,
            propsMessage: {
              message: 'Đã xảy ra vấn đề khi mở thiết bị chụp ảnh!',
              action: 'handleTakePhoto',
              pathFile:
                'components/screen/ImageProcessing/PhotoSelectionPage.js',
            },
          });
        }
      }
    });
  };

  const CallAPICheckIn = () => {
    CHECK_IN({
      idUser,
      setProgress,
      body: selectedImages,
    });
  };
  const CallAPICheckOut = () => {
    CHECK_OUT({
      idUser,
      setProgress,
      body: selectedImages,
    });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [data_chat]);

  return (
    <SafeAreaView style={tw`flex-1 flex-col bg-[${MAIN_COLOR}]`}>
      <Banner navigation={navigation} />
      <View style={tw.style('flex-1 bg-white')}>
        <View style={tw.style('px-2 py-1 flex-col bg-white  shadow-md')}>
          <View style={tw.style('flex-row')}>
            <Text style={tw.style('text-black')}>Xin chào, </Text>
            <Text style={tw.style('text-black italic font-bold')}>
              Nguyễn Văn A.{' '}
            </Text>
          </View>
          <View style={tw.style('flex-row')}>
            <Text style={tw.style('text-black')}>Đội ngũ </Text>
            <Text style={tw.style('text-black font-bold italic')}>
              Aiking Group{' '}
            </Text>
            <Text style={tw.style('text-black w-1 flex-1')}>
              chúc bạn ngày mới tốt lành 🍀
            </Text>
          </View>
        </View>
        <View
          style={tw.style('flex-1 relative p-2')}
          onTouchStart={() => {
            setOpenMenu(false);
          }}>
          {data_chat.length > 0 ? (
            <FlatList
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              data={data_chat}
              keyExtractor={item => item.toString()}
              renderItem={RenderItemChat}
              onEndReached={handleLoadMore}
              onScroll={handleScroll}
              scrollEventThrottle={16}
              onEndReachedThreshold={0.5}
              ref={contentMessageRef}
              contentContainerStyle={tw.style('flex-grow gap-2')}
            />
          ) : (
            <View style={tw.style('flex-1 items-center justify-center')}>
              <Text
                style={tw.style('text-[14px] text-black text-center italic')}>
                Không có tin nhắn...
              </Text>
            </View>
          )}
          {isScroll && data_chat.length > 0 && (
            <TouchableOpacity
              activeOpacity={0.7}
              style={tw.style(
                'bg-orange-400 absolute right-[20px] bottom-[12px] items-center justify-center border border-orange-500 rounded-full w-[50px] h-[50px]',
              )}
              onPress={scrollToBottom}>
              <Icon name="arrow-down" size={20} color={WHITE_COLOR} />
            </TouchableOpacity>
          )}
        </View>
        <View style={tw.style('px-2 py-1 bg-white shadow-lg')}>
          <View style={tw.style('w-full flex-row gap-1')}>
            <View style={tw.style('relative')}>
              <ButtonCP
                text="Menu"
                styleContainer={tw.style('w-[100px]')}
                styleText={tw.style('text-[14px]')}
                colorBG={WARNING_COLOR}
                colorBorder={WARNING_COLOR}
                onPress={toggleMenu}
                variant="outlined"
              />
              {openMenu && (
                <FlatList
                  data={DATA_MENU}
                  renderItem={RenderMenuItem}
                  contentContainerStyle={tw.style('flex-grow')}
                  style={tw.style(
                    'absolute top-[-130px] left-0 w-full min-w-[200px] max-w-[100%] max-h-[120px] min-h-[120px] shadow-lg bg-white rounded-md overflow-hidden',
                  )}
                  keyExtractor={(item, index) => index.toString()}
                />
              )}
            </View>
            <ButtonCP
              text="Tải hình ảnh"
              styleContainer={tw.style('flex-1')}
              styleText={tw.style('text-[14px]')}
              colorBG={PRIMARY_COLOR}
              colorBorder={PRIMARY_COLOR}
              onPress={handleChoosePhoto}
            />
            <ButtonCP
              text="Chụp ảnh"
              styleContainer={tw.style('flex-1')}
              styleText={tw.style('text-[14px]')}
              colorBG={PRIMARY_COLOR}
              colorBorder={PRIMARY_COLOR}
              onPress={handleTakePhoto}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
