/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {View, RefreshControl, Text, Image} from 'react-native';
import React, {useCallback, useState} from 'react';
import styles from './UploadDepositsCss';
import {ScrollView, useToast} from 'native-base';
import {ButtonSubmitCp, Footer, RowDetail} from '../../components';
import {BLACK_COLOR, PRIMARY_COLOR, WHITE_COLOR} from '../../styles/colors';
import {dateFormat} from '../../utils/format/Date';
import {formatUSD, formatVND} from '../../utils/format/Money';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ImagePicker from 'react-native-image-crop-picker';
import stylesStatus from '../../styles/Status';
import {toastShow} from '../../utils/toast';
import {routersMain} from '../../routers/Main';
import {setDepositsPL} from '../../app/payloads/deposits';
import {useAppContext} from '../../utils';
import {
  userGetDepositsByUserSV,
  userUploadBillsDepositsSV,
} from '../../services/user';
import requestRefreshToken from '../../utils/axios/refreshToken';
import {setCurrentUserPL} from '../../app/payloads/user';
import {URL_SERVER} from '@env';
import Clipboard from '@react-native-community/clipboard';

const UploadDeposits = ({navigation, route}) => {
  const toast = useToast();
  const {state, dispatch} = useAppContext();
  const {currentUser} = state;
  const {data, itemBank} = route.params;
  const [refreshing, setRefreshing] = useState(false);
  const [isProcess, setIsProcess] = useState(false);
  const [fileResponseDeposits, setFileResponseDeposits] = useState(null);
  const [dataImageForm, setDataImageForm] = useState([]);
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setIsProcess(false);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const handleDocumentSelectionDeposits = async () => {
    await ImagePicker.openPicker({
      width: 300,
      height: 400,
      // cropping: true,
      compressImageQuality: 0.7,
      includeBase64: true,
    }).then(image => {
      const object = {
        image: image?.data || image?.image,
        fileName: image.modificationDate
          ? image.modificationDate + '.' + image.mime.split('/')[1]
          : image.filename || image.fileName,
      };
      setFileResponseDeposits(
        `data:${image?.mime};base64,${image?.data || image?.image}`,
      );
      setDataImageForm([...dataImageForm, object]);
    });
  };
  const handleUploadBill = dataToken => {
    userUploadBillsDepositsSV({
      id_deposits: data?.id,
      id_user: currentUser?.id,
      dispatch,
      image: dataImageForm,
      toast,
      setIsProcess,
      navigation,
      token: dataToken?.token,
    });
  };
  const handleSubmit = async () => {
    await 1;
    if (!fileResponseDeposits) {
      toastShow(toast, 'Vui lòng chọn ảnh');
    } else {
      setIsProcess(true);
      requestRefreshToken(
        currentUser,
        handleUploadBill,
        state,
        dispatch,
        setCurrentUserPL,
        toast,
        data?.id,
      );
      dispatch(
        setDepositsPL({
          amount: '',
          bankId: '',
        }),
      );
    }
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
  const copyToClipboard = value => {
    Clipboard.setString(value);
    toastShow(toast, 'Sao chép thành công.');
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={[styles.container]}>
      <View style={[styles.fragment_input_container]}>
        <RowDetail
          title="Trạng thái"
          text={data?.status}
          marginLeft={0}
          marginRight={8}
          colorIconFront={PRIMARY_COLOR}
          styleDesc={{flex: 1, textAlign: 'right', color: PRIMARY_COLOR}}
          colorStatus={colorStatus(data)}
        />
        <RowDetail
          title="Ngày tạo"
          text={dateFormat(data?.createdAt, 'DD/MM/YYYY HH:mm:ss')}
          marginLeft={0}
          marginRight={8}
          colorIconFront={PRIMARY_COLOR}
          styleDesc={{flex: 1, textAlign: 'right', color: BLACK_COLOR}}
          marginTop={10}
        />
        <RowDetail
          title="Số tiền nạp"
          text={formatVND(data?.amount)}
          marginLeft={0}
          marginRight={8}
          colorIconFront={PRIMARY_COLOR}
          styleDesc={{flex: 1, textAlign: 'right', color: BLACK_COLOR}}
          marginTop={10}
        />
        <RowDetail
          title="Ngân hàng thụ hưởng"
          marginLeft={0}
          marginRight={8}
          colorIconFront={PRIMARY_COLOR}
          styleDesc={{flex: 1, textAlign: 'right', color: BLACK_COLOR}}
          marginTop={10}
          bankMethod
          nameBank={itemBank?.name}
          accountNumber={itemBank?.accountNumber}
          accountName={itemBank?.accountName}
          maxWidth={100}
          copy
          funcCopy={copyToClipboard}
        />
        <View
          style={[styles.btn_upload_container, stylesStatus.primarybgcbold]}
          onTouchStart={handleDocumentSelectionDeposits}>
          <FontAwesome5 name="upload" size={20} color={WHITE_COLOR} />
          <Text style={[styles.btn_upload_text]}>Chọn ảnh</Text>
        </View>
        {(fileResponseDeposits || data?.statement) && (
          <View style={[styles.image_container]}>
            <Image
              source={{
                uri: fileResponseDeposits
                  ? fileResponseDeposits
                  : `${URL_SERVER}${data?.statement}`,
              }}
              style={[styles.image]}
              resizeMode="contain"
            />
          </View>
        )}
      </View>
      <ButtonSubmitCp
        isProcess={isProcess}
        handleSubmit={handleSubmit}
        bgcButton={stylesStatus.confirmbgcbold}
        buttonText="Tiếp tục"
        marginTop={15}
      />
      <Footer marginTop={20} marginBottom={20} />
    </ScrollView>
  );
};

export default UploadDeposits;
