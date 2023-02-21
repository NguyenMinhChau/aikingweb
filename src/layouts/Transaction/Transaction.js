/* eslint-disable prettier/prettier */
import {RefreshControl, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import styles from './TransactionCss';
import {ScrollView} from 'native-base';
import {Footer, LoginRegisterAction} from '../../components';
import {useAppContext} from '../../utils';

const Transaction = ({navigation}) => {
  const {state} = useAppContext();
  const {currentUser} = state;
  const [refreshing, setRefreshing] = useState(false);
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
      {!currentUser ? (
        <LoginRegisterAction navigation={navigation} marginBottom={15} />
      ) : (
        <View style={[styles.fragment_input_container]}>
          <Text style={[styles.text_desc]}>
            Giao diện đang phát triển, vui lòng quay lại sau. Xin cảm ơn!
          </Text>
        </View>
      )}
      <Footer marginTop={20} marginBottom={20} />
    </ScrollView>
  );
};

export default Transaction;
