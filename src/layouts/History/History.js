/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import {RefreshControl, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import styles from './HistoryCss';
import {ScrollView, useToast} from 'native-base';
import DepositsHistory from '../DepositsHistory/DepositsHistory';
import WithdrawHistory from '../WithdrawHistory/WithdrawHistory';
import {Footer, LoginRegisterAction} from '../../components';
import {useAppContext} from '../../utils';
import requestRefreshToken from '../../utils/axios/refreshToken';
import {userGetWithdrawDepositsByUserSV} from '../../services/user';
import {setCurrentUserPL} from '../../app/payloads/user';

const LIST_TABS = [
  {
    id: 1,
    name: 'Nạp tiền',
    componet: DepositsHistory,
  },
  {
    id: 2,
    name: 'Rút tiền',
    componet: WithdrawHistory,
  },
];

const History = ({navigation}) => {
  const toast = useToast();
  const {state, dispatch} = useAppContext();
  const {currentUser} = state;
  const [refreshing, setRefreshing] = useState(false);
  const [isTab, setIsTab] = useState(1);
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const handleSendGetAllWithdrawDeposits = dataToken => {
    userGetWithdrawDepositsByUserSV({
      id_user: currentUser?.id,
      toast,
      token: dataToken?.token,
      dispatch,
    });
  };
  useEffect(() => {
    requestRefreshToken(
      currentUser,
      handleSendGetAllWithdrawDeposits,
      state,
      dispatch,
      setCurrentUserPL,
      toast,
    );
  }, []);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={[styles.container]}>
      {!currentUser ? (
        <LoginRegisterAction
          navigation={navigation}
          paddingVertical={20}
          paddingHorizontal={10}
        />
      ) : (
        <>
          <View style={[styles.list_actions]}>
            {LIST_TABS.map((item, index) => {
              return (
                <View
                  key={index}
                  style={[
                    styles.actions_item,
                    index === LIST_TABS.length - 1 && styles.borderRight,
                    isTab === item?.id && styles.active,
                  ]}
                  onTouchStart={() => setIsTab(item?.id)}>
                  <Text style={[styles.item_text]}>{item.name}</Text>
                </View>
              );
            })}
          </View>
          {/* <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      </ScrollView> */}
          <View style={[styles.body]}>
            {/* <Text style={[styles.text_desc]}>Giao diện demo</Text> */}
            {LIST_TABS.map((Item, index) => {
              return (
                isTab === Item?.id && (
                  <Item.componet navigation={navigation} key={index} />
                )
              );
            })}
          </View>
        </>
      )}

      <Footer marginTop={0} marginBottom={20} />
    </ScrollView>
  );
};

export default History;
