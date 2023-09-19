import React from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  Image,
  TouchableOpacity,
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
import {SET_DATA_PAYLOAD} from '../../Context/AppContext.reducer';
import ButtonCP from '../../General/ButtonCP';
import {dd_mm_yy_hh_mm_ss} from '../../../utils/TimerFormat';
import {SCREEN_NAVIGATE} from '../../routersConfig/General.config';
import ModalCP from '../../General/ModalCP';
import {ToastShow} from '../../../utils/Toast';
import {TYPE_TOAST} from '../../../utils/toast.config';
import {requestCameraPermission} from '../../../utils/camera.permission';

const MAX_IMAGES = 1;

export default function PlanCP({navigation}) {
  const {state, dispatch} = useAppContext();
  const {data_plan_post, content, title, sub_title, image64, image} =
    state.set_data.plan_post;
  const {search} = state.set_data;

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
            source={require('../../../assets/images/logo_company/logo_square.png')}
            resizeMode="contain"
            style={tw.style('rounded-lg  w-[100px] h-[100px]')}
          />
          <View style={tw.style('flex-col flex-1 w-1')}>
            <Text style={tw.style('text-black font-bold text-[15px]')}>
              Tiêu đề kế hoạch
            </Text>
            <Text style={tw.style('text-[12px] text-gray-400 italic')}>
              Tiêu đề phụ
            </Text>
            <View style={tw.style('flex-row items-center gap-[2px]')}>
              <Text style={tw.style('text-[12px] text-gray-400 italic')}>
                Ngày đăng:{' '}
              </Text>
              <Text
                style={tw.style('text-[12px] text-gray-400 flex-1 w-1 italic')}>
                {dd_mm_yy_hh_mm_ss(new Date())}
              </Text>
            </View>
            <Text style={tw.style('text-black py-2 text-[14px]')}>
              Nội dung kế hoạch
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
    const body = {
      title: title,
      content: content,
      image: selectedImages,
    };
    console.log('body: ', body);
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
    <SafeAreaView style={tw`flex-1 flex-col bg-[${MAIN_COLOR}]`}>
      <Banner navigation={navigation} />
      <View style={tw.style('bg-white px-3 py-1')}>
        <View style={tw`flex-row items-center mb-2`}>
          <Text style={tw`text-[${MAIN_TEXT_COLOR}] font-bold text-[20px]`}>
            Kế hoạch công ty
          </Text>
        </View>
        <View style={tw.style('flex-row items-center justify-center gap-1')}>
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
          <ButtonCP
            text="Tạo mới"
            colorBG={CRITICAL_COLOR}
            colorBorder={CRITICAL_COLOR}
            variant="outlined"
            onPress={() => setToggleModal(true)}
            styleContainer={tw.style('m-auto py-[15px] w-[100px]')}
          />
        </View>
      </View>
      <View style={tw.style('px-3 py-1 flex-grow bg-white')}>
        <View style={tw.style('flex-1')}>
          {data_plan_post.length > 0 ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={data_plan_post}
              contentContainerStyle={tw.style('flex-grow gap-2')}
              keyExtractor={item => item.toString()}
              renderItem={RenderItem}
            />
          ) : (
            <View style={tw.style('items-center justify-center flex-1')}>
              <Text style={tw.style('text-center text-black italic')}>
                Không tìm thấy dữ liệu
              </Text>
            </View>
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
    </SafeAreaView>
  );
}
