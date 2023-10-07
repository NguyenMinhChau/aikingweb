import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import tw from '../../../styles/twrnc.global';
import {
  CRITICAL_COLOR,
  MAIN_COLOR,
  PRIMARY_COLOR,
  WARNING_COLOR,
} from '../../../styles/colors.global';
import {Iconify} from 'react-native-iconify';
import {dd_mm_yy_hh_mm_ss} from '../../../utils/TimerFormat';
import {URL_SERVER} from '@env';
import ButtonCP from '../../General/ButtonCP';
import {DELETE_PLAN, UPDATE_PLAN} from '../../../services/admin';
import useAppContext from '../../../utils/hooks/useAppContext';
import {
  SET_DATA_PAYLOAD,
  SET_TOGGLE_PAYLOAD,
} from '../../Context/AppContext.reducer';
import LoadingScreen from '../../General/LoadingScreen';
import ModalCP from '../../General/ModalCP';
import TextInputCP from '../../General/TextInputCP';
import {TYPE_TOAST} from '../../../utils/toast.config';
import {ToastShow} from '../../../utils/Toast';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {TYPE_ACCESS, requestPermission} from '../../../utils/MgnAccess/config';
import BannerNestedScreen from '../../General/BannerNestedScreen';

const MAX_IMAGES = 1;

export default function PlanDetailScreen({navigation, route}) {
  const {state, dispatch} = useAppContext();
  const {content, title, sub_title, image64} = state.set_data.plan_post;
  const {currentUser} = state.set_data;
  const {submitting} = state.set_toggle;
  const {role} = {...currentUser?.user};
  const {data} = route.params;
  const {
    _id,
    title: titleRoute,
    image,
    createdAt,
    content: contentRoute,
  } = {...data};

  const [toggleModal, setToggleModal] = React.useState(false);
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
          handleChangePlan('image64', `data:image/png;base64,${image.base64}}`);
          setSelectedImages(body);
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
    await requestPermission(TYPE_ACCESS.CAMERA);
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
          handleChangePlan('image64', `data:image/png;base64,${image.base64}}`);
          setSelectedImages(body);
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

  const handleDeletePlan = () => {
    dispatch(SET_TOGGLE_PAYLOAD({key: 'submitting', value: true}));
    DELETE_PLAN({dispatch, idPlan: _id, navigation});
  };

  const onClickEdit = () => {
    setToggleModal(true);
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'plan_post',
        value: {
          title: titleRoute,
          sub_title: '',
          content: contentRoute,
          image64: null,
        },
      }),
    );
  };

  const handleUpdatePlan = () => {
    dispatch(SET_TOGGLE_PAYLOAD({key: 'submitting', value: true}));
    const payload = {
      title: title,
      content: content,
      ...selectedImages,
    };
    UPDATE_PLAN({dispatch, state, payload, idPlan: _id, navigation});
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

  return (
    <>
      {submitting ? (
        <LoadingScreen />
      ) : (
        <View style={tw`flex-1 flex-col bg-[${MAIN_COLOR}]`}>
          <BannerNestedScreen
            navigation={navigation}
            title="Chi tiết kế hoạch"
          />
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={tw.style('p-3 flex-grow bg-white')}>
            <ImageBackground
              source={{uri: `${URL_SERVER}${image}`}}
              resizeMode="cover"
              style={tw.style('w-full h-[300px] rounded-md overflow-hidden')}
            />
            <View style={tw.style('flex-col')}>
              <Text
                style={tw.style(
                  'text-black text-[18px] font-bold leading-7 capitalize',
                )}>
                {titleRoute}
              </Text>
              <View style={tw.style('flex-row items-center gap-[2px]')}>
                <Text style={tw.style('text-[12px] text-gray-400 italic')}>
                  Ngày đăng:{' '}
                </Text>
                <Text
                  style={tw.style(
                    'text-[12px] text-gray-400 flex-1 w-1 italic',
                  )}>
                  {dd_mm_yy_hh_mm_ss(createdAt || new Date())}
                </Text>
              </View>
              <Text style={tw.style('py-2 text-black text-[15px]')}>
                {contentRoute}
              </Text>
            </View>
          </ScrollView>
          {role === 'admin' && (
            <View style={tw.style('flex-row gap-1 bg-white p-2')}>
              <ButtonCP
                text="Xóa kế hoạch"
                colorBG={CRITICAL_COLOR}
                colorBorder={CRITICAL_COLOR}
                styleContainer={tw.style('flex-1')}
                onPress={handleDeletePlan}
              />
              <ButtonCP
                text="Chỉnh sửa kế hoạch"
                colorBG={PRIMARY_COLOR}
                colorBorder={PRIMARY_COLOR}
                styleContainer={tw.style('flex-1')}
                onPress={onClickEdit}
              />
            </View>
          )}
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
              {(image64 || image) && (
                <View
                  style={tw.style(
                    'w-full h-[250px] my-2 rounded-xl overflow-hidden',
                  )}>
                  <Image
                    source={{
                      uri: image64 ? image64 : `${URL_SERVER}${image}`,
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
                text="Cập nhật"
                colorBG={PRIMARY_COLOR}
                colorBorder={PRIMARY_COLOR}
                variant="outlined"
                onPress={handleUpdatePlan}
                styleContainer={tw.style('py-[10px] my-3 w-full')}
                disabled={!title || !content}
              />
            </View>
          </ModalCP>
        </View>
      )}
    </>
  );
}
