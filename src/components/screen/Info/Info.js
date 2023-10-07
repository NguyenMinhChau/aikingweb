import React from 'react';
import {
  Text,
  View,
  Image,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import tw from '../../../styles/twrnc.global';
import useAppContext from '../../../utils/hooks/useAppContext';
import RowDialogCP from '../../General/Dialog/RowDialogCP';
import Banner from '../Banner/Banner';
import {useRefreshList} from '../../../utils/refreshList.utils';
import {EMPTY_CHAR} from '../../../helpers/_empty';
import {SET_DATA_PAYLOAD} from '../../Context/AppContext.reducer';
import ModalCP from '../../General/ModalCP';
import {
  launchCameraUtils,
  launchImageLibraryUtils,
} from '../../../utils/file.utils';
import {optionsImageLibrary, optionsLaunchCamera} from './config';

export default function InfoScreen({navigation}) {
  const {state, dispatch} = useAppContext();
  const {refreshing, onRefresh} = useRefreshList();
  const {currentUser} = state.set_data;
  const {file_single} = state.set_data.file;
  const [isVisible, setIsVisible] = React.useState(false);
  const {email, name, _id, group} = {
    ...currentUser?.user,
  };

  const handleChangePhoto = async response => {
    if (response) {
      const payload = {
        uri: response?.assets?.[0]?.uri,
        name: response?.assets?.[0]?.fileName,
        type: response?.assets?.[0]?.type,
      };
      dispatch(
        SET_DATA_PAYLOAD({
          key: 'file',
          value: {...state.set_data.file, file_single: payload},
        }),
      );
      setIsVisible(false);
    }
  };

  const {uri, name: nameFile, type} = {...file_single};

  return (
    <View style={tw`flex-1 flex-col bg-white`}>
      <Banner navigation={navigation} />
      <View style={tw.style('p-3 pb-1 bg-white')}>
        <View style={tw.style('rounded-lg bg-white p-2 shadow-md')}>
          <View style={tw.style('flex-row gap-3 items-center')}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setIsVisible(true)}
              style={tw.style(
                'w-[100px] h-[100px] rounded-full overflow-hidden border border-gray-100',
              )}>
              <Image
                source={
                  uri
                    ? {uri: uri}
                    : require('../../../assets/images/Info/avatar_placeholder.png')
                }
                style={tw.style('w-full h-full')}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <View
              style={tw.style('flex-col gap-[2px] flex-grow w-1 items-start')}>
              <Text style={tw.style('font-bold text-[16px] text-black')}>
                {name || EMPTY_CHAR}
              </Text>
              <Text style={tw.style(' text-[13px] text-gray-600')}>
                Email: {email || EMPTY_CHAR}
              </Text>
              <Text style={tw.style(' text-[13px] text-gray-600')}>
                Phòng: {group || EMPTY_CHAR}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={tw`flex-grow bg-white p-3`}
        style={tw.style('bg-white')}>
        <View style={tw.style(' rounded-lg bg-white p-2 shadow-md my-3')}>
          <RowDialogCP
            label="Mã NV"
            noneBorderBottom
            value={_id}
            styleLabel={tw`font-medium`}
            noBullet
          />
        </View>
      </ScrollView>
      <ModalCP
        open={isVisible}
        close={() => setIsVisible(false)}
        title="Thay đổi ảnh đại diện">
        <View style={tw`mt-3 min-h-[200px]`}>
          <RowDialogCP
            label="Chọn ảnh từ thư viện"
            styleLabel={tw`font-medium`}
            styleRow={tw.style('py-3')}
            leftNameIcon={'image-outline'}
            onClickAccord={() =>
              launchImageLibraryUtils(optionsImageLibrary, handleChangePhoto)
            }
            noValue
          />
          <RowDialogCP
            label="Chụp ảnh"
            styleLabel={tw`font-medium`}
            styleRow={tw.style('py-3')}
            leftNameIcon={'camera-outline'}
            onClickAccord={() =>
              launchCameraUtils(optionsLaunchCamera, handleChangePhoto)
            }
            noValue
          />
        </View>
      </ModalCP>
    </View>
  );
}
