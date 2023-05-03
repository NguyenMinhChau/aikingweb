'use client';
import React, { useEffect, useState } from 'react';
import className from 'classnames/bind';
import styles from './depositsHistory.module.css';
import { indexTable } from '@/helpers/tableIndex';
import { useAppContext } from '@/helpers';
import { formatVND } from '@/helpers/format/FormatMoney';
import moment from 'moment';
import { Skeleton } from '@mui/material';
import { General } from '@/components';

import {
  userGetDepositsByUserSV,
  userUploadBillsDepositsSV,
} from '@/services/user';
import {
  CustomcareLine,
  FileUploadSingle,
  Image,
  Modal,
  SnackbarCp,
} from '@/components';
import { refreshToken } from '@/services/authen';
import { setData } from '@/appState/reducer';
import { dateFormat } from '@/helpers/format/DateVN';

const dataFilterHistory = (data: any, search: any, start: any, end: any) => {
  return data?.filter((row: any, index: number) => {
    if (index + 1 >= start && index + 1 <= end) return true;
  });
};

const DataDepositsHistory = {
  headers: {
    name: process.env.REACT_APP_DEPOSITS_HISTORY,
    index: {
      title: 'STT',
    },
    h1: {
      title: 'Số tiền nạp',
    },
    h2: {
      title: 'Ngày nạp',
      iconSort: <i className="fa-solid fa-sort"></i>,
    },
    h3: {
      title: 'Ngân hàng',
    },
    h4: {
      title: 'Người tạo',
    },
    h5: {
      title: 'Trạng thái',
    },
  },
};
const cx = className.bind(styles);

export default function DepositsHistory() {
  const { state, dispatch } = useAppContext();
  const {
    currentUser,
    file,
    dataDepositsHistory,
    pagination: { page, show },
    searchValues: { deposits_history },
  } = state.set;
  let showPage = 10;
  const start = (page - 1) * showPage + 1;
  const end = start + showPage - 1;
  const [isProcessUploadDeposits, setIsProcessUploadDeposits] = useState(false);
  const [isModalUploadDeposits, setIsModalUploadDeposits] = useState(false);
  const [itemDeposits, setItemDeposits] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    type: '',
    message: '',
  });
  let dataDepositsHistoryFlag =
    dataDepositsHistory.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    ) || [];
  if (deposits_history) {
    dataDepositsHistoryFlag = dataDepositsHistoryFlag.filter((item) => {
      return (
        item?.status
          ?.toString()
          ?.toLowerCase()
          .includes(deposits_history?.toLowerCase()) ||
        moment(item?.createdAt)
          .format('DD/MM/YYYY HH:mm:ss')
          ?.toString()
          ?.toLowerCase()
          .includes(deposits_history?.toLowerCase()) ||
        item?.note
          ?.toString()
          ?.toLowerCase()
          .includes(deposits_history?.toLowerCase()) ||
        formatVND(item?.amount)
          ?.toString()
          ?.toLowerCase()
          .includes(deposits_history?.toLowerCase()) ||
        formatVND(item?.amount)
          .replace(/\./g, '')
          ?.toString()
          ?.toLowerCase()
          .includes(deposits_history?.toLowerCase())
      );
    });
  }
  const handleModalDepositsTrue = (e, item) => {
    e.stopPropagation();
    setIsModalUploadDeposits(true);
    setItemDeposits(item);
  };
  const handleModalDepositsFalse = (e) => {
    e.stopPropagation();
    setIsModalUploadDeposits(false);
    dispatch(
      setData({
        file: [],
        amountDeposits: '',
        bankDeposits: '',
      })
    );
  };
  const handleSendDepositsHistory = async (dataToken: any) => {
    await userGetDepositsByUserSV({
      id_user: currentUser?.id,
      dispatch,
      setSnackbar,
      token: dataToken?.token,
    });
  };
  const handleCloseSnackbar = (event: any, reason: any) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({
      ...snackbar,
      open: false,
    });
  };
  useEffect(() => {
    if (currentUser) {
      refreshToken({
        currentUser,
        handleFunc: handleSendDepositsHistory,
        dispatch,
        setData,
        setSnackbar,
      });
    }
  }, []);
  const colorStatus = (item: any) => {
    switch (item?.status) {
      case 'Completed':
        return 'success';
      case 'Pending':
      case 'Confirmed':
        return 'warning';
      case 'Canceled':
        return 'cancel';
      default:
        return 'info';
    }
  };
  function RenderBodyTable({ data }) {
    return (
      <>
        {data.map((item: any, index: number) => {
          return (
            <tr
              key={index}
              onClick={
                item?.status !== 'Completed'
                  ? (e) =>
                      handleModalDepositsTrue(e, {
                        ...item,
                        bankName: 'Vietcombank',
                        accountName: 'AIKING GROUP',
                        accountNumber: '0071000000001',
                      })
                  : () => {}
              }
            >
              <td>{indexTable(page, show, index)}</td>
              <td className="item-w100">{formatVND(item?.amount)}</td>
              <td className="item-w100">
                {moment(item?.createdAt).format('DD/MM/YYYY HH:mm:ss')}
              </td>
              <td className="item-w100">
                AIKING GROUP - Vietcombank - 0071000000001
              </td>
              <td className="item-w150">
                {item?.note ? item?.note : <Skeleton width={50} />}
              </td>
              <td className="item-w100">
                <span className={`status ${colorStatus(item) + 'bgc'}`}>
                  {item?.status}
                </span>
              </td>
            </tr>
          );
        })}
      </>
    );
  }
  const handleSendUpload = async (dataToken: any) => {
    await userUploadBillsDepositsSV({
      id_user: currentUser?.id,
      dispatch,
      id_deposits: itemDeposits?.id,
      image: file,
      token: dataToken?.token,
      setSnackbar,
      setIsProcessUploadDeposits,
      setIsModalUploadDeposits,
    });
  };
  const handleUploadBillDeposits = async () => {
    if (file.length === 0) {
      setSnackbar({
        open: true,
        type: 'error',
        message: 'Bạn chưa chọn file',
      });
    } else {
      setIsProcessUploadDeposits(true);
      await refreshToken({
        currentUser,
        handleFunc: handleSendUpload,
        dispatch,
        setData,
        setSnackbar,
      });
      dispatch(
        setData({
          amountDeposits: '',
          bankDeposits: '',
          file: [],
        })
      );
    }
  };
  const urlImageFile = file.length > 0 && URL.createObjectURL(file[0]);
  return (
    <div className={`${cx('container')}`}>
      <SnackbarCp
        openSnackbar={snackbar.open}
        handleCloseSnackbar={handleCloseSnackbar}
        messageSnackbar={snackbar.message}
        typeSnackbar={snackbar.type}
      />
      <General
        className={cx('deposits_history')}
        valueSearch={deposits_history}
        nameSearch="deposits_history"
        dataHeaders={DataDepositsHistory.headers}
        noActions
        noRefresh
        totalData={dataDepositsHistoryFlag?.length}
        PaginationCus={true}
        startPagiCus={start}
        endPagiCus={end}
        dataPagiCus={dataFilterHistory(
          dataDepositsHistoryFlag,
          deposits_history,
          start,
          end
        )}
      >
        <RenderBodyTable data={dataDepositsHistoryFlag} />
      </General>
      {isModalUploadDeposits && (
        <Modal
          openModal={(e) => handleModalDepositsTrue(e, itemDeposits)}
          closeModal={handleModalDepositsFalse}
          titleHeader="Xem chi tiết hóa đơn"
          actionButtonText="Gửi"
          classNameButton={`infobgc`}
          isProcess={isProcessUploadDeposits}
          onClick={handleUploadBillDeposits}
        >
          <CustomcareLine
            nameIcon="fa-solid fa-rotate-right"
            colorIcon="success"
            title="Trạng thái:"
            textLink={itemDeposits?.status}
            colorStatus={`status ${colorStatus(itemDeposits) + 'bgc'}`}
          />
          <CustomcareLine
            nameIcon="fa-regular fa-clock"
            colorIcon="info"
            title="Ngày nạp:"
            textLink={dateFormat(
              itemDeposits?.createdAt,
              'DD/MM/YYYY HH:mm:ss'
            )}
          />
          <CustomcareLine
            nameIcon="fa-solid fa-money-bill"
            colorIcon="warning"
            title="Số tiền nạp:"
            textLink={formatVND(itemDeposits?.amount || 0)}
          />
          <CustomcareLine
            nameIcon="fa fa-bank"
            colorIcon="cancel"
            title="Ngân hàng thụ hưởng:"
            bankMethod
            bankName={itemDeposits?.bankName}
            accountName={itemDeposits?.accountName}
            accountNumber={itemDeposits?.accountNumber}
          />
          <FileUploadSingle label="Tải hình ảnh" />
          {(urlImageFile || itemDeposits?.statement) && (
            <div className={`${cx('view_image')}`}>
              <Image
                src={
                  urlImageFile
                    ? urlImageFile
                    : `${process.env.REACT_APP_URL_SERVER}${itemDeposits?.statement}`
                }
                alt="image_upload"
                className={`${cx('image')}`}
              />
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}
