/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import {View, RefreshControl} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import styles from './UploadDocumentCss';
import {ScrollView, useToast} from 'native-base';
import stylesStatus from '../../styles/Status';
import ImagePicker from 'react-native-image-crop-picker';
import {ButtonSubmitCp, UploadDocumetnItem} from '../../components';
import {toastShow} from '../../utils/toast';
import {userUploadLicenseSV} from '../../services/user';
import {useAppContext} from '../../utils';
import requestRefreshToken from '../../utils/axios/refreshToken';
import {setCurrentUserPL} from '../../app/payloads/user';
import {adminGetUserByIdSV} from '../../services/admin';
import {URL_SERVER} from '@env';

const UploadDocument = ({navigation}) => {
  const {state, dispatch} = useAppContext();
  const {currentUser, userById} = state;
  const toast = useToast();
  const [refreshing, setRefreshing] = useState(false);
  const [isProcess, setIsProcess] = useState(false);
  const [fileCCCDFront, setFileCCCDFront] = useState(null);
  const [fileCCCDBack, setFileCCCDBack] = useState(null);
  const [fileLicenseFront, setFileLicenseFront] = useState(null);
  const [fileLicenseBack, setFileLicenseBack] = useState(null);
  const [dataImageForm, setDataImageForm] = useState([]);
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
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const handleSelectCCCDFront = async () => {
    await ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      compressImageQuality: 0.7,
      includeBase64: true,
    }).then(image => {
      const object = {
        image: image?.data || image?.image,
        fileName: image.modificationDate
          ? image.modificationDate + '.' + image.mime.split('/')[1]
          : image.filename || image.fileName,
      };
      setFileCCCDFront(
        `data:${image?.mime};base64,${image?.data || image?.image}`,
      );
      setDataImageForm([...dataImageForm, object]);
    });
  };
  const handleSelectCCCDBack = async () => {
    await ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      compressImageQuality: 0.7,
      includeBase64: true,
    }).then(image => {
      const object = {
        image: image?.data || image?.image,
        fileName: image.modificationDate
          ? image.modificationDate + '.' + image.mime.split('/')[1]
          : image.filename || image.fileName,
      };
      setFileCCCDBack(
        `data:${image?.mime};base64,${image?.data || image?.image}`,
      );
      setDataImageForm([...dataImageForm, object]);
    });
  };
  const handleSelectLicenseFront = async () => {
    await ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      compressImageQuality: 0.7,
      includeBase64: true,
    }).then(image => {
      const object = {
        image: image?.data || image?.image,
        fileName: image.modificationDate
          ? image.modificationDate + '.' + image.mime.split('/')[1]
          : image.filename || image.fileName,
      };
      setFileLicenseFront(
        `data:${image?.mime};base64,${image?.data || image?.image}`,
      );
      setDataImageForm([...dataImageForm, object]);
    });
  };
  const handleSelectLicenseBack = async () => {
    await ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      compressImageQuality: 0.7,
      includeBase64: true,
    }).then(image => {
      const object = {
        image: image?.data || image?.image,
        fileName: image.modificationDate
          ? image.modificationDate + '.' + image.mime.split('/')[1]
          : image.filename || image.fileName,
      };
      setFileLicenseBack(
        `data:${image?.mime};base64,${image?.data || image?.image}`,
      );
      setDataImageForm([...dataImageForm, object]);
    });
  };
  const handleSendUploadSV = dataToken => {
    userUploadLicenseSV({
      id_user: currentUser?.id,
      navigation,
      token: dataToken?.token,
      toast,
      imageForm: dataImageForm,
      setIsProcess,
    });
  };
  const handleSubmit = async () => {
    await 1;
    if (
      (userById?.uploadCCCDFont || fileCCCDFront) &&
      (userById?.uploadCCCDBeside || fileCCCDBack) &&
      (userById?.uploadLicenseFont || fileLicenseFront) &&
      (userById?.uploadLicenseBeside || fileLicenseBack)
    ) {
      setIsProcess(true);
      requestRefreshToken(
        currentUser,
        handleSendUploadSV,
        state,
        dispatch,
        setCurrentUserPL,
        toast,
      );
    } else {
      toastShow(toast, 'Vui lòng chọn đầy đủ ảnh');
    }
  };
  console.log(userById);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={[styles.container]}>
      <View style={[styles.item_container]}>
        <UploadDocumetnItem
          title="Căn cước công dân"
          onSelectFront={handleSelectCCCDFront}
          onSelectBack={handleSelectCCCDBack}
          fileUrlFront={
            fileCCCDFront
              ? fileCCCDFront
              : userById?.uploadCCCDFont
              ? `${URL_SERVER}/${userById?.uploadCCCDFont}`
              : ''
          }
          fileUrlBack={
            fileCCCDBack
              ? fileCCCDBack
              : userById?.uploadCCCDBeside
              ? `${URL_SERVER}/${userById?.uploadCCCDBeside}`
              : ''
          }
          textFront="Mặt trước"
          textBack="Mặt sau"
        />
      </View>
      <View style={[styles.item_container]}>
        <UploadDocumetnItem
          title="Giấy phép lái xe"
          onSelectFront={handleSelectLicenseFront}
          onSelectBack={handleSelectLicenseBack}
          fileUrlFront={
            fileLicenseFront
              ? fileLicenseFront
              : userById?.uploadLicenseFont
              ? `${URL_SERVER}/${userById?.uploadLicenseFont}`
              : ''
          }
          fileUrlBack={
            fileLicenseBack
              ? fileLicenseBack
              : userById?.uploadLicenseBeside
              ? `${URL_SERVER}/${userById?.uploadLicenseBeside}`
              : ''
          }
          textFront="Mặt trước"
          textBack="Mặt sau"
        />
      </View>
      <ButtonSubmitCp
        isProcess={isProcess}
        handleSubmit={handleSubmit}
        bgcButton={stylesStatus.confirmbgcbold}
        buttonText="Gửi"
        marginTop={15}
        marginBottom={30}
      />
    </ScrollView>
  );
};

export default UploadDocument;
