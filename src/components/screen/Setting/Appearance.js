import React from 'react';
import {
  View,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useColorScheme} from 'react-native';
import tw from '../../../styles/twrnc.global';
import {MAIN_COLOR} from '../../../styles/colors.global';
import {Iconify} from 'react-native-iconify';
import RadioGroupCP from '../../General/RadioGroupCP';
import useAppContext from '../../../utils/hooks/useAppContext';
import {
  getAsyncCacheSettingAppearance,
  setAsyncCacheSettingAppearance,
} from '../../../utils/cache.services';

export default function AppearanceScreen({navigation}) {
  const {state, dispatch} = useAppContext();
  const {appearance_display} = state.set_data;
  const displaySystem = useColorScheme();
  const handleChange = async value => {
    await setAsyncCacheSettingAppearance(value);
    await getAsyncCacheSettingAppearance(dispatch);
  };
  const DATA_RADIO_APPEARANCE = [
    {label: 'Hệ thống', value: displaySystem || 'light'},
    {label: 'Tối', value: 'dark-no-system'},
    {label: 'Sáng', value: 'light-no-system'},
  ];
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
            source={require('../../../assets/images/logo_company/logo_square.png')}
            style={tw`w-full h-full`}
            resizeMode="contain"
          />
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw.style('p-3 flex-grow bg-white')}>
        <View style={tw`flex-col gap-2`}>
          <View style={tw`flex-col gap-2`}>
            <RadioGroupCP
              dataOptions={DATA_RADIO_APPEARANCE}
              valueSelect={appearance_display}
              setValSelect={val => handleChange(val)}
              style={tw`border-r-transparent items-center justify-start px-0`}
              styleLabel={tw`text-black font-medium ml-2`}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
