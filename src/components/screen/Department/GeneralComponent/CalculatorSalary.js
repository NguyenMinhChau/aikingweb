import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  RefreshControl,
  ScrollView,
} from 'react-native';
import tw from '../../../../styles/twrnc.global';
import {Iconify} from 'react-native-iconify';
import useAppContext from '../../../../utils/hooks/useAppContext';
import {formatVND} from '../../../../utils/money.utils';
import moment from 'moment';
import 'moment/locale/vi';
import {SCREEN_NAVIGATE} from '../../../routersConfig/General.config';
import CalendarCP from '../../../General/Calendar';
import {MAIN_COLOR, PRIMARY_COLOR} from '../../../../styles/colors.global';
import {GET_LIST_USER_BY_GROUP} from '../../../../services/admin';
import TextInputCP from '../../../General/TextInputCP';
import {SET_DATA_PAYLOAD} from '../../../Context/AppContext.reducer';
import {fList} from '../../../../utils/array.utils';
import {yyyy_mm} from '../../../../utils/TimerFormat';
import {useRefreshList} from '../../../../utils/refreshList.utils';

export default function CalculatorSalaryScreen({navigation}) {
  const {state, dispatch} = useAppContext();
  const {search} = state.set_data;
  const {day, month} = state.set_data.date_time;
  const {list_calculator_salary, group} = state.set_data.admin;
  const formatDateDisplay = moment(day ? day : new Date())
    .locale('vi')
    .format('dddd, DD/MM/YYYY');
  const formatMonthDisplay = moment(month ? month : new Date())
    .locale('vi')
    .format('MM/YYYY');

  const RenderItem = ({item}) => {
    const {group, name, wage} = {...item?.user};
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={tw.style(
          'rounded-lg bg-white p-2 border border-gray-300 flex-row items-start gap-2',
        )}
        onPress={() => {
          navigation.navigate({
            name: SCREEN_NAVIGATE.Salary_Detail_Screen,
            params: {
              data: item,
              day: day,
              month: month,
            },
          });
        }}>
        <Image
          source={require('../../../../assets/images/logo_company/logo_square.png')}
          resizeMode="contain"
          style={tw.style(
            'w-[50px] h-[50px] border border-gray-200 rounded-full',
          )}
        />
        <View style={tw.style('flex-col gap-1 flex-1 w-1')}>
          <Text style={tw.style('text-black font-bold text-[14px] capitalize')}>
            {name}
          </Text>
          <Text style={tw.style('text-gray-400 text-[12px]')}>
            Phòng ban: {group}
          </Text>
          <Text style={tw.style('text-blue-600 text-[12px]')}>
            Lương cơ bản: {formatVND(wage || 0)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const CallAPI = () => {
    GET_LIST_USER_BY_GROUP({
      dispatch,
      state,
      group,
      month: month || yyyy_mm(new Date()),
    });
  };

  React.useEffect(() => {
    if (group) {
      CallAPI();
    }
  }, [month, day]);

  let DATA_CALCULATOR_FLAG = list_calculator_salary || [];

  if (search) {
    DATA_CALCULATOR_FLAG = DATA_CALCULATOR_FLAG.filter(
      item =>
        item.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
        item.user?.wage
          ?.toString()
          .toLowerCase()
          .includes(search.toLowerCase()),
    );
  }

  const {refreshing, onRefresh} = useRefreshList(CallAPI);

  return (
    <View style={tw`flex-1 flex-col bg-[${MAIN_COLOR}]`}>
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
      <CalendarCP />
      <View style={tw.style('flex-row px-3 bg-white')}>
        <Text style={tw.style('text-black font-bold')}>Bảng lương: </Text>
        <Text style={tw.style('text-red-500 font-bold capitalize flex-1 w-1')}>
          {formatMonthDisplay}
        </Text>
      </View>
      <View style={tw.style('bg-white px-3')}>
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
      <View style={tw.style('p-3 pt-0 flex-grow bg-white')}>
        <View style={tw.style('flex-1')}>
          {fList(DATA_CALCULATOR_FLAG).length > 0 ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={DATA_CALCULATOR_FLAG}
              contentContainerStyle={tw.style('flex-grow gap-2')}
              keyExtractor={item => item.user._id.toString()}
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
              <Text style={tw.style('text-center text-black italic')}>
                Không tìm thấy dữ liệu
              </Text>
            </ScrollView>
          )}
        </View>
      </View>
    </View>
  );
}
