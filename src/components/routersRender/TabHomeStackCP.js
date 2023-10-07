import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SCREEN_NAVIGATE} from '../routersConfig/General.config';
import TabHomeStackRouterObj from '../routersConfig/TabHomeStack.config';
import useAppContext from '../../utils/hooks/useAppContext';
import {isValidToken} from '../../services/jwt';
import {
  getAsyncCacheAccessToken,
  getAsyncCacheCurrentUser,
  getAsyncCacheLoaderSliderUsed,
} from '../../utils/cache.services';

const Stack = createNativeStackNavigator();

export default function TabHomeStackCP() {
  const {state, dispatch} = useAppContext();
  const {accessToken, currentUser} = state.set_data;

  React.useEffect(() => {
    getAsyncCacheLoaderSliderUsed(dispatch);
    getAsyncCacheCurrentUser(dispatch);
    getAsyncCacheAccessToken(dispatch);
  }, []);

  const isCheckLogin =
    currentUser?.user?.email && isValidToken(accessToken?.accessToken);

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
              options={{
                presentation: 'containedTransparentModal',
                animationTypeForReplace: 'push',
                animation: 'fade',
                ...navigationOptions,
              }}
            />
          );
        })}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
