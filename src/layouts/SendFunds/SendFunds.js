/* eslint-disable prettier/prettier */
/* eslint-disable radix */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import {Text, RefreshControl, View, ImageBackground} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import styles from './SendFundsCss';
import {
  AssetsTotalCp,
  ButtonSubmitCp,
  InputItem,
  ModalCp,
  RowDetail,
  SelectValueCp,
  TimerPickerCp,
} from '../../components';
import {ScrollView, useToast} from 'native-base';
import {useAppContext} from '../../utils';
import {setFundsPL} from '../../app/payloads/sendFunds';
import stylesGeneral from '../../styles/General';
import stylesStatus from '../../styles/Status';
import {routersMain} from '../../routers/Main';
import {toastShow} from '../../utils/toast';
import Top from '../../HeaderStyles/Top';
import WelcomeHD from '../../HeaderStyles/WelcomeHD';
import LoginRegisterHD from '../../HeaderStyles/LoginRegisterHD';
import {
  autoFormatNumberInputChange,
  convertNumberMultiple,
} from '../../utils/format/NumberFormat';
import {formatVND, formatVNDCurency} from '../../utils/format/Money';
import {
  userAddContractSV,
  userGetContractSV,
  userGetTotalMoneySV,
} from '../../services/user';
import moment from 'moment';
import requestRefreshToken from '../../utils/axios/refreshToken';
import {setCurrentUserPL} from '../../app/payloads/user';
import {BLACK_COLOR} from '../../styles/colors';
import {dateFormat} from '../../utils/format/Date';
import useDebounce from '../../utils/hooks/useDebounce';

const DATA_FUNDS = [
  {
    id: 1,
    name: 'Quỹ đầu tư USD',
  },
  {
    id: 2,
    name: 'Quỹ phát triển nông nghiệp',
  },
];
const SendFunds = ({navigation}) => {
  const toast = useToast();
  const {state, dispatch} = useAppContext();
  const {
    currentUser,
    send_funds: {
      fund,
      send_time,
      period,
      deposits,
      interest_rate,
      interest_payment_period,
      principal_payment_time,
    },
  } = state;
  const [refreshing, setRefreshing] = useState(false);
  const [isProcess, setIsProcess] = useState(false);
  const [isProcessSubmit, setIsProcessSubmit] = useState(false);
  const [time, setTime] = useState(null);
  const [setItem, setSetItem] = useState(null);
  const [showEye, setShowEye] = useState(false);
  const [isModalSubmit, setIsModalSubmit] = useState(false);
  const [disbursement, setDisbursement] = useState(null);
  const [dataContract, setDataContract] = useState(null);
  const handleSendContract = dataToken => {
    userGetContractSV({
      id_user: currentUser?.id,
      toast,
      setDataContract,
      token: dataToken?.token,
    });
  };
  const handleGetMoneySV = dataToken => {
    userGetTotalMoneySV({
      toast,
      typeContract:
        setItem?.id === 1 ? 'USD' : setItem?.id === 2 ? 'AGRICULTURE' : '',
      cycleContract: useDebouncePeriod,
      principalContract: useDebounceDeposits.replace(/\./g, ''),
      setDisbursement,
      token: dataToken?.token,
    });
  };
  useEffect(() => {
    requestRefreshToken(
      currentUser,
      handleSendContract,
      state,
      dispatch,
      setCurrentUserPL,
      toast,
    );
    dispatch(
      setFundsPL({
        fund: '',
        send_time: '',
        period: '',
        deposits: '',
        interest_rate: '',
        interest_payment_period: '',
        principal_payment_time: '',
      }),
    );
  }, []);
  const useDebouncePeriod = useDebounce(period, 3000);
  const useDebounceDeposits = useDebounce(deposits, 3000);
  useEffect(() => {
    setDisbursement(null);
    if (setItem && useDebouncePeriod && useDebounceDeposits) {
      requestRefreshToken(
        currentUser,
        handleGetMoneySV,
        state,
        dispatch,
        setCurrentUserPL,
        toast,
      );
    }
    requestRefreshToken(
      currentUser,
      handleSendContract,
      state,
      dispatch,
      setCurrentUserPL,
      toast,
    );
  }, [setItem, useDebouncePeriod, useDebounceDeposits]);
  const DATA_MERGE =
    dataContract &&
    [...dataContract?.usd, ...dataContract?.agriculture]?.sort((a, b) => {
      return a?.id - b?.id;
    });
  const ID_FINAL = DATA_MERGE && DATA_MERGE[DATA_MERGE.length - 1]?.id;
  // console.log('ID_FINAL', ID_FINAL);
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const handleShowEye = () => {
    setShowEye(!showEye);
  };
  const handleChange = (name, value) => {
    dispatch(
      setFundsPL({
        [name]: value,
      }),
    );
  };
  const handleSendFund = dataToken => {
    userAddContractSV({
      id_user: currentUser?.id,
      cycle: period,
      principal: deposits.replace(/\./g, ''),
      type: setItem?.id === 1 ? 'USD' : setItem?.id === 2 ? 'AGRICULTURE' : '',
      timeSend: moment(time).format('YYYY-MM-DD HH:mm:ss'),
      toast,
      dispatch,
      setIsModalSubmit,
      setIsProcessSubmit,
      navigation,
      token: dataToken?.token,
    });
  };
  const handleContinue = async () => {
    await 1;
    if (!fund || !period || !deposits) {
      toastShow(toast, 'Vui lòng nhập đầy đủ thông tin!');
    } else if (moment(time).isBefore(new Date())) {
      toastShow(
        toast,
        'Thời gian gửi không được nhỏ hơn hoặc bằng thời gian hiện tại!',
        'error',
        5000,
      );
    } else if (setItem?.id === 2 && parseInt(period) === 1) {
      toastShow(
        toast,
        'Quỹ phát triển nông nghiệp phải gửi từ 2 mùa trở lên.',
        'error',
        5000,
      );
    } else if (!disbursement) {
      toastShow(toast, 'Vui lòng chờ tính toán tổng giải ngân.', 'error', 5000);
    } else {
      setIsProcess(true);
      setTimeout(() => {
        setIsProcess(false);
        setIsModalSubmit(true);
      }, 1000);
    }
  };
  const handleSubmit = async () => {
    await 1;
    setIsProcessSubmit(true);
    requestRefreshToken(
      currentUser,
      handleSendFund,
      state,
      dispatch,
      setCurrentUserPL,
      toast,
    );
  };
  const handleSetItem = item => {
    setSetItem(item);
  };
  return (
    <>
      <ImageBackground
        borderBottomLeftRadius={30}
        borderBottomRightRadius={30}
        style={[styles.container_bgc]}
        source={require('../../assets/images/bg_fund02.png')}
        resizeMode="cover">
        <View style={[styles.container_total]}>
          <Top
            showEye={showEye}
            onTouchStart={handleShowEye}
            paddingHorizontal={15}
            navigation={navigation}
          />
          <WelcomeHD showEye={showEye} />
          {!currentUser && <LoginRegisterHD navigation={navigation} />}
        </View>
      </ImageBackground>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={[styles.container]}>
        <View style={{paddingHorizontal: 10, paddingVertical: 10}}>
          <View style={[styles.fragment_input_container]}>
            <SelectValueCp
              label="Chọn quỹ đầu tư"
              placeholder="Chọn quỹ đầu tư"
              valueSelect={fund}
              data={DATA_FUNDS}
              handleChange={handleChange}
              nameSelect="fund"
              handleSetItem={handleSetItem}
            />
            <TimerPickerCp
              label="Thời gian gửi"
              time={time}
              setTime={setTime}
              placeholder="Chọn thời gian gửi"
              marginTop={10}
            />
          </View>
          <View style={[styles.fragment_input_container, stylesGeneral.mt10]}>
            <InputItem
              label="Kỳ hạn"
              placeholder="Nhập kỳ hạn"
              nameInput="period"
              value={period}
              handleChange={handleChange}
              unit={
                setItem?.id === 1 ? 'Tháng' : setItem?.id === 2 ? 'Mùa' : ''
              }
            />
            <InputItem
              label="Số tiền gửi"
              placeholder="Nhập số tiền gửi"
              nameInput="deposits"
              value={deposits && autoFormatNumberInputChange(deposits)}
              handleChange={handleChange}
              marginTop={10}
              unit={deposits && 'VND'}
            />
          </View>
          <View style={[styles.fragment_input_container, stylesGeneral.mt10]}>
            <InputItem
              label="Tổng tiền giải ngân"
              value={formatVNDCurency(disbursement?.disbursement || 0)}
              handleChange={handleChange}
              disabled
            />
          </View>
          <Text
            style={[styles.text_contract]}
            onPress={() => navigation.navigate(routersMain.ContractProvisions)}>
            *Các quy định hợp đồng
          </Text>
          <ButtonSubmitCp
            isProcess={isProcess}
            handleSubmit={handleContinue}
            bgcButton={stylesStatus.confirmbgcbold}
            buttonText="Tiếp tục"
            marginTop={20}
            marginBottom={20}
          />
        </View>
      </ScrollView>
      <ModalCp
        titleModal="Xác nhận hợp đồng"
        stateModal={isModalSubmit}
        setModal={setIsModalSubmit}
        onPress={handleSubmit}
        isProcessModal={isProcessSubmit}
        btnText="Xác nhận">
        <RowDetail
          title="MÃ HD"
          text={`${ID_FINAL ? ID_FINAL + 1 : 1}/${new Date().getFullYear()}/${
            setItem?.id === 1 ? 'HDQDTUSD' : 'HDQPTNN'
          } `}
          marginLeft={0}
          styleDesc={{flex: 1, textAlign: 'right', color: BLACK_COLOR}}
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
          text={
            setItem?.id === 1 ? 'QUỸ ĐẦU TƯ USD' : 'QUỸ PHÁT TRIỂN NÔNG NGHIỆP'
          }
          marginLeft={0}
          styleDesc={{flex: 1, textAlign: 'right', color: BLACK_COLOR}}
          marginTop={8}
        />
        <RowDetail
          title="Thời gian gửi"
          text={dateFormat(time, 'DD/MM/YYYY')}
          marginLeft={0}
          styleDesc={{flex: 1, textAlign: 'right', color: BLACK_COLOR}}
          marginTop={8}
        />
        <RowDetail
          title="Kỳ hạn"
          text={`${period} ${setItem?.id === 1 ? 'Tháng' : 'Mùa'}`}
          marginLeft={0}
          styleDesc={{flex: 1, textAlign: 'right', color: BLACK_COLOR}}
          marginTop={8}
        />
        <RowDetail
          title="Vốn"
          text={formatVND(deposits || 0)}
          marginLeft={0}
          styleDesc={{flex: 1, textAlign: 'right', color: BLACK_COLOR}}
          marginTop={8}
        />
        <RowDetail
          title="Giải ngân"
          text={formatVNDCurency(disbursement?.disbursement || 0)}
          marginLeft={0}
          styleDesc={{flex: 1, textAlign: 'right', color: BLACK_COLOR}}
          marginTop={8}
          noneBorderBottom
        />
      </ModalCp>
    </>
  );
};

export default SendFunds;
