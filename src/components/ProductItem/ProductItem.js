/* eslint-disable prettier/prettier */
import {View, Text, ImageBackground} from 'react-native';
import React from 'react';
import styles from './ProductItemCss';

const ProductItem = ({
  url,
  uri,
  titleHeader,
  timer,
  timer_desc,
  interest_rate,
  resetMargin,
  onTouchStart,
}) => {
  return (
    <View
      onTouchStart={onTouchStart}
      style={[
        styles.product_item,
        resetMargin && styles.product_item_margin_reset,
      ]}>
      <ImageBackground
        source={
          url
            ? {
                uri: `${url}`,
              }
            : uri
        }
        borderRadius={15}
        style={[styles.product_item_image]}
        resizeMode="cover">
        <View style={[styles.info_product]}>
          <View>
            <View style={[styles.product_item_text_overlay]}>
              <Text style={[styles.overlay_text]}>{titleHeader}</Text>
            </View>
            <View style={[styles.product_timer]}>
              <Text style={[styles.timer_text]}>{timer}</Text>
            </View>
            <View style={[styles.product_ext]}>
              <Text style={[styles.ext_text]}>{timer_desc}</Text>
            </View>
          </View>
          <View>
            <View style={[styles.interest_rate]}>
              <Text style={[styles.interest_rate_number]}>{interest_rate}</Text>
              <Text style={[styles.interest_rate_percent]}>%/năm</Text>
            </View>
            <View style={[styles.interest_rate_desc]}>
              <Text style={[styles.interest_rate_desc_text]}>
                Lợi nhuận mục tiêu
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default ProductItem;
