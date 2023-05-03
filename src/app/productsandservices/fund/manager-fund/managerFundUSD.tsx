'use client';
import React, { useState } from 'react';
import className from 'classnames/bind';
import styles from './styles.module.css';
import { General } from '../../../../components';
import { dateFormat, moneyFormat, useAppContext } from '../../../../helpers';
import DataManagerFundUsdHeader from '../../../../helpers/fakeData/dataManagerFundUsdHeader';
import { indexTable } from '@/helpers/tableIndex';

const cx = className.bind(styles);

function ManagerFundUSDPage({ data }: { data: any }) {
  const { state, dispatch } = useAppContext();
  const {
    currentUser,
    dataManagerFundUSD,
    pagination: { page, show },
    searchValues: { manager_fund_usd },
  } = state.set;
  let showPage = 10;
  const start = (page - 1) * showPage + 1;
  const end = start + showPage - 1;
  const [disbursement, setDisbursement] = useState([]);
  const [itemFund, setItemFund] = useState(null);
  const [isModalDetail, setIsModalDetail] = useState(false);
  const [isProcessModal, setIsProcessModal] = useState(false);
  let dataManagerFundUSDFlag: any[] = [];
  function RenderBodyTable({ data }: { data: any }) {
    return (
      <>
        {data.map((item: any, index: number) => {
          return (
            <tr
              key={index}
              onClick={() => {
                setItemFund(item);
                setIsModalDetail(true);
              }}
            >
              <td>{indexTable(page, show, index)}</td>
              <td className="item-w200">
                {item?.id}/{dateFormat.dateFormat(item?.createdAt, 'YYYY')}
                /HDQDTUSD-
                {dateFormat.dateFormat(item?.date_start, 'DD/MM/YYYY')}
              </td>
              <td className="item-w100">{item?.cycle} tháng</td>
              <td className="item-w100">
                {moneyFormat.formatVND(item?.principal)}
              </td>
              <td className="item-w150">
                {item?.disbursement
                  ? moneyFormat.formatVNDCurrency(item?.disbursement)
                  : 'Đang tải'}
              </td>
              <td className="item-w100">
                <span className={`status`}>{item?.status}</span>
              </td>
            </tr>
          );
        })}
      </>
    );
  }
  return (
    <div>
      <General
        className={cx('manager_fund_usd')}
        valueSearch={manager_fund_usd}
        nameSearch="manager_fund_usd"
        dataHeaders={DataManagerFundUsdHeader().headers}
        noActions
        noRefresh
        totalData={dataManagerFundUSDFlag?.length}
        PaginationCus={true}
        startPagiCus={start}
        endPagiCus={end}
        dataPagiCus={() => {
          return dataManagerFundUSDFlag?.filter((row, index) => {
            if (index + 1 >= start && index + 1 <= end) return true;
          });
        }}
      >
        <RenderBodyTable data={dataManagerFundUSDFlag} />
      </General>
    </div>
  );
}

export default ManagerFundUSDPage;
