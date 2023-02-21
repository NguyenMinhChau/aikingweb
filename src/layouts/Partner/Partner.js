/* eslint-disable prettier/prettier */
import {RefreshControl} from 'react-native';
import React, {useCallback, useState} from 'react';
import styles from './PartnerCss';
import {ScrollView} from 'native-base';
import {Footer, LoginRegisterAction} from '../../components';
import {useAppContext} from '../../utils';

const Partner = ({navigation}) => {
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
        <></>
      )}
      <Footer marginTop={0} marginBottom={20} />
    </ScrollView>
  );
};

export default Partner;
