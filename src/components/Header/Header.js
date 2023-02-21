/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {useAppContext} from '../../utils';
import {getUserById} from '../../app/payloads/getById';
import {setCurrentUser} from '../../app/payloads/user';
import styles from './HeaderCss';
import stylesGeneral from '../../styles/General';
import stylesStatus from '../../styles/Status';
import {formatUSDT} from '../../utils/format/Money';
import {getAsyncStore} from '../../utils/localStore/localStore';

export default function Header({refreshData = () => {}}) {
  const {state, dispatch} = useAppContext();
  const {currentUser, userById} = state;
  useEffect(() => {
    getAsyncStore(dispatch);
    // if (currentUser) {
    //   SVgetUserById({
    //     id: currentUser?.id,
    //     dispatch,
    //     getUserById,
    //   });
    // }
  }, []);
  const handleRefreshUSDT = () => {
    refreshData();
    // SVgetUserById({
    //   id: currentUser?.id,
    //   dispatch,
    //   getUserById,
    //   setBalance,
    //   currentUser,
    //   setCurrentUser,
    // });
  };
  return <View style={[styles.container]}></View>;
}
