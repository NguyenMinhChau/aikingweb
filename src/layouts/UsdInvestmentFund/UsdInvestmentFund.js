/* eslint-disable prettier/prettier */
/* eslint-disable radix */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {View, Text, ScrollView, RefreshControl} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import styles from './UsdInvestmentFundCss';
import {formatVND, formatVNDCurency} from '../../utils/format/Money';
import stylesStatus from '../../styles/Status';
import {ModalCp, RowDetail} from '../../components';
import {BLACK_COLOR} from '../../styles/colors';
import {dateFormat} from '../../utils/format/Date';
import {toastShow} from '../../utils/toast';
import {useToast} from 'native-base';
import {
  userCancelContractSV,
  userGetDisbursementByIdContractSV,
} from '../../services/user';
import stylesGeneral from '../../styles/General';
import {useAppContext} from '../../utils';
import requestRefreshToken from '../../utils/axios/refreshToken';
import {setCurrentUserPL} from '../../app/payloads/user';

const UsdInvestmentFund = ({data}) => {
  const toast = useToast();
  const {state, dispatch} = useAppContext();
  const {currentUser} = state;
  const [refreshing, setRefreshing] = useState(false);
  const [isModalDetail, setIsModalDetail] = useState(false);
  const [isProcessModal, setIsProcessModal] = useState(false);
  const [itemFund, setItemFund] = useState(null);
  const [disbursement, setDisbursement] = useState([]);
  let data_usd = data?.contractsUSD?.sort((a, b) => b?.id - a?.id);
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
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
  useEffect(() => {
    data_usd?.map(item => {
      userGetDisbursementByIdContractSV({
        id_contract: item?.id,
        toast,
        setDisbursement,
      });
    });
  }, []);
  if (disbursement?.length <= data_usd?.length) {
    data_usd?.map(item => {
      userGetDisbursementByIdContractSV({
        id_contract: item?.id,
        toast,
        setDisbursement,
      });
    });
  }
  const uniqueDisbursement = disbursement.filter(
    (v, i, a) => a.findIndex(t => t.id === v.id) === i,
  );
  for (let i = 0; i < data_usd?.length; i++) {
    for (let j = 0; j < uniqueDisbursement?.length; j++) {
      if (parseInt(data_usd[i].id) === parseInt(uniqueDisbursement[j].id)) {
        data_usd[i].disbursement = uniqueDisbursement[j].total;
      }
    }
  }
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
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={[styles.container]}>
        <Text style={[styles.text_total]}>
          Tổng số: {data_usd?.length || 0} quỹ đầu tư USD
        </Text>
        {data_usd?.length > 0 ? (
          data_usd?.map((item, index) => {
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
                  {item?.id}/{dateFormat(item?.createdAt, 'YYYY')}/HDQDTUSD-
                  {dateFormat(item?.date_start, 'DD/MM/YYYY')}
                </Text>
                <View style={[styles.timer_contract]}>
                  <Text style={[styles.timer_text]}>{item?.cycle} tháng</Text>
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
          )}/HDQDTUSD`}
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
          text="QUỸ ĐẦU TƯ USD"
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
          text={itemFund?.cycle + ' tháng'}
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

export default UsdInvestmentFund;