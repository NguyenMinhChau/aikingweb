/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import {View, Text, RefreshControl} from 'react-native';
import React, {useCallback, useState} from 'react';
import styles from './ContactCss';
import {ScrollView} from 'native-base';

const Contact = () => {
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
      <Text style={[styles.text]}>
        If you have any questions about Provident Fund, do not hesitate to
        contact our support team by:{' '}
        <Text style={[styles.email]}>spprovidentfund@gmail.com</Text>
      </Text>
    </ScrollView>
  );
};

export default Contact;
