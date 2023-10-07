import React from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import tw from '../../../styles/twrnc.global';
import Banner from '../Banner/Banner';
import RowDialogCP from '../../General/Dialog/RowDialogCP';
import {Iconify} from 'react-native-iconify';
import {SCREEN_NAVIGATE} from '../../routersConfig/General.config';
import {AUTH_LOGOUT} from '../../../services/auth';
import useAppContext from '../../../utils/hooks/useAppContext';
import {SET_TOGGLE_PAYLOAD} from '../../Context/AppContext.reducer';
import LoadingScreen from '../../General/LoadingScreen';
import {DATA_SETTING_CONFIG} from './config';
import {IconCP} from '../../../utils/icon.utils';
import {BLACK_COLOR} from '../../../styles/colors.global';

export default function SettingScreen({navigation}) {
  const {state, dispatch} = useAppContext();
  const {submitting} = state.set_toggle;
  const handleLogout = () => {
    AUTH_LOGOUT({dispatch});
    dispatch(SET_TOGGLE_PAYLOAD({key: 'submitting', value: true}));
    setTimeout(() => {
      dispatch(SET_TOGGLE_PAYLOAD({key: 'submitting', value: false}));
      navigation.navigate(SCREEN_NAVIGATE.Login_Screen);
    }, 2000);
  };
  return (
    <>
      {submitting ? (
        <LoadingScreen />
      ) : (
        <View style={tw`flex-1 flex-col bg-white`}>
          <Banner navigation={navigation} />
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={tw.style('p-3 flex-grow bg-white')}>
            <View style={tw.style('rounded-lg bg-white p-2 shadow-md')}>
              {DATA_SETTING_CONFIG.map((item, index) => {
                return (
                  <RowDialogCP
                    key={index}
                    label={item?.label}
                    leftNameIcon={item?.iconName}
                    styleLabel={tw`font-medium`}
                    ValueCP={() => {
                      return (
                        <IconCP
                          size={15}
                          color={BLACK_COLOR}
                          name="chevron-forward-outline"
                        />
                      );
                    }}
                    styleRow={tw`py-3 border-b-[0.5px] ${
                      item?.noneBorderBottom && 'border-b-0'
                    }`}
                    onClickAccord={() => navigation.navigate(item?.router)}
                    noBullet
                  />
                );
              })}
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleLogout}
              style={tw`w-full flex-row gap-2 my-2 rounded-md px-3 py-2 border border-transparent bg-gray-50 items-center justify-center mb-3`}>
              <Text style={tw`text-[15px] font-bold text-black`}>
                Đăng xuất
              </Text>
              <Iconify icon="material-symbols:logout" size={20} color="#000" />
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}
    </>
  );
}
