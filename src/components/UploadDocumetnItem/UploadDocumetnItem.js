/* eslint-disable prettier/prettier */
import {View, Text, Image} from 'react-native';
import React from 'react';
import styles from './UploadDocumetnItemCss';
import stylesStatus from '../../styles/Status';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const UploadDocumetnItem = ({
  title,
  onSelectFront,
  fileUrlFront,
  onSelectBack,
  fileUrlBack,
  textFront,
  textBack,
}) => {
  return (
    <>
      <Text style={[styles.text_title]}>{title}</Text>
      <View style={[styles.image_container]}>
        <View style={[styles.image_item]}>
          <View
            style={[styles.btn, stylesStatus.confirmbgcbold]}
            onTouchStart={onSelectFront}>
            <FontAwesome5 name="camera" size={15} color="#fff" />
            <Text style={[styles.text_btn]}>{textFront}</Text>
          </View>
          {fileUrlFront && (
            <View style={[styles.image_view_container]}>
              <Image
                source={{uri: fileUrlFront}}
                style={[styles.image_view]}
                alt="image_license"
                resizeMode="contain"
              />
            </View>
          )}
        </View>
        <View style={[styles.image_item]}>
          <View
            style={[styles.btn, stylesStatus.confirmbgcbold]}
            onTouchStart={onSelectBack}>
            <FontAwesome5 name="camera" size={15} color="#fff" />
            <Text style={[styles.text_btn]}>{textBack}</Text>
          </View>
          {fileUrlBack && (
            <View style={[styles.image_view_container]}>
              <Image
                source={{uri: fileUrlBack}}
                style={[styles.image_view]}
                alt="image_license"
                resizeMode="contain"
              />
            </View>
          )}
        </View>
      </View>
    </>
  );
};

export default UploadDocumetnItem;
