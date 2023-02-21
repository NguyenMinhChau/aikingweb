/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {View, Text} from 'react-native';
import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import styles from './PackFutureItemCss';

const PackFutureItem = ({
  money,
  percent,
  timer,
  totalInterest,
  onTouchStart,
}) => {
  return (
    <View style={[styles.future_pack_item]}>
      <View style={[styles.future_pack_item_header]}>
        <Text style={[styles.future_pack_item_header_money]}>{money}</Text>
        <View style={[styles.future_pack_item_desc_end_container]}>
          <Text style={[styles.future_pack_item_desc_text]}>Lãi suất năm</Text>
          <Text style={[styles.future_pack_item_desc_percent, styles.red]}>
            {percent}
          </Text>
        </View>
      </View>
      <View style={[styles.future_pack_item_middle]}>
        <View style={[styles.future_pack_item_desc_start_container]}>
          <Text style={[styles.future_pack_item_desc_text]}>
            Thời gian đầu tư
          </Text>
          <Text style={[styles.future_pack_item_desc_percent, styles.black]}>
            {timer} tháng
          </Text>
        </View>
        <View style={[styles.future_pack_item_desc_end_container]}>
          <Text style={[styles.future_pack_item_desc_text]}>
            Tổng lãi dự kiến
          </Text>
          <Text style={[styles.future_pack_item_desc_percent]}>
            {totalInterest}
          </Text>
        </View>
      </View>
      <View style={[styles.future_pack_item_footer]}>
        <View style={[styles.future_pack_item_desc_start_container]}>
          <Text style={[styles.future_pack_item_desc_text]}>Hình thức trả</Text>
          <Text
            style={[
              styles.future_pack_item_desc_percent,
              styles.fz16,
              styles.black,
              {marginRight: 8},
            ]}>
            Lãi hằng tháng, gốc hằng tháng
          </Text>
        </View>
        <View
          style={[styles.future_pack_item_btn_container]}
          onTouchStart={onTouchStart}>
          <Text style={[styles.future_pack_item_desc_text_btn]}>
            Đầu tư ngay
          </Text>
          <FontAwesome5 name="chart-line" size={20} color="#fff" />
        </View>
      </View>
    </View>
  );
};

export default PackFutureItem;
