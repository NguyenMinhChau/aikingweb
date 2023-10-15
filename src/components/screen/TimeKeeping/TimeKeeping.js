import React, {useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import RenderHtml from 'react-native-render-html';
import ContextMenu from 'react-native-context-menu-view';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import tw from '../../../styles/twrnc.global';
import {
  BLACK_COLOR,
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
import {useRefreshList} from '../../../utils/refreshList.utils';
import {onCopyToClipboard} from '../../../utils/copy.clipboard';
import moment from 'moment';
import 'moment/locale/vi';
import useAppContext from '../../../utils/hooks/useAppContext';
import {
  SET_DATA_PAYLOAD,
  SET_TOGGLE_PAYLOAD,
} from '../../Context/AppContext.reducer';
import {
  CHECK_IN,
  CHECK_OUT,
  GET_LIST_TIME_KEEPING_BY_MONTH_CHOOSE,
  GET_LIST_TIME_KEEPING_BY_MONTH_CURRENT,
} from '../../../services/time_keeping';
import {EMPTY_CHAR} from '../../../helpers/_empty';
import {URL_SERVER} from '@env';
import {fList} from '../../../utils/array.utils';
import {formatVND} from '../../../utils/money.utils';
import {IconCP} from '../../../utils/icon.utils';
import TextInputCP from '../../General/TextInputCP';
import LoadingScreen from '../../General/LoadingScreen';
import FastImageCP from '../../General/FastImageCP';
import useAppPermission from '../../../utils/MgnAccess/config';

const MAX_IMAGES = 1;

export default function TimeKeepingScreen({navigation}) {
  const {state, dispatch} = useAppContext();
  const {action, data_chat} = state.set_data.chat;
  const {currentUser, month: monthSalary} = state.set_data;
  const {submitting} = state.set_toggle;

  const {_id: idUser, name: displayName} = {...currentUser?.user};

  const [currentPage, setCurrentPage] = React.useState(1);
  const [openMenu, setOpenMenu] = React.useState(false);
  const [isProgress, setProgress] = React.useState(false);
  const [isScroll, setIsScroll] = React.useState(false);
  const [isProcessSend, setIsProcessSend] = React.useState(false);
  const [selectedImages, setSelectedImages] = React.useState(null);
  const contentMessageRef = React.useRef(null);
  const {LayoutAnimationConfig, ANIMATION_TYPE, ANIMATION_PROPERTY} =
    useLayoutAnimation();
  const {checkPermission, TYPE_ACCESS} = useAppPermission();
  const {width} = useWindowDimensions();

  const isCheckTimeOut = React.useMemo(() => {
    const currentTime = new Date();
    const targetTime = new Date(currentTime);

    targetTime.setHours(18, 30, 0, 0);

    return currentTime < targetTime;
  }, [openMenu]);

  const isCheckTimeIn = React.useMemo(() => {
    const currentTime = new Date();
    const startTime = new Date(currentTime);
    startTime.setHours(9, 0, 0, 0);
    return currentTime >= startTime;
  }, [openMenu]);

  const isCheckTimeWork = React.useMemo(() => {
    const currentTime = new Date();
    const startTime = new Date(currentTime);
    startTime.setHours(9, 11, 0, 0);
    const endTime = new Date(currentTime);
    endTime.setHours(18, 29, 0, 0);
    return currentTime >= startTime && currentTime <= endTime;
  }, [openMenu]);

  function kiemTraDinhDangYYY_DD(dateString) {
    var regex = /^\d{4}\/\d{2}$/;
    return regex.test(dateString);
  }

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

  // const handleScroll = ({nativeEvent}) => {
  //   const {contentOffset, layoutMeasurement, contentSize} = nativeEvent;
  //   const isCloseScroll =
  //     layoutMeasurement.height + contentOffset.y + 200 <= contentSize.height;
  //   if (isCloseScroll) {
  //     setIsScroll(true);
  //   } else {
  //     setIsScroll(false);
  //   }
  // };

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
          if (!isCheckTimeOut || !isCheckTimeIn) {
            ToastShow({
              type: TYPE_TOAST.ERROR,
              props: {
                message: `Chưa đến giờ ${item?.notify}`,
              },
            });
            handleChangeChat('action', '');
          } else {
            handleChangeChat('action', item?.value);
            ToastShow({
              type: TYPE_TOAST.INFO,
              props: {
                message: `Mời bạn tải hoặc chụp ảnh để ${
                  item?.value === '/vao' ? 'check in' : 'check out'
                }`,
              },
            });
          }
          setOpenMenu(false);
        }}
        style={tw.style('p-2 flex-row items-center gap-1 w-full')}>
        <Icon name={item?.icon} size={15} color={BLACK_COLOR} />
        <Text style={tw.style('text-[14px] font-bold text-black')}>
          {item?.label}
        </Text>
      </TouchableOpacity>
    );
  };

  const ItemChat = ({
    index,
    source,
    tagsStyles,
    item,
    time,
    styleContextMenu,
  }) => {
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
            {...styleContextMenu},
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
            {moment(time || new Date())
              .locale('vi')
              .fromNow()}
          </Text>
        </ContextMenu>
      </View>
    );
  };

  const RenderItemChat = ({item, index}) => {
    const urlImageCheckIn = `${URL_SERVER}${item?.imagePathCheckIn}`;
    const urlImageCheckOut = `${URL_SERVER}${item?.imagePathCheckOut}`;

    const timeCheckIn = item?.timeIn;
    const timeCheckOut = item?.timeOut;

    const totalHours = item?.totalHours;

    const sourceImageCheckIn = {
      html: `<div><img src="${urlImageCheckIn}" alt="image" /></div>`,
    };
    const sourceImageCheckOut = {
      html: `<div><img src="${urlImageCheckOut}" alt="image" /></div>`,
    };

    const sourceTextCheckIn = {
      html: `<div>Bạn đã check in vào: <span>${moment(timeCheckIn || new Date())
        .locale('vi')
        .format('dddd, DD/MM/YYYY HH:mm:ss')}</span></div>`,
    };
    const sourceTextNoCheckIn = {
      html: `<div>Bạn chưa check in vào ngày này</div>`,
    };
    const sourceTextCheckOut = {
      html: `<div>Bạn đã check out vào: <span>${moment(
        timeCheckOut || new Date(),
      )
        .locale('vi')
        .format('dddd, DD/MM/YYYY HH:mm:ss')}</span></div>`,
    };
    const sourceTextNoCheckOut = {
      html: `<div>Bạn chưa check out vào ngày này</div>`,
    };

    const sourceHours = {
      html: `<div>Tổng giờ làm là: ${parseFloat(totalHours)}h</div>`,
    };

    const tagsStyles = {
      span: {
        fontWeight: 'bold',
        textTransform: 'capitalize',
      },
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
        <View
          style={tw.style(
            'w-full items-center justify-center bg-slate-100 my-2',
          )}>
          <Text style={tw.style('text-slate-400 py-2 capitalize font-bold')}>
            {moment(timeCheckIn || new Date()).format('dddd, DD/MM/YYYY')}
          </Text>
        </View>
        {/* CHECK IN */}
        <View style={tw.style('flex-col gap-2')}>
          {item?.imagePathCheckIn ? (
            <>
              <ItemChat
                index={index}
                source={sourceTextCheckIn}
                item={item}
                tagsStyles={tagsStyles}
                time={timeCheckIn}
                styleContextMenu={tw.style('bg-blue-500')}
              />
              <ItemChat
                index={index}
                source={sourceImageCheckIn}
                item={item}
                tagsStyles={tagsStyles}
                time={timeCheckIn}
                styleContextMenu={tw.style('bg-blue-500')}
              />
            </>
          ) : !item?.imagePathCheckIn && isCheckTimeIn ? (
            <ItemChat
              index={index}
              source={sourceTextNoCheckIn}
              item={item}
              tagsStyles={tagsStyles}
              styleContextMenu={tw.style('bg-red-500')}
              time={timeCheckIn}
            />
          ) : null}
        </View>
        {/* CHECK OUT */}
        <View style={tw.style('flex-col gap-2')}>
          {item?.imagePathCheckOut && item?.imagePathCheckIn ? (
            <>
              <ItemChat
                index={index}
                source={sourceTextCheckOut}
                item={item}
                tagsStyles={tagsStyles}
                time={timeCheckOut}
                styleContextMenu={tw.style('bg-red-500')}
              />
              <ItemChat
                index={index}
                source={sourceImageCheckOut}
                item={item}
                tagsStyles={tagsStyles}
                time={timeCheckOut}
                styleContextMenu={tw.style('bg-red-500')}
              />
            </>
          ) : isCheckTimeOut && item?.imagePathCheckIn ? (
            <ItemChat
              index={index}
              source={sourceTextNoCheckOut}
              item={item}
              tagsStyles={tagsStyles}
              styleContextMenu={tw.style('bg-red-500')}
              time={timeCheckIn}
            />
          ) : null}
          {/* TOTAL HOURS */}
          <View style={tw.style('flex-col gap-2')}>
            {item?.imagePathCheckIn && item?.imagePathCheckOut && (
              <ItemChat
                index={index}
                source={sourceHours}
                item={item}
                tagsStyles={tagsStyles}
                styleContextMenu={tw.style('bg-blue-500')}
              />
            )}
          </View>
        </View>
      </View>
    );
  };

  const handleChoosePhoto = async () => {
    const options = {
      title: 'Select Photo',
      mediaType: 'photo',
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
          const image = response?.assets?.[0];
          const body = {
            fileBinary: image.base64,
            nameFile: image.fileName || `image_${Date.now()}`,
          };
          handleChangeChat('image64', `data:image/png;base64,${image.base64}}`);
          // dispatch(SET_TOGGLE_PAYLOAD({key: 'submitting', value: true}));
          if (action && action === '/vao') {
            CallAPICheckIn(body);
          } else {
            CallAPICheckOut(body);
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
      includeBase64: true,
      quality: 1,
    };
    checkPermission(TYPE_ACCESS.CAMERA, false);
    await launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.error) {
        console.log('Camera Error: ', response.error);
      } else {
        const image = response?.assets?.[0];
        if (image) {
          const body = {
            fileBinary: image.base64,
            nameFile: image.fileName || `image_${Date.now()}`,
          };
          handleChangeChat('image64', `data:image/png;base64,${image.base64}}`);
          dispatch(SET_TOGGLE_PAYLOAD({key: 'submitting', value: true}));
          if (action && action === '/vao') {
            CallAPICheckIn(body);
          } else {
            CallAPICheckOut(body);
          }
        }
      }
    });
  };

  const CallAPI = () => {
    GET_LIST_TIME_KEEPING_BY_MONTH_CURRENT({
      idUser,
      state,
      dispatch,
    });
  };

  const CallAPICheckIn = body => {
    CHECK_IN({
      idUser,
      dispatch,
      state,
      body,
      setSelectedImages,
    });
  };
  const CallAPICheckOut = body => {
    CHECK_OUT({
      idUser,
      dispatch,
      state,
      body,
      setSelectedImages,
    });
  };
  const handleViewSalary = () => {
    if (!kiemTraDinhDangYYY_DD(monthSalary)) {
      ToastShow({
        type: TYPE_TOAST.ERROR,
        props: {
          message: 'Định dạng tháng không đúng!',
        },
      });
      return;
    }
    dispatch(
      SET_TOGGLE_PAYLOAD({
        key: 'submitting',
        value: true,
      }),
    );
    GET_LIST_TIME_KEEPING_BY_MONTH_CHOOSE({
      idUser,
      dispatch,
      state,
      month: monthSalary,
      setOpenMenu,
    });
  };

  useEffect(() => {
    CallAPI();
  }, []);

  React.useEffect(() => {
    scrollToBottom();
  }, [data_chat]);

  const {cards: dataChat, salary, month} = {...data_chat};

  const {refreshing, onRefresh} = useRefreshList(CallAPI);

  return (
    <>
      {submitting ? (
        <LoadingScreen />
      ) : (
        <View style={tw`flex-1 flex-col bg-white`}>
          <Banner navigation={navigation} />
          <View style={tw.style('flex-1 bg-white')}>
            <View style={tw.style('px-2 py-1 flex-col bg-white  shadow-md')}>
              <View style={tw.style('flex-row')}>
                <Text style={tw.style('text-black')}>Xin chào, </Text>
                <Text style={tw.style('text-black italic font-bold')}>
                  {displayName || EMPTY_CHAR}{' '}
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
              <View style={tw.style('flex-row')}>
                <Text style={tw.style('text-black')}>
                  Tổng lương tháng {month}:{' '}
                </Text>
                <Text style={tw.style('text-green-500 italic font-bold')}>
                  {formatVND(salary) || 0}{' '}
                </Text>
              </View>
            </View>
            <View
              style={tw.style('flex-1 relative p-2')}
              onTouchStart={() => {
                setOpenMenu(false);
              }}>
              {fList(dataChat).length > 0 ? (
                <FlatList
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                  }
                  data={dataChat}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={RenderItemChat}
                  onEndReached={handleLoadMore}
                  // onScroll={handleScroll}
                  scrollEventThrottle={16}
                  onEndReachedThreshold={0.5}
                  ref={contentMessageRef}
                  contentContainerStyle={tw.style('flex-grow gap-2')}
                />
              ) : (
                <ScrollView
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                  }
                  contentContainerStyle={tw.style(
                    'flex-1 items-center justify-center',
                  )}>
                  <FastImageCP
                    uriLocal={require('../../../assets/images/no_data.png')}
                    resizeMode="contain"
                    style={tw.style('w-full h-[200px]')}
                  />
                  <Text
                    style={tw.style(
                      'text-[14px] text-black text-center italic',
                    )}>
                    Không có dữ liệu lương tháng {month}
                  </Text>
                </ScrollView>
              )}
              {fList(dataChat).length > 0 && (
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={tw.style(
                    'bg-orange-400 absolute right-[20px] bottom-[50px] items-center justify-center border border-orange-500 rounded-full w-[50px] h-[50px]',
                  )}
                  onPress={scrollToBottom}>
                  <Icon name="arrow-down" size={20} color={WHITE_COLOR} />
                </TouchableOpacity>
              )}
            </View>
            <View style={tw.style('px-2 py-1 bg-white shadow-lg')}>
              <View style={tw.style('w-full flex-row gap-1')}>
                <View
                  style={tw.style(`${openMenu || !action ? 'w-full' : ''}`)}>
                  <ButtonCP
                    text={openMenu ? 'Ẩn menu' : 'Mở menu'}
                    styleContainer={tw.style('w-full min-w-[100px]')}
                    styleText={tw.style('text-[14px]')}
                    colorBG={PRIMARY_COLOR}
                    colorBorder={PRIMARY_COLOR}
                    onPress={toggleMenu}
                    variant="outlined"
                  />
                  {openMenu && (
                    <>
                      <FlatList
                        data={DATA_MENU}
                        renderItem={RenderMenuItem}
                        contentContainerStyle={tw.style('flex-grow')}
                        style={tw.style(
                          'w-full shadow-lg bg-white rounded-tr-md rounded-tl-md',
                        )}
                        keyExtractor={(item, index) => index.toString()}
                      />
                      <View
                        style={tw.style(
                          'w-full shadow-lg bg-white rounded-br-md rounded-bl-md flex-col p-2',
                        )}>
                        <View style={tw.style('flex-row items-center gap-2')}>
                          <View style={tw.style('flex-row items-end gap-1')}>
                            <IconCP
                              name="calendar-outline"
                              size={20}
                              color={BLACK_COLOR}
                            />
                            <Text
                              style={tw.style(
                                'font-bold text-black text-[14px]',
                              )}>
                              Xem lương theo tháng
                            </Text>
                          </View>
                          <TextInputCP
                            name="month"
                            value={monthSalary}
                            onChange={val =>
                              dispatch(
                                SET_DATA_PAYLOAD({key: 'month', value: val}),
                              )
                            }
                            outlineColor={PRIMARY_COLOR}
                            placeholder="Ví dụ: 2023/09"
                            style={tw.style(
                              'flex-1 h-[20px] justify-center w-full',
                            )}
                            outlinedStyle={tw`border border-gray-400`}
                            contentStyle={tw.style('px-1 py-0')}
                          />
                        </View>
                        <ButtonCP
                          text="Xem lương"
                          onPress={handleViewSalary}
                          colorBorder={WARNING_COLOR}
                          variant="outlined"
                        />
                      </View>
                    </>
                  )}
                </View>
                {!openMenu && action && (
                  <>
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
                  </>
                )}
              </View>
            </View>
          </View>
        </View>
      )}
    </>
  );
}
