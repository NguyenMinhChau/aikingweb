import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import tw from '../../../styles/twrnc.global';
import {DATA_NAV_PANE} from './NavPane.data';
import AccordionCP from '../../General/AccordionCP';
import useAppContext from '../../../utils/hooks/useAppContext';
import {SET_TOGGLE_PAYLOAD} from '../../Context/AppContext.reducer';
import {SCREEN_NAVIGATE} from '../../routersConfig/General.config';
import {AUTH_LOGOUT} from '../../../services/auth';
import {Iconify} from 'react-native-iconify';
import RenderTagCP from '../../General/RenderTag';

const NavigationMenu = ({navigation}) => {
  const {dispatch, state} = useAppContext();
  const {currentUser, accessToken} = state.set_data;

  const {email, role, authPage} = {...currentUser};

  const [isShowSubMenuLev1, setIsShowSubMenuLev1] = useState(false);
  const [isShowSubMenuLev2, setIsShowSubMenuLev2] = useState(false);
  const [isMenuClicked, setIsMenuClicked] = useState('');

  const onClickMenuItem = item => {
    console.log('Selected menu item:', item);
    setIsMenuClicked(item?.label);
    dispatch(
      SET_TOGGLE_PAYLOAD({
        key: 'isVisible_menu',
        value: false,
      }),
    );
    // Add logic to handle the selected menu item
    navigation.navigate(item?.router);
  };

  const toggleDropdownSubMenuLev1 = item => {
    setIsMenuClicked(item?.label);
    setIsShowSubMenuLev1(!isShowSubMenuLev1);
  };

  const toggleDropdownSubMenuLev2 = () => {
    setIsShowSubMenuLev2(!isShowSubMenuLev2);
  };

  const RenderFlatlist = ({item, index}) => {
    const isOpen =
      item?.subMenuLev1 && isMenuClicked === item?.label
        ? isShowSubMenuLev1
        : false;

    return (
      <AccordionCP
        dataList={item?.subMenuLev1 || []}
        title={item?.label}
        sourceIcon={item?.icon}
        colorDots="#6d55f5"
        onRedirect={itemSubMenu => {
          const itemClick = item?.subMenuLev1 ? itemSubMenu : item;
          onClickMenuItem(itemClick);
        }}
        // MENU SUB 1
        open={isOpen}
        toggleDropDown={
          item?.subMenuLev1 ? () => toggleDropdownSubMenuLev1(item) : () => {}
        }
        // MENU SUB 2
        openSub2={isShowSubMenuLev2}
        toggleDropDownSub2={toggleDropdownSubMenuLev2}
      />
    );
  };

  const handleLogout = () => {
    AUTH_LOGOUT({dispatch, navigation});
  };

  return (
    <SafeAreaView style={tw`w-full h-full flex-col`}>
      <View
        style={tw`w-full px-2 py-4 rounded-lg flex-row gap-2 items-start bg-white`}>
        <Image
          style={tw`w-[40px] h-[40px] rounded-full`}
          source={require('../../../assets/images/logo_company/logo_square.png')}
          resizeMode="contain"
        />
        <View style={tw`flex-col items-start gap-1`}>
          <Text style={tw`text-black font-bold text-[15px]`}>
            {email || 'aiking@gmail.com'}
          </Text>
          <RenderTagCP
            tag={role || 'Admin'}
            styleText={tw.style('text-[10px]')}
          />
        </View>
      </View>
      <View
        style={tw.style('w-full border-b-[1px] border-gray-100 mb-3')}></View>
      <View style={tw`h-full w-full flex-col gap-2 flex-1`}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={DATA_NAV_PANE(authPage)}
          renderItem={RenderFlatlist}
          keyExtractor={(item, _idx) => _idx.toString()}
          contentContainerStyle={tw`flex-grow flex-col gap-3`}
        />
      </View>
      <View style={tw`justify-center items-center`}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleLogout}
          style={tw`w-full flex-row gap-2 rounded-md px-3 py-2 border border-transparent bg-gray-50 items-center justify-center mb-3`}>
          <Text style={tw`text-[15px] font-bold text-black`}>Đăng xuất</Text>
          <Iconify icon="material-symbols:logout" size={20} color="#000" />
        </TouchableOpacity>
        <Image
          source={require('../../../assets/images/logo_company/logo_square.png')}
          style={tw`w-[150px] h-[50px] mb-[30px]`}
          resizeMode="contain"
        />
      </View>
    </SafeAreaView>
  );
};

export default NavigationMenu;
