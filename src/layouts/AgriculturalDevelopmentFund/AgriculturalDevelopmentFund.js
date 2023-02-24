/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {View, Text, ScrollView, RefreshControl} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import styles from './AgriculturalDevelopmentFundCss';
import {formatVND, formatVNDCurency} from '../../utils/format/Money';
import stylesStatus from '../../styles/Status';
import {useToast} from 'native-base';
import {toastShow} from '../../utils/toast';
import {ModalCp, RowDetail} from '../../components';
import {BLACK_COLOR} from '../../styles/colors';
import {dateFormat} from '../../utils/format/Date';
import {
  userCancelContractSV,
  userGetDisbursementByIdContractSV,
} from '../../services/user';
import stylesGeneral from '../../styles/General';
import {useAppContext} from '../../utils';
import requestRefreshToken from '../../utils/axios/refreshToken';
import {setCurrentUserPL} from '../../app/payloads/user';

const AgriculturalDevelopmentFund = ({data}) => {
  const toast = useToast();
  const {state, dispatch} = useAppContext();
  const {currentUser} = state;
  const [refreshing, setRefreshing] = useState(false);
  const [isModalDetail, setIsModalDetail] = useState(false);
  const [isProcessModal, setIsProcessModal] = useState(false);
  const [itemFund, setItemFund] = useState(null);
  const [disbursement, setDisbursement] = useState([]);
  let data_agriculture = data?.agriculture?.sort((a, b) => b?.id - a?.id);
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  useEffect(() => {
    data_agriculture?.map(item => {
      userGetDisbursementByIdContractSV({
        id_contract: item?.id,
        toast,
        setDisbursement,
      });
    });
  }, []);
  if (disbursement?.length <= data_agriculture?.length) {
    data_agriculture?.map(item => {
      userGetDisbursementByIdContractSV({
        id_contract: item?.id,
        toast,
        setDisbursement,
      });
    });
  }
  const uniqueDisbursement = disbursement.filter(
    (v, i, a) => a.findIndex(t => t.disbursement === v.disbursement) === i,
  );
  for (let i = 0; i < data_agriculture?.length; i++) {
    for (let j = 0; j < uniqueDisbursement?.length; j++) {
      if (data_agriculture[i].principal === uniqueDisbursement[j].principal) {
        data_agriculture[i].disbursement = uniqueDisbursement[j].disbursement;
      }
    }
  }
  // console.log('data_agriculture', data_agriculture);
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
  const handleCancelContractSV = (dataToken, id) => {
    userCancelContractSV({
      id_contract: id,
      id_user: currentUser?.id,
      toast,
      token: dataToken?.token,
      setIsProcessModal,
      setIsModalDetail,
      dispatch,
    });
  };
  const handleCancelContract = async id => {
    await 1;
    setIsProcessModal(true);
    requestRefreshToken(
      currentUser,
      handleCancelContractSV,
      state,
      dispatch,
      setCurrentUserPL,
      toast,
      id,
    );
  };
  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={[styles.container]}>
        <Text style={[styles.text_total]}>
          Tổng số: {data_agriculture?.length || 0} quỹ phát triển nông nghiệp
        </Text>
        {data_agriculture?.length > 0 ? (
          data_agriculture?.map((item, index) => {
            return (
              <View key={index} style={[styles.fragment_input_container]}>
                <View style={[stylesGeneral.flexSpaceBetween]}>
                  <Text
                    onPress={() => {
                      setIsModalDetail(true);
                      setItemFund(item);
                    }}
                    style={[styles.text_link]}>
                    Xem chi tiết
                  </Text>
                  <Text
                    style={[
                      styles.text_link,
                      stylesStatus.status,
                      stylesStatus[colorStatus(item) + 'bgc'],
                    ]}>
                    {item?.status}
                  </Text>
                </View>
                <Text style={[styles.code_contract]}>
                  {item?.id}/{dateFormat(item?.createdAt, 'YYYY')}/HDQPTNN-
                  {dateFormat(item?.date_start, 'DD/MM/YYYY')}
                </Text>
                <View style={[styles.timer_contract]}>
                  <Text style={[styles.timer_text]}>{item?.cycle} mùa</Text>
                  <Text style={[styles.timer_assets]}>
                    {formatVND(item?.principal)}
                  </Text>
                </View>
                <Text style={[styles.disbursement, stylesStatus.cancel]}>
                  {item?.disbursement
                    ? formatVNDCurency(item?.disbursement)
                    : 'Đang tải...'}
                </Text>
              </View>
            );
          })
        ) : (
          <Text style={[styles.text_nodata]}>Không có dữ liệu</Text>
        )}
      </ScrollView>
      <ModalCp
        titleModal="Chi tiết hợp đồng"
        stateModal={isModalDetail}
        setModal={setIsModalDetail}
        onPress={() => handleCancelContract(itemFund?.id)}
        isProcessModal={isProcessModal}
        btnText="Hủy hợp đồng">
        <RowDetail
          title="MÃ HD"
          text={`${itemFund?.id}/${dateFormat(
            itemFund?.createdAt,
            'YYYY',
          )}/HDQPTNN`}
          marginLeft={0}
          styleDesc={{flex: 1, textAlign: 'right', color: BLACK_COLOR}}
          colorStatus="cancel"
        />
        <RowDetail
          title="Tên"
          text={currentUser?.username}
          marginLeft={0}
          styleDesc={{flex: 1, textAlign: 'right', color: BLACK_COLOR}}
          marginTop={8}
        />
        <RowDetail
          title="Gói"
          text="QUỸ PHÁT TRIỂN NÔNG NGHIỆP"
          marginLeft={0}
          styleDesc={{flex: 1, textAlign: 'right', color: BLACK_COLOR}}
          marginTop={8}
          colorStatus="vip"
        />
        <RowDetail
          title="Thời gian gửi"
          text={dateFormat(itemFund?.date_start, 'DD/MM/YYYY')}
          marginLeft={0}
          styleDesc={{flex: 1, textAlign: 'right', color: BLACK_COLOR}}
          marginTop={8}
        />
        <RowDetail
          title="Kỳ hạn"
          text={itemFund?.cycle + ' mùa'}
          marginLeft={0}
          styleDesc={{flex: 1, textAlign: 'right', color: BLACK_COLOR}}
          marginTop={8}
        />
        <RowDetail
          title="Vốn"
          text={formatVND(itemFund?.principal)}
          marginLeft={0}
          styleDesc={{flex: 1, textAlign: 'right', color: BLACK_COLOR}}
          marginTop={8}
          colorStatus="confirm"
        />
        <RowDetail
          title="Giải ngân"
          text={formatVNDCurency(itemFund?.disbursement)}
          marginLeft={0}
          styleDesc={{flex: 1, textAlign: 'right', color: BLACK_COLOR}}
          marginTop={8}
          noneBorderBottom
          colorStatus="complete"
        />
      </ModalCp>
    </>
  );
};

export default AgriculturalDevelopmentFund;
