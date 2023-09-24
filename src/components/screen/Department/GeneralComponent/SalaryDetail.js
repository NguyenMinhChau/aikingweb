import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import tw from '../../../../styles/twrnc.global';
import {MAIN_COLOR} from '../../../../styles/colors.global';
import {Iconify} from 'react-native-iconify';
import RowDialogCP from '../../../General/Dialog/RowDialogCP';
import moment from 'moment';
import 'moment/locale/vi';
import {formatVND} from '../../../../utils/money.utils';
import {fList} from '../../../../utils/array.utils';
import {dd_mm_yy_hh_mm_ss} from '../../../../utils/TimerFormat';
import RenderTagCP from '../../../General/RenderTag';

export default function SalaryDetailScreen({navigation, route}) {
  const {data, day, month} = route.params;

  const formatDateDisplay = moment(day ? day : new Date())
    .locale('vi')
    .format('dddd, DD/MM/YYYY');
  const formatMonthDisplay = moment(month ? month : new Date())
    .locale('vi')
    .format('MM/YYYY');

  const {cards, salary, totalHours} = {...data};
  const {name, group, wage} = {...data?.user};

  const countCompleted = cards.filter(
    item => item.status === 'Completed',
  ).length;
  const countPending = cards.filter(item => item.status === 'Pending').length;
  const countApprovedCheckIn = cards.filter(
    item => item.status === 'ApprovedCheckIn',
  ).length;
  const countRejected = cards.filter(item => item.status === 'Rejected').length;

  const RenderItem = ({item, index}) => {
    return (
      <>
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
            value={item?.totalHours + ' h'}
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
        </View>
      </>
    );
  };

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
      <View style={tw.style('flex-1 bg-white py-2 px-3')}>
        <View style={tw.style('mb-2 flex-row')}>
          <Text style={tw.style('text-black font-bold')}>Bảng lương, </Text>
          <Text
            style={tw.style('text-red-500 font-bold capitalize flex-1 w-1')}>
            {formatMonthDisplay}
          </Text>
        </View>
        <View style={tw.style(' rounded-lg bg-white p-2 shadow-md my-3 mb-1')}>
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
        </View>
        <View style={tw.style(' rounded-lg bg-white p-2 shadow-md my-3 mb-1')}>
          <RowDialogCP
            label="Tổng giờ làm"
            noneBorderBottom
            value={totalHours + ' h'}
            styleLabel={tw`font-medium`}
            noBullet
          />
          <RowDialogCP
            label="Tổng lương"
            noneBorderBottom
            value={formatVND(salary || 0)}
            styleLabel={tw`font-medium`}
            noBullet
          />
        </View>
        <View style={tw.style('w-full')}>
          <Text
            style={tw.style('text-black text-[15px] font-bold my-2 uppercase')}>
            Chi tiết:{' '}
            <Text style={tw.style('text-green-600 text-[12px]')}>
              Đã duyệt xong: {countCompleted}
              {' , '}
            </Text>
            <Text style={tw.style('text-orange-600 text-[12px]')}>
              Đang chờ duyệt: {countPending}
              {' , '}
            </Text>
            <Text style={tw.style(' text-blue-600 text-[12px]')}>
              Duyệt check in: {countApprovedCheckIn}
              {' , '}
            </Text>
            <Text style={tw.style(' text-red-600 text-[12px]')}>
              Đã từ chối: {countRejected}
              {' , '}
            </Text>
            <Text style={tw.style('text-violet-600 text-[12px]')}>
              Tổng: {cards.length}
            </Text>
          </Text>
        </View>
        <View style={tw.style('flex-1')}>
          {fList(cards).length > 0 ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={cards}
              contentContainerStyle={tw.style('flex-grow gap-2')}
              keyExtractor={item => item._id.toString()}
              renderItem={RenderItem}
              nestedScrollEnabled
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
    </View>
  );
}
