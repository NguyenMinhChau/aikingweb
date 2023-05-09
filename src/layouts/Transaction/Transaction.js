/* eslint-disable prettier/prettier */
import {RefreshControl, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import styles from './TransactionCss';
import {ScrollView} from 'native-base';
import {Footer, LoginRegisterAction} from '../../components';
import {useAppContext} from '../../utils';
import DepositsHistory from '../DepositsHistory/DepositsHistory';
import WithdrawHistory from '../WithdrawHistory/WithdrawHistory';

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

const Transaction = ({navigation}) => {
  const {state} = useAppContext();
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
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={[styles.container]}>
      {/* <View style={[styles.fragment_input_container]}>
          <Text style={[styles.text_desc]}>
            Giao diện đang phát triển, vui lòng quay lại sau. Xin cảm ơn!
          </Text>
        </View> */}
      {!currentUser ? (
        <LoginRegisterAction
          navigation={navigation}
          marginBottom={15}
          marginTop={20}
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
          <View style={[styles.body]}>
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
      <Footer marginTop={20} marginBottom={20} />
    </ScrollView>
  );
};

export default Transaction;
