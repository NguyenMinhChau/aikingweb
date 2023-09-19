import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import tw from '../../../../styles/twrnc.global';
import {
  CRITICAL_COLOR,
  MAIN_COLOR,
  MAIN_TEXT_COLOR,
  PRIMARY_COLOR,
} from '../../../../styles/colors.global';
import {Iconify} from 'react-native-iconify';
import useAppContext from '../../../../utils/hooks/useAppContext';
import TextInputCP from '../../../General/TextInputCP';
import {SET_DATA_PAYLOAD} from '../../../Context/AppContext.reducer';
import RowDialogCP from '../../../General/Dialog/RowDialogCP';
import ButtonCP from '../../../General/ButtonCP';

export default function VerifyTimeKeepingScreen({navigation}) {
  const {state, dispatch} = useAppContext();
  const {verify_time_keeping} = state.set_data.user_list;
  const {search} = state.set_data;

  const RenderItem = ({item, index}) => {
    return (
      <View
        style={tw.style(
          'w-full p-[8px] rounded-[12px] bg-white relative border border-gray-300',
        )}>
        <RowDialogCP
          label="STT"
          noneBorderBottom
          value={index + 1 < 10 ? `0${index + 1}` : index + 1}
          styleLabel={tw`font-medium`}
          noBullet
        />
        <RowDialogCP
          label="Họ và tên"
          noneBorderBottom
          value={'Nguyễn Văn A'}
          styleLabel={tw`font-medium`}
          noBullet
        />
        <RowDialogCP
          label="Phòng ban"
          noneBorderBottom
          value={'IT'}
          styleLabel={tw`font-medium`}
          noBullet
        />
        <View style={tw.style('flex-row gap-2')}>
          <ButtonCP
            text="Duyệt Vào"
            onPress={() => {}}
            colorBG={PRIMARY_COLOR}
            colorBorder={PRIMARY_COLOR}
            styleContainer={tw.style('flex-1')}
            variant="outlined"
          />
          <ButtonCP
            text="Duyệt Ra"
            onPress={() => {}}
            colorBG={CRITICAL_COLOR}
            colorBorder={CRITICAL_COLOR}
            styleContainer={tw.style('flex-1')}
            variant="outlined"
          />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={tw`flex-1 flex-col bg-[${MAIN_COLOR}]`}>
      <View style={tw`flex-row items-center justify-between z-20 p-2`}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}>
          <Iconify icon="ic:baseline-arrow-back" size={25} color="#fff" />
        </TouchableOpacity>
        <View style={tw`w-[60px] h-[40px]`}>
          <Image
            source={require('../../../../assets/images/logo_company/logo_square.png')}
            style={tw`w-full h-full`}
            resizeMode="contain"
          />
        </View>
      </View>
      <View style={tw.style('bg-white px-3 py-1')}>
        <View style={tw`flex-row items-center mb-2`}>
          <Text style={tw`text-[${MAIN_TEXT_COLOR}] font-bold text-[20px]`}>
            Duyệt chấm công
          </Text>
        </View>
        <TextInputCP
          name="search"
          value={search}
          onChange={val =>
            dispatch(SET_DATA_PAYLOAD({key: 'search', value: val}))
          }
          outlineColor={PRIMARY_COLOR}
          placeholder="Tìm kiếm nhân sự"
          outlinedStyle={tw`border border-gray-400`}
        />
      </View>
      <View style={tw.style('px-3 py-1 flex-grow bg-white')}>
        <View style={tw.style('flex-1')}>
          {verify_time_keeping.length > 0 ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={verify_time_keeping}
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
    </SafeAreaView>
  );
}
