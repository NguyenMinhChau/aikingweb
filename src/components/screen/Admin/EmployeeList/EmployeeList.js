import React, {useEffect} from 'react';
import {View, Text, FlatList, RefreshControl, ScrollView} from 'react-native';
import tw from '../../../../styles/twrnc.global';
import useAppContext from '../../../../utils/hooks/useAppContext';
import TextInputCP from '../../../General/TextInputCP';
import {
  SET_DATA_PAYLOAD,
  SET_TOGGLE_PAYLOAD,
} from '../../../Context/AppContext.reducer';
import {
  CRITICAL_COLOR,
  MAIN_TEXT_COLOR,
  PRIMARY_COLOR,
} from '../../../../styles/colors.global';
import Banner from '../../Banner/Banner';
import {
  GET_LIST_USER,
  TIME_KEEPING_COMPENSATE,
  UPDATE_WAGE_EMPLOYEE,
} from '../../../../services/admin';
import {fList} from '../../../../utils/array.utils';
import RowDialogCP from '../../../General/Dialog/RowDialogCP';
import {
  autoFormatNumberInputChange,
  formatVND,
} from '../../../../utils/money.utils';
import ButtonCP from '../../../General/ButtonCP';
import DialogCP from '../../../General/Dialog/DialogCP';
import LoadingScreen from '../../../General/LoadingScreen';
import {useRefreshList} from '../../../../utils/refreshList.utils';
import FastImageCP from '../../../General/FastImageCP';
import BannerNestedScreen from '../../../General/BannerNestedScreen';

export default function EmployeeListScreen({navigation}) {
  const {state, dispatch} = useAppContext();
  const {search} = state.set_data;
  const {list_user, wage, date, hours} = state.set_data.admin;
  const {submitting} = state.set_toggle;

  const [isVisible, setIsVisible] = React.useState(false);
  const [targetVisible, setTargetVisible] = React.useState('');
  const [dataModal, setDataModal] = React.useState(null);

  const handleVisible = (isVal, target, item) => {
    setIsVisible(isVal);
    setTargetVisible(target);
    setDataModal(item);
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'admin',
        value: {
          ...state.admin,
          wage: item?.user?.wage || '',
        },
      }),
    );
  };

  const handleChange = (key, val) => {
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'admin',
        value: {
          ...state.admin,
          [key]: val,
        },
      }),
    );
  };

  const CallAPI = () => {
    GET_LIST_USER({dispatch, state});
  };

  useEffect(() => {
    CallAPI();
  }, []);

  const RenderItem = ({item, index}) => {
    const {salary, totalHours} = {...item};
    const {_id, group, name, wage} = {...item?.user};
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
        <View style={tw.style('flex-row gap-2')}>
          <ButtonCP
            text="Chấm công bù"
            onPress={() => {
              handleVisible(true, 'cham_cong_bu', item);
            }}
            colorBG={PRIMARY_COLOR}
            colorBorder={PRIMARY_COLOR}
            styleContainer={tw.style('flex-1')}
            variant="outlined"
          />
          <ButtonCP
            text="Sửa lương cơ bản"
            onPress={() => {
              handleVisible(true, 'luong_co_ban', item);
            }}
            colorBG={CRITICAL_COLOR}
            colorBorder={CRITICAL_COLOR}
            styleContainer={tw.style('flex-1')}
            variant="outlined"
          />
        </View>
      </View>
    );
  };

  let DATA_LIST_USER_FLAG = list_user || [];

  if (search) {
    DATA_LIST_USER_FLAG = DATA_LIST_USER_FLAG.filter(
      item =>
        item?.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
        item?.user?.group?.toLowerCase().includes(search.toLowerCase()) ||
        item?.user?.wage
          ?.toString()
          .toLowerCase()
          .includes(search.toLowerCase()),
    );
  }

  const handleUpdateWage = idUser => {
    dispatch(
      SET_TOGGLE_PAYLOAD({
        key: 'submitting',
        value: true,
      }),
    );
    UPDATE_WAGE_EMPLOYEE({
      dispatch,
      state,
      idUser,
      wage: wage,
    });

    setIsVisible(false);
    setDataModal(null);
    setTargetVisible('');
  };

  const handleTimeKeepingCompensate = idUser => {
    dispatch(
      SET_TOGGLE_PAYLOAD({
        key: 'submitting',
        value: true,
      }),
    );
    TIME_KEEPING_COMPENSATE({
      dispatch,
      state,
      idUser,
      date,
      hours: parseFloat(hours),
    });

    setIsVisible(false);
    setDataModal(null);
    setTargetVisible('');
  };

  const titleModal =
    targetVisible === 'luong_co_ban' ? 'Sửa lương cơ bản' : 'Chấm công bù';

  const {refreshing, onRefresh} = useRefreshList(CallAPI);

  return (
    <>
      {submitting ? (
        <LoadingScreen />
      ) : (
        <View style={tw`flex-1 flex-col bg-white`}>
          <BannerNestedScreen
            navigation={navigation}
            title="Danh sách nhân viên"
          />
          <View style={tw.style('bg-white px-3 py-1')}>
            <TextInputCP
              name="search"
              value={search}
              onChange={val =>
                dispatch(SET_DATA_PAYLOAD({key: 'search', value: val}))
              }
              outlineColor={PRIMARY_COLOR}
              placeholder="Tìm kiếm nhân viên"
              outlinedStyle={tw`border border-gray-400`}
            />
          </View>
          <View style={tw.style('px-3 py-1 flex-grow bg-white')}>
            <View style={tw.style('flex-1')}>
              {fList(DATA_LIST_USER_FLAG).length > 0 ? (
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={DATA_LIST_USER_FLAG}
                  contentContainerStyle={tw.style('flex-grow gap-2')}
                  keyExtractor={item => item.user?._id.toString()}
                  renderItem={RenderItem}
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                      colors={[PRIMARY_COLOR]}
                    />
                  }
                />
              ) : (
                <ScrollView
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                      colors={[PRIMARY_COLOR]}
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
          {/* SỬA LƯƠNG CƠ BẢN */}
          <DialogCP
            visible={isVisible}
            setVisible={setIsVisible}
            styleDialog={tw`mx-10`}
            title={titleModal}>
            <View style={tw`bg-white p-4 rounded-md w-full`}>
              <RowDialogCP
                label="Tên nhân viên"
                value={dataModal?.user?.name}
                noneBorderBottom
                noBullet
                styleRow={tw.style('py-2 px-0')}
              />
              <RowDialogCP
                label="Phòng ban"
                value={dataModal?.user?.group}
                noneBorderBottom
                noBullet
                styleRow={tw.style('py-2 px-0')}
              />
              {targetVisible === 'luong_co_ban' ? (
                <TextInputCP
                  placeholder="Vui lòng nhập lương cơ bản"
                  value={`${autoFormatNumberInputChange(wage)}`}
                  onChange={val => {
                    handleChange('wage', val);
                  }}
                  contentStyle={tw`p-2`}
                  outlinedStyle={tw`border border-gray-400`}
                />
              ) : (
                <>
                  <TextInputCP
                    label="Ngày làm việc (Ví dụ: 2023/01/01)"
                    value={`${date}`}
                    onChange={val => {
                      handleChange('date', val);
                    }}
                    contentStyle={tw`p-2`}
                    outlinedStyle={tw`border border-gray-400`}
                  />
                  <TextInputCP
                    label="Số giờ làm việc"
                    value={`${hours}`}
                    onChange={val => {
                      handleChange('hours', val);
                    }}
                    contentStyle={tw`p-2`}
                    outlinedStyle={tw`border border-gray-400`}
                  />
                </>
              )}
              <View style={tw`flex flex-row justify-end gap-2`}>
                <ButtonCP
                  colorBorder="#dc2626"
                  colorBG="#dc2626"
                  text="Thoát"
                  onPress={() => setIsVisible(false)}
                />
                <ButtonCP
                  text="Xác nhận"
                  disabled={
                    targetVisible === 'luong_co_ban' ? !wage : !date && !hours
                  }
                  onPress={() =>
                    targetVisible === 'luong_co_ban'
                      ? handleUpdateWage(dataModal?.user?._id)
                      : handleTimeKeepingCompensate(dataModal?.user?._id)
                  }
                  colorBG={PRIMARY_COLOR}
                  colorBorder={PRIMARY_COLOR}
                />
              </View>
            </View>
          </DialogCP>
        </View>
      )}
    </>
  );
}
