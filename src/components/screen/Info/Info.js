import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  RefreshControl,
  ScrollView,
} from 'react-native';
import tw from '../../../styles/twrnc.global';
import {MAIN_COLOR} from '../../../styles/colors.global';
import useAppContext from '../../../utils/hooks/useAppContext';
import RowDialogCP from '../../General/Dialog/RowDialogCP';
import Banner from '../Banner/Banner';
import {useRefreshList} from '../../../utils/refreshList.utils';
import RenderTagCP from '../../General/RenderTag';
import {EMPTY_CHAR} from '../../../helpers/_empty';

export default function InfoScreen({navigation}) {
  const {state} = useAppContext();
  const {refreshing, onRefresh} = useRefreshList();
  const {currentUser} = state.set_data;
  const {email, name, _id, group} = {
    ...currentUser?.user,
  };

  return (
    <SafeAreaView style={tw`flex-1 flex-col bg-[${MAIN_COLOR}]`}>
      <Banner navigation={navigation} />
      <View style={tw.style('p-3 pb-1 bg-white')}>
        <View style={tw.style('rounded-lg bg-white p-2 shadow-md')}>
          <View style={tw.style('flex-row gap-3 items-center')}>
            <View
              style={tw.style(
                'w-[100px] h-[100px] rounded-full overflow-hidden border border-gray-100',
              )}>
              <Image
                source={require('../../../assets/images/logo_company/logo_square.png')}
                style={tw.style('w-full h-full')}
                resizeMode="contain"
              />
            </View>
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
    </SafeAreaView>
  );
}
