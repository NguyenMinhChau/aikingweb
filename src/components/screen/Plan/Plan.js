import React, {useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import tw from '../../../styles/twrnc.global';
import {
  CRITICAL_COLOR,
  MAIN_COLOR,
  MAIN_TEXT_COLOR,
  PRIMARY_COLOR,
  WARNING_COLOR,
} from '../../../styles/colors.global';
import Banner from '../Banner/Banner';
import useAppContext from '../../../utils/hooks/useAppContext';
import TextInputCP from '../../General/TextInputCP';
import {
  SET_DATA_PAYLOAD,
  SET_TOGGLE_PAYLOAD,
} from '../../Context/AppContext.reducer';
import ButtonCP from '../../General/ButtonCP';
import {dd_mm_yy_hh_mm_ss} from '../../../utils/TimerFormat';
import {SCREEN_NAVIGATE} from '../../routersConfig/General.config';
import ModalCP from '../../General/ModalCP';
import {ToastShow} from '../../../utils/Toast';
import {TYPE_TOAST} from '../../../utils/toast.config';
import {requestCameraPermission} from '../../../utils/camera.permission';
import {CREATE_NEW_PLAN, GET_LIST_POST_PLAN} from '../../../services/admin';
import LoadingScreen from '../../General/LoadingScreen';
import {URL_SERVER} from '@env';
import {fList} from '../../../utils/array.utils';
import {useRefreshList} from '../../../utils/refreshList.utils';

const MAX_IMAGES = 1;

export default function PlanCP({navigation}) {
  const {state, dispatch} = useAppContext();
  const {content, title, sub_title, image64} = state.set_data.plan_post;
  const {list_post_plan} = state.set_data.admin;
  const {search, currentUser} = state.set_data;
  const {submitting} = state.set_toggle;

  const {role} = {...currentUser?.user};

  const [toggleModal, setToggleModal] = React.useState(false);
  const [isProgress, setProgress] = React.useState(false);
  const [selectedImages, setSelectedImages] = React.useState(null);

  const handleChangePlan = (key, value) => {
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'plan_post',
        value: {
          ...state.set_data.plan_post,
          [key]: value,
        },
      }),
    );
  };

  const RenderItem = ({item, index}) => {
    return (
      <View
        style={tw.style(
          'w-full p-[8px] rounded-[12px] bg-white relative border border-gray-300',
        )}>
        <View style={tw.style('flex-row items-start gap-2')}>
          <Image
            source={{uri: `${URL_SERVER}${item?.image}`}}
            resizeMode="contain"
            style={tw.style('rounded-lg  w-[100px] h-[100px]')}
          />
          <View style={tw.style('flex-col flex-1 w-1')}>
            <Text style={tw.style('text-black font-bold text-[15px]')}>
              {item?.title}
            </Text>
            {item?.subTitle && (
              <Text style={tw.style('text-[12px] text-gray-400 italic')}>
                Tiêu đề phụ
              </Text>
            )}
            <View style={tw.style('flex-row items-center gap-[2px]')}>
              <Text style={tw.style('text-[12px] text-gray-400 italic')}>
                Ngày đăng:{' '}
              </Text>
              <Text
                style={tw.style('text-[12px] text-gray-400 flex-1 w-1 italic')}>
                {dd_mm_yy_hh_mm_ss(item?.createdAt || new Date())}
              </Text>
            </View>
            <Text style={tw.style('text-black py-2 text-[14px]')}>
              {item?.content}
            </Text>
            <TouchableOpacity
              activeOpacity={0.8}
              style={tw.style('items-end')}
              onPress={() => {
                navigation.navigate({
                  name: SCREEN_NAVIGATE.Plan_Detail_Screen,
                  params: {
                    data: item,
                  },
                });
              }}>
              <Text style={tw.style('text-blue-700 font-bold italic')}>
                Xem chi tiết
              </Text>
            </TouchableOpacity>
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
          const image = response.assets[0];
          const body = {
            fileBinary: image.base64,
            nameFile: image.fileName || `image_${Date.now()}`,
          };
          handleChangePlan('image64', `data:image/png;base64,${image.base64}}`);
          setSelectedImages(body);
          setProgress(true);
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
          handleChangePlan('image64', `data:image/png;base64,${image.base64}}`);
          setSelectedImages(body);
          setProgress(true);
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

  const handleSubmit = () => {
    dispatch(SET_TOGGLE_PAYLOAD({key: 'submitting', value: true}));
    const payload = {
      title: title,
      content: content,
      ...selectedImages,
    };
    CREATE_NEW_PLAN({
      dispatch,
      state,
      payload,
    });
    setToggleModal(false);
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'plan_post',
        value: {
          ...state.set_data.plan_post,
          title: '',
          sub_title: '',
          content: '',
          image64: '',
          image: null,
        },
      }),
    );
  };

  const CallAPI = () => {
    GET_LIST_POST_PLAN({state, dispatch});
  };

  useEffect(() => {
    CallAPI();
  }, []);

  let DATA_PLAN_FLAG = list_post_plan || [];
  if (search) {
    DATA_PLAN_FLAG = DATA_PLAN_FLAG.filter(
      item =>
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.content.toLowerCase().includes(search.toLowerCase()),
    );
  }

  const {refreshing, onRefresh} = useRefreshList(CallAPI);

  return (
    <>
      {submitting ? (
        <LoadingScreen />
      ) : (
        <View style={tw`flex-1 flex-col bg-white`}>
          <Banner navigation={navigation} />
          <View style={tw.style('bg-white px-3 py-1')}>
            <View style={tw`flex-row items-center mb-2`}>
              <Text style={tw`text-[${MAIN_TEXT_COLOR}] font-bold text-[20px]`}>
                Kế hoạch công ty
              </Text>
            </View>
            <View
              style={tw.style('flex-row items-center justify-center gap-1')}>
              <TextInputCP
                name="search"
                value={search}
                onChange={val =>
                  dispatch(SET_DATA_PAYLOAD({key: 'search', value: val}))
                }
                outlineColor={PRIMARY_COLOR}
                placeholder="Tìm kiếm kế hoạch"
                style={tw.style('flex-1')}
                outlinedStyle={tw`border border-gray-400`}
              />
              {role === 'admin' && (
                <ButtonCP
                  text="Tạo mới"
                  colorBG={CRITICAL_COLOR}
                  colorBorder={CRITICAL_COLOR}
                  variant="outlined"
                  onPress={() => setToggleModal(true)}
                  styleContainer={tw.style('m-auto py-[15px] w-[100px]')}
                />
              )}
            </View>
          </View>
          <View style={tw.style('px-3 py-1 flex-grow bg-white')}>
            <View style={tw.style('flex-1')}>
              {fList(DATA_PLAN_FLAG).length > 0 ? (
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={DATA_PLAN_FLAG}
                  contentContainerStyle={tw.style('flex-grow gap-2')}
                  keyExtractor={item => item._id.toString()}
                  renderItem={RenderItem}
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                  }
                />
              ) : (
                <ScrollView
                  contentContainerStyle={tw.style(
                    'items-center justify-center flex-1',
                  )}
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                  }
                  showsVerticalScrollIndicator={false}>
                  <Text style={tw.style('text-center text-black italic')}>
                    Chưa có kế hoạch nào
                  </Text>
                </ScrollView>
              )}
            </View>
          </View>
          <ModalCP
            open={toggleModal}
            close={() => setToggleModal(false)}
            title={'Thêm mới kế hoạch'}>
            <View style={tw.style('px-3')}>
              <TextInputCP
                name="title"
                value={title}
                onChange={val => handleChangePlan('title', val)}
                placeholder="Tiêu đề (Bắt buộc)"
                style={tw.style('w-full')}
                outlinedStyle={tw`border border-gray-400`}
              />
              <TextInputCP
                name="sub_title"
                value={sub_title}
                onChange={val => handleChangePlan('sub_title', val)}
                placeholder="Tiêu đề phụ"
                style={tw.style('w-full')}
                outlinedStyle={tw`border border-gray-400`}
              />
              <TextInputCP
                name="content"
                value={content}
                onChange={val => handleChangePlan('content', val)}
                placeholder="Nội dung (Bắt buộc)"
                multiline={true}
                style={tw.style('h-[150px] w-full')}
                contentStyle={tw`p-2`}
                outlinedStyle={tw`border border-gray-400`}
              />
              {image64 && (
                <View
                  style={tw.style(
                    'w-full h-[250px] my-2 rounded-xl overflow-hidden',
                  )}>
                  <Image
                    source={{
                      uri: image64,
                    }}
                    style={tw.style('w-full h-full')}
                    resizeMode="stretch"
                  />
                </View>
              )}
              <View style={tw.style('flex-row gap-2')}>
                <ButtonCP
                  text="Tải ảnh"
                  colorBG={PRIMARY_COLOR}
                  colorBorder={PRIMARY_COLOR}
                  variant="outlined"
                  onPress={handleChoosePhoto}
                  styleContainer={tw.style('flex-1')}
                />
                <ButtonCP
                  text="Chụp ảnh"
                  colorBG={WARNING_COLOR}
                  colorBorder={WARNING_COLOR}
                  variant="outlined"
                  onPress={handleTakePhoto}
                  styleContainer={tw.style('flex-1')}
                />
              </View>
              <ButtonCP
                text="Thêm mới"
                colorBG={PRIMARY_COLOR}
                colorBorder={PRIMARY_COLOR}
                variant="outlined"
                onPress={handleSubmit}
                styleContainer={tw.style('py-[10px] my-3 w-full')}
                disabled={!title || !content || !image64}
              />
            </View>
          </ModalCP>
        </View>
      )}
    </>
  );
}
