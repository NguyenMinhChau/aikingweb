/* eslint-disable prettier/prettier */
import {View, Text, RefreshControl} from 'react-native';
import React, {useCallback, useState} from 'react';
import styles from './ContractProvisionsCss';
import {ScrollView} from 'native-base';

const ContractProvisions = () => {
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
      <View style={[styles.fragment_input_container]}>
        <Text style={[styles.text_desc]}>Giao diện đang được phát triển!</Text>
      </View>
    </ScrollView>
  );
};

export default ContractProvisions;
