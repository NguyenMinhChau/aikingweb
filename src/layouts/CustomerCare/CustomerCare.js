/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {RefreshControl, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import styles from './CustomerCareCss';
import {ScrollView} from 'native-base';
import {Footer, RowDetail} from '../../components';
import {useAppContext} from '../../utils';
import {
  BLACK_COLOR,
  CANCEL_COLOR,
  COMPLETE_COLOR,
  PRIMARY_COLOR,
} from '../../styles/colors';

const CustomerCare = ({navigation}) => {
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
      <View style={[styles.fragment_input_container]}>
        <Text style={[styles.text_title]}>
          Quý khách có bất kỳ thắc mắc nào vui lòng liên hệ:{' '}
        </Text>
        <RowDetail
          title="Hotline"
          text="0345 335 422"
          colorIconFront={COMPLETE_COLOR}
          styleDesc={{flex: 1, textAlign: 'right', color: BLACK_COLOR}}
          marginTop={10}
          nameIconFront="phone"
          marginLeft={10}
          marginRight={8}
        />
        <RowDetail
          title="Zalo"
          text="0345 335 422 (Thắm Đặng)"
          colorIconFront={CANCEL_COLOR}
          styleDesc={{flex: 1, textAlign: 'right', color: BLACK_COLOR}}
          marginTop={10}
          nameIconFront="comment"
          marginLeft={10}
          marginRight={8}
        />
        <RowDetail
          title="Facebook"
          text="https://www.facebook.com/thamdanginvestments/"
          urlLink="https://www.facebook.com/thamdanginvestments/"
          colorIconFront={PRIMARY_COLOR}
          nameIconFront="facebook-square"
          styleDesc={{flex: 1, textAlign: 'right', color: PRIMARY_COLOR}}
          marginTop={10}
          marginRight={8}
          marginLeft={10}
        />
        <RowDetail
          title="Telegram"
          text="0345335422 (@luckymoon102)"
          marginLeft={10}
          nameIconFront="bell"
          colorIconFront={PRIMARY_COLOR}
          styleDesc={{flex: 1, textAlign: 'right', color: BLACK_COLOR}}
          noneBorderBottom
          marginTop={10}
          marginRight={8}
        />
        <Text style={[styles.text_footer]}>
          AIKING INVESTMENT chân thành cảm ơn quý nhà Đầu tư.
        </Text>
      </View>
      <Footer marginTop={20} marginBottom={20} />
    </ScrollView>
  );
};

export default CustomerCare;
