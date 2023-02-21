/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import React, {useState} from 'react';
import RouterObject, {routers} from '../routers/Routers';
import {ImageBackground, View} from 'react-native';
import styles from './indexCss';
import Top from '../HeaderStyles/Top';
import WelcomeHD from '../HeaderStyles/WelcomeHD';
import LoginRegisterHD from '../HeaderStyles/LoginRegisterHD';
import {useAppContext} from '../utils';
import {PRIMARY_COLOR, WHITE_COLOR} from '../styles/colors';
import {routersMain} from '../routers/Main';

const Tab = createBottomTabNavigator();

export default function Routers({navigation}) {
  const {state} = useAppContext();
  const {currentUser} = state;
  const [showEye, setShowEye] = useState(false);
  const handleShowEye = () => {
    setShowEye(!showEye);
  };
  return (
    <Tab.Navigator initialRouteName={routers.Home}>
      {RouterObject.map((item, index) => {
        return (
          <Tab.Screen
            key={index}
            name={item?.custom ? ' ' : item?.name}
            component={item?.component}
            options={{
              tabBarHideOnKeyboard: true,
              headerTitleAlign: 'center',
              headerTintColor: WHITE_COLOR,
              headerTitleStyle: {
                fontWeight: 'bold',
                letterSpacing: 1,
              },
              tabBarLabelStyle: {
                fontSize: 12,
                fontWeight: 'bold',
              },
              headerShown: item?.name === routers.Home ? false : true,
              headerTitle: item?.name,
              // item?.name === routers.Home
              //   ? () => (
              //       <View style={[styles.container]}>
              //         <Top showEye={showEye} onTouchStart={handleShowEye} />
              //         <WelcomeHD showEye={showEye} />
              //         {!currentUser && (
              //           <LoginRegisterHD navigation={navigation} />
              //         )}
              //       </View>
              //     )
              //   : item?.name,

              headerStyle: {
                backgroundColor: PRIMARY_COLOR,
                // height:
                //   item.name === routers.Home ? (currentUser ? 130 : 190) : 50,
                // borderBottomLeftRadius: item.name === routers.Home ? 30 : 0,
                // borderBottomRightRadius: item.name === routers.Home ? 30 : 0,
              },
              tabBarIcon: item?.custom
                ? () => (
                    <View style={[styles.tabBarIconCustom]}>
                      <FontAwesome5
                        name={'bitcoin'}
                        size={25}
                        color={WHITE_COLOR}
                      />
                    </View>
                  )
                : ({focused, color, size}) => (
                    <FontAwesome5
                      name={item.icon}
                      size={20}
                      color={focused ? PRIMARY_COLOR : color}
                    />
                  ),
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
}
