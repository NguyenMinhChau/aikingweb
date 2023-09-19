import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SCREEN_NAVIGATE} from '../routersConfig/General.config';
import TabHomeStackRouterObj from '../routersConfig/TabHomeStack.config';
import useAppContext from '../../utils/hooks/useAppContext';
import {isValidToken} from '../../services/jwt';

const Stack = createNativeStackNavigator();

export default function TabHomeStackCP() {
  const {state} = useAppContext();
  const {accessToken, currentUser} = state.set_data;

  const isCheckLogin =
    currentUser?.user?.email &&
    accessToken &&
    isValidToken(accessToken?.accessToken);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={
          isCheckLogin
            ? SCREEN_NAVIGATE.Bottom_Tab_Screen
            : SCREEN_NAVIGATE.Login_Screen
        }
        screenOptions={{
          headerShown: false,
        }}>
        {Object.keys(TabHomeStackRouterObj).map((key, index) => {
          const {screen, navigationOptions} = {
            ...TabHomeStackRouterObj[key],
          };
          return (
            <Stack.Screen
              key={index}
              name={key}
              component={screen}
              options={navigationOptions}
            />
          );
        })}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
