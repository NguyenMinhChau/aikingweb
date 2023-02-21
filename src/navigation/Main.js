/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {useAppContext} from '../utils';
import MainObject, {routersMain} from '../routers/Main';
import {setMessage} from '../app/payloads/message';
import {PRIMARY_COLOR, WHITE_COLOR} from '../styles/colors';
import {getAsyncStore} from '../utils/localStore/localStore';

const Stack = createNativeStackNavigator();
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: PRIMARY_COLOR,
    background: '#fafafa',
  },
};

export default function Main({navigation}) {
  const {state, dispatch} = useAppContext();
  const {
    message: {del, upd, cre, error},
  } = state;
  useEffect(() => {
    if (error || del || cre || upd) {
      setTimeout(() => {
        dispatch(
          setMessage({
            error: '',
            del: '',
            upd: '',
            cre: '',
          }),
        );
      }, 3000);
    }
  });
  useEffect(() => {
    getAsyncStore(dispatch);
  }, []);
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        initialRouteName={routersMain.MainPage}
        screenOptions={{
          headerShown: false,
        }}>
        {MainObject.map((item, index) => {
          return (
            <Stack.Screen
              key={index}
              name={item.name}
              component={item.component}
              options={
                item.options === 'headerNull'
                  ? {header: () => null}
                  : item.options === 'custom'
                  ? {
                      title:
                        item?.name === routersMain.SendFunds ||
                        item?.name === routersMain.FundManagement ||
                        item?.name === routersMain.InterestRateTable ||
                        item?.name === routersMain.Fund
                          ? ''
                          : item.name,
                      headerShown:
                        item?.name === routersMain.SendFunds ||
                        item?.name === routersMain.FundManagement ||
                        item?.name === routersMain.InterestRateTable ||
                        item?.name === routersMain.Fund
                          ? false
                          : true,
                      headerTitleAlign: 'center',
                      headerTintColor: WHITE_COLOR,
                      headerTitleStyle: {
                        fontWeight: 'bold',
                        letterSpacing: 1,
                      },
                      headerStyle: {
                        backgroundColor: PRIMARY_COLOR,
                      },
                    }
                  : {}
              }
            />
          );
        })}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
