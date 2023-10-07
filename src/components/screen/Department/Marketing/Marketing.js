import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import tw from '../../../../styles/twrnc.global';
import Banner from '../../Banner/Banner';
import RowDialogCP from '../../../General/Dialog/RowDialogCP';
import {Iconify} from 'react-native-iconify';
import {SCREEN_NAVIGATE} from '../../../routersConfig/General.config';
import BannerNestedScreen from '../../../General/BannerNestedScreen';

export default function MarketingScreen({navigation}) {
  return (
    <View style={tw`flex-1 flex-col bg-white`}>
      <BannerNestedScreen navigation={navigation} title="Marketing" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw.style('p-3 flex-grow bg-white')}>
        <View style={tw.style('rounded-lg bg-white p-2 shadow-md')}>
          <RowDialogCP
            label="Tính lương"
            noneBorderBottom
            styleLabel={tw`font-medium`}
            ValueCP={() => {
              return (
                <Iconify size={25} color="#000" icon="ic:round-arrow-right" />
              );
            }}
            onClickAccord={() => {
              navigation.navigate({
                name: SCREEN_NAVIGATE.Calculator_Screen,
                params: {
                  data: [],
                },
              });
            }}
            noBullet
          />
        </View>
      </ScrollView>
    </View>
  );
}
