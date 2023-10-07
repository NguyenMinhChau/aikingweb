import React, {useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
} from 'react-native';
import tw from '../../../../styles/twrnc.global';
import {
  CRITICAL_COLOR,
  MAIN_COLOR,
  MAIN_TEXT_COLOR,
  PRIMARY_COLOR,
  WARNING_COLOR,
} from '../../../../styles/colors.global';
import {Iconify} from 'react-native-iconify';
import useAppContext from '../../../../utils/hooks/useAppContext';
import TextInputCP from '../../../General/TextInputCP';
import {
  SET_DATA_PAYLOAD,
  SET_TOGGLE_PAYLOAD,
} from '../../../Context/AppContext.reducer';
import RowDialogCP from '../../../General/Dialog/RowDialogCP';
import ButtonCP from '../../../General/ButtonCP';
import {
  GET_LIST_USER_TIME_KEEPING,
  UPDATE_TIME_KEEPING_STATUS,
} from '../../../../services/admin';
import {dd_mm_yy_hh_mm_ss} from '../../../../utils/TimerFormat';
import {formatVND} from '../../../../utils/money.utils';
import {fList} from '../../../../utils/array.utils';
import ModalCP from '../../../General/ModalCP';
import {URL_SERVER} from '@env';
import LoadingScreen from '../../../General/LoadingScreen';
import Banner from '../../Banner/Banner';
import RenderTagCP from '../../../General/RenderTag';
import {useRefreshList} from '../../../../utils/refreshList.utils';
import FastImageCP from '../../../General/FastImageCP';
import BannerNestedScreen from '../../../General/BannerNestedScreen';

export default function VerifyTimeKeepingScreen({navigation}) {
  const {state, dispatch} = useAppContext();
  const {list_user_time_keeping} = state.set_data.admin;
  const {search} = state.set_data;
  const {submitting} = state.set_toggle;

  const [toggleModal, setToggleModal] = React.useState(false);
  const [dataModal, setDataModal] = React.useState(null);

  const handleConfirmTimeKeeping = (status, _id) => {
    dispatch(SET_TOGGLE_PAYLOAD({key: 'submitting', value: true}));
    UPDATE_TIME_KEEPING_STATUS({
      dispatch,
      state,
      status,
      idTimeKeeping: _id,
    });
  };

  const RenderItem = ({item, index}) => {
    const {email, group, name, wage} = {...item?.userId};
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
          value={name}
          styleLabel={tw`font-medium`}
          noBullet
        />
        <RowDialogCP
          label="Email"
          noneBorderBottom
          value={email}
          styleLabel={tw`font-medium`}
          noBullet
        />
        <RowDialogCP
          label="Phòng ban"
          noneBorderBottom
          value={group}
          styleLabel={tw`font-medium`}
          noBullet
        />
        <RowDialogCP
          label="Lương cơ bản"
          noneBorderBottom
          value={formatVND(wage || 0)}
          styleLabel={tw`font-medium`}
          noBullet
        />
        <RowDialogCP
          label="Thời gian vào"
          noneBorderBottom
          value={dd_mm_yy_hh_mm_ss(item?.timeIn)}
          styleLabel={tw`font-medium`}
          noBullet
        />
        <RowDialogCP
          label="Thời gian ra"
          noneBorderBottom
          value={dd_mm_yy_hh_mm_ss(item?.timeOut)}
          styleLabel={tw`font-medium`}
          noBullet
        />
        <RowDialogCP
          label="Tổng thời gian"
          noneBorderBottom
          value={item?.totalHours + 'h'}
          styleLabel={tw`font-medium`}
          noBullet
        />
        <RowDialogCP
          label="Trạng thái"
          noneBorderBottom
          ValueCP={() => {
            return <RenderTagCP tag={item?.status} />;
          }}
          styleLabel={tw`font-medium`}
          noBullet
        />
        <View style={tw.style('flex-row gap-2')}>
          <ButtonCP
            text="Duyệt Vào"
            onPress={() =>
              handleConfirmTimeKeeping('ApprovedCheckIn', item?._id)
            }
            colorBG={PRIMARY_COLOR}
            colorBorder={PRIMARY_COLOR}
            styleContainer={tw.style('flex-1')}
            variant="outlined"
          />
          <ButtonCP
            text="Duyệt Ra"
            onPress={() => handleConfirmTimeKeeping('Completed', item?._id)}
            colorBG={CRITICAL_COLOR}
            colorBorder={CRITICAL_COLOR}
            styleContainer={tw.style('flex-1')}
            variant="outlined"
          />
          <ButtonCP
            text="Đóng lệnh"
            onPress={() => handleConfirmTimeKeeping('Rejected', item?._id)}
            colorBG={CRITICAL_COLOR}
            colorBorder={CRITICAL_COLOR}
            styleContainer={tw.style('flex-1')}
            variant="outlined"
          />
          <ButtonCP
            text="Xem ảnh"
            onPress={() => {
              setToggleModal(true);
              setDataModal(item);
            }}
            colorBG={WARNING_COLOR}
            colorBorder={WARNING_COLOR}
            styleContainer={tw.style('flex-1')}
            variant="outlined"
          />
        </View>
      </View>
    );
  };

  const CallAPI = () => {
    GET_LIST_USER_TIME_KEEPING({dispatch, state});
  };

  useEffect(() => {
    CallAPI();
  }, []);

  let DATA_TIME_KEEPING_FLAG = list_user_time_keeping || [];
  if (search) {
    DATA_TIME_KEEPING_FLAG = DATA_TIME_KEEPING_FLAG.filter(
      item =>
        item?.userId?.name?.toLowerCase().includes(search.toLowerCase()) ||
        item?.userId?.email?.toLowerCase().includes(search.toLowerCase()),
    );
  }

  const {refreshing, onRefresh} = useRefreshList(CallAPI);

  return (
    <>
      {submitting ? (
        <LoadingScreen />
      ) : (
        <View style={tw`flex-1 flex-col bg-white`}>
          <BannerNestedScreen navigation={navigation} title="Duyệt chấm công" />
          <View style={tw.style('bg-white px-3 py-1')}>
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
              {fList(DATA_TIME_KEEPING_FLAG).length > 0 ? (
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={DATA_TIME_KEEPING_FLAG}
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
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                  }
                  contentContainerStyle={tw.style(
                    'items-center justify-center flex-1',
                  )}>
                  <FastImageCP
                    uriLocal={require('../../../../assets/images/no_data.png')}
                    resizeMode="contain"
                    style={tw.style('w-full h-[200px]')}
                  />
                  <Text style={tw.style('text-center text-black italic')}>
                    Không tìm thấy dữ liệu
                  </Text>
                </ScrollView>
              )}
            </View>
          </View>
          <ModalCP
            open={toggleModal}
            close={() => setToggleModal(false)}
            title={'Xem hình ảnh'}>
            <View style={tw.style('px-3')}>
              <Text style={tw.style('text-black font-bold text-[15px] mb-2')}>
                Hình ảnh check in
              </Text>
              {dataModal?.imagePathCheckIn ? (
                <View
                  style={tw.style(
                    'w-full h-[300px] rounded-lg overflow-hidden',
                  )}>
                  <Image
                    source={{
                      uri: `${URL_SERVER}${dataModal?.imagePathCheckIn}`,
                    }}
                    resizeMode="contain"
                    style={tw.style('w-full h-full')}
                  />
                </View>
              ) : (
                <Text
                  style={tw.style(
                    'text-center text-red-500 italic text-[14px]',
                  )}>
                  Chưa có hình ảnh check out
                </Text>
              )}
              <Text
                style={tw.style('text-black font-bold text-[15px] mt-5 mb-2')}>
                Hình ảnh check out
              </Text>
              {dataModal?.imagePathCheckOut ? (
                <View
                  style={tw.style(
                    'w-full h-[300px] rounded-lg overflow-hidden',
                  )}>
                  <Image
                    source={{
                      uri: `${URL_SERVER}${dataModal?.imagePathCheckOut}`,
                    }}
                    resizeMode="contain"
                    style={tw.style('w-full h-full')}
                  />
                </View>
              ) : (
                <Text
                  style={tw.style(
                    'text-center text-red-500 italic text-[14px]',
                  )}>
                  Chưa có hình ảnh check out
                </Text>
              )}
            </View>
          </ModalCP>
        </View>
      )}
    </>
  );
}
