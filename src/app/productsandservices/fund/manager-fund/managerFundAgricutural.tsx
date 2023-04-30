'use client';
import React, { useState } from 'react';
import className from 'classnames/bind';
import styles from './styles.module.css';
import { General } from '../../../../components';
import { dateFormat, moneyFormat, useAppContext } from '../../../../helpers';
import DataManagerFundUsdHeader from '../../../../helpers/fakeData/dataManagerFundUsdHeader';
import { indexTable } from '../../../../helpers/tableIndex';

const cx = className.bind(styles);

function ManagerFundAgricuturalPage({ data }: { data: any }) {
  const { state, dispatch } = useAppContext();
  const {
    currentUser,
    dataManagerFundAgriculture,
    pagination: { page, show },
    searchValues: { manager_fund_agriculture },
  } = state.set;
  let showPage = 10;
  const start = (page - 1) * showPage + 1;
  const end = start + showPage - 1;
  const [disbursement, setDisbursement] = useState([]);
  const [itemFundAgriculture, setItemFundAgriculture] = useState(null);
  const [isModalDetailAgriculture, setIsModalDetailAgriculture] =
    useState(false);
  const [isProcessModal, setIsProcessModal] = useState(false);
  let dataManagerFundAgriFlag: any[] = [];
  function RenderBodyTable({ data }: { data: any }) {
    return (
      <>
        {data.map((item: any, index: number) => {
          return (
            <tr
              key={index}
              onClick={() => {
                setItemFundAgriculture(item);
                setIsModalDetailAgriculture(true);
              }}
            >
              <td>{indexTable(page, show, index)}</td>
              <td className="item-w200">
                {item?.id}/{dateFormat.dateFormat(item?.createdAt, 'YYYY')}
                /HDPTNN-
                {dateFormat.dateFormat(item?.date_start, 'DD/MM/YYYY')}
              </td>
              <td className="item-w100">{item?.cycle} muaf</td>
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
        className={cx('manager_fund_agriculture')}
        valueSearch={manager_fund_agriculture}
        nameSearch="manager_fund_agriculture"
        dataHeaders={DataManagerFundUsdHeader().headers}
        noActions
        noRefresh
        totalData={dataManagerFundAgriFlag?.length}
        PaginationCus={true}
        startPagiCus={start}
        endPagiCus={end}
        dataPagiCus={() => {
          return dataManagerFundAgriFlag?.filter((row, index) => {
            if (index + 1 >= start && index + 1 <= end) return true;
          });
        }}
      >
        <RenderBodyTable data={dataManagerFundAgriFlag} />
      </General>
    </div>
  );
}

export default ManagerFundAgricuturalPage;
