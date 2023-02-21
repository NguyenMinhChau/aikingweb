/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {View, RefreshControl, Text} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import styles from './WithdrawHistoryCss';
import {ScrollView, useToast} from 'native-base';
import {RowDetail} from '../../components';
import {BLACK_COLOR, PRIMARY_COLOR} from '../../styles/colors';
import {dateFormat} from '../../utils/format/Date';
import {formatVND} from '../../utils/format/Money';
import {useAppContext} from '../../utils';
import {userGetWithdrawByUserSV} from '../../services/user';
import requestRefreshToken from '../../utils/axios/refreshToken';
import {setCurrentUserPL} from '../../app/payloads/user';
import stylesGeneral from '../../styles/General';
import {routersMain} from '../../routers/Main';
import {adminGetUserByIdSV} from '../../services/admin';

const WithdrawHistory = ({navigation}) => {
  const toast = useToast();
  const {state, dispatch} = useAppContext();
  const {currentUser, dataWithdrawsHistory, userById} = state;
  const [refreshing, setRefreshing] = useState(false);
  // const [data, setData] = useState([]);
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  useEffect(() => {
    if (currentUser) {
      adminGetUserByIdSV({
        id_user: currentUser?.id,
        dispatch,
        toast,
      });
    }
  }, [currentUser]);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    requestRefreshToken(
      currentUser,
      handleSendWithdraw,
      state,
      dispatch,
      setCurrentUserPL,
      toast,
    );
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const handleSendWithdraw = dataToken => {
    userGetWithdrawByUserSV({
      id_user: currentUser?.id,
      toast,
      token: dataToken?.token,
      dispatch,
    });
  };
  useEffect(() => {
    requestRefreshToken(
      currentUser,
      handleSendWithdraw,
      state,
      dispatch,
      setCurrentUserPL,
      toast,
    );
  }, []);
  const sortDateASC = x => {
    return x.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  };
  const colorStatus = item => {
    switch (item?.status) {
      case 'Completed':
      case 'Actived':
        return 'complete';
      case 'Pending':
      case 'Confirmed':
        return 'vip';
      case 'Canceled':
        return 'cancel';
      default:
        return 'confirm';
    }
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={[styles.container]}>
      {dataWithdrawsHistory?.length > 0 ? (
        sortDateASC(dataWithdrawsHistory)?.map((item, index) => {
          return (
            <View key={index} style={[styles.fragment_input_container]}>
              {item?.status === 'Pending' && (
                <Text
                  style={[styles.text_link]}
                  onPress={() => {
                    navigation.navigate({
                      name: routersMain.VerifyWithdraw,
                      params: {
                        data: {
                          data: item,
                          accountNumber: userById?.payment?.bank?.account,
                          accountName: userById?.payment?.bank?.name,
                          bankName: userById?.payment?.bank?.bankName,
                        },
                      },
                    });
                  }}>
                  Xác thực
                </Text>
              )}
              <RowDetail
                title="Trạng thái"
                text={item?.status}
                marginLeft={0}
                colorIconFront={PRIMARY_COLOR}
                styleDesc={{flex: 1, textAlign: 'right', color: PRIMARY_COLOR}}
                colorStatus={colorStatus(item)}
              />
              <RowDetail
                title="Hình thức"
                text="Rút tiền"
                marginLeft={0}
                colorIconFront={PRIMARY_COLOR}
                styleDesc={{flex: 1, textAlign: 'right', color: BLACK_COLOR}}
                marginTop={10}
              />
              <RowDetail
                title="Ngày rút"
                text={dateFormat(item?.createdAt, 'DD/MM/YYYY HH:mm:ss')}
                marginLeft={0}
                colorIconFront={PRIMARY_COLOR}
                styleDesc={{flex: 1, textAlign: 'right', color: BLACK_COLOR}}
                marginTop={10}
              />
              <RowDetail
                title="Số tiền"
                text={formatVND(item?.amount)}
                marginLeft={0}
                colorIconFront={PRIMARY_COLOR}
                styleDesc={{flex: 1, textAlign: 'right', color: BLACK_COLOR}}
                marginTop={10}
                noneBorderBottom
              />
            </View>
          );
        })
      ) : (
        <View style={[styles.fragment_input_container]}>
          <View style={[stylesGeneral.text_center]}>
            <Text style={[styles.text_nodata]}>Không có lịch sử rút</Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default WithdrawHistory;
