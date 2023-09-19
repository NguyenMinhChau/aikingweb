import React from 'react';
import {View} from 'react-native';
import {BottomNavigation} from 'react-native-paper';
import tw from '../../styles/twrnc.global';

export default function BottomTabCP({
  index,
  setIndex,
  routes,
  renderScene,
  isShowLabel = true,
  activeColor = '#3266ff', // label color
  bgIcon = '#fff',
  shifting = false,
}) {
  return (
    <BottomNavigation
      navigationState={{index, routes}}
      onIndexChange={setIndex}
      renderScene={renderScene}
      theme={{colors: {secondaryContainer: bgIcon}}}
      renderIcon={({route, focused, color}) => {
        return (
          <View style={tw`items-center justify-center h-full w-full`}>
            {route.icon}
          </View>
        );
      }}
      activeColor={activeColor}
      labeled={isShowLabel}
      barStyle={tw`bg-gray-50`}
      shifting={shifting}
      keyboardHidesNavigationBar={true}
    />
  );
}
