'use client'
import React, { useState } from 'react'
import { Breadcrumb } from '../../../../../components'
import { dateFormat, useAppContext } from '../../../../../helpers'
import className from 'classnames/bind'

import styles from './History.module.css'
import sharedStyles from '../fund-shared-styles.module.css'
import { formatVND } from '../../../../../helpers/format/FormatMoney'
const cx = className.bind(styles)

const historyByTab: any = {
  deposit: {
    header: [
      {
        id: 1,
        title: 'STT',
      },
      {
        id: 2,
        title: 'SỐ TIỀN NẠP',
      },
      {
        id: 3,
        title: 'NGÀY NẠP',
      },
      {
        id: 4,
        title: 'NGÂN HÀNG',
      },
      {
        id: 5,
        title: 'NGƯỜI TẠO',
      },
      {
        id: 6,
        title: 'TRẠNG THÁI',
      },
    ],
  },
  withdraw: {
    header: [
      {
        id: 7,
        title: 'STT',
      },
      {
        id: 8,
        title: 'SỐ TIỀN RÚT',
      },
      {
        id: 9,
        title: 'NGÀY RÚT',
      },
      {
        id: 10,
        title: 'NGÂN HÀNG',
      },
      {
        id: 11,
        title: 'NGƯỜI TẠO',
      },
      {
        id: 12,
        title: 'TRẠNG THÁI',
      },
    ],
  },
}

type HistoryInterface = {}
const HistoryPage = ({}: HistoryInterface) => {
  const {
    state: { data = [] },
  } = useAppContext()
  const [tabId, setTabId] = useState('deposit')
  const renderHeader = () => {
    return (
      <tr className={styles.table_header}>
        {historyByTab[tabId].header.map((item: any) => {
          return (
            <th className={styles.column_name} key={item.id}>
              {item.title}
            </th>
          )
        })}
      </tr>
    )
  }

  const renderTableRow = ({
    stt,
    amount,
    date,
    bankName,
    userName,
    state,
  }: any) => {
    return (
      <tr className={styles.table_row}>
        <td className={styles.cell_value}>{stt}</td>
        <td className={styles.cell_value}>{formatVND(amount)}</td>
        <td className={styles.cell_value}>
          {dateFormat.dateFormat(date, 'DD/MM/YYYY')}
        </td>
        <td className={styles.cell_value}>{bankName}</td>
        <td className={styles.cell_value}>{userName}</td>
        <td className={styles.cell_value}>{state}</td>
      </tr>
    )
  }

  const renderDataTable = () => {
    if (!data || data.length == 0) {
      return
    }

    return data.map((row: any) => {
      return renderTableRow(row)
    })
  }

  return (
    <>
      <Breadcrumb pageName="Lịch sử" description="Lịch sử" />
      <div className="container mb-5">
        <div className={sharedStyles.container}>
          <div className={styles.history_wrapper}>
            <div className={styles.history_tab}>
              <div
                className={cx(
                  'deposit_tab',
                  `${tabId === 'deposit' && 'active'}`
                )}
                onClick={() => setTabId('deposit')}
              >
                <p className="m-auto">Nạp tiền</p>
              </div>
              <div
                className={cx(
                  'withdraw_tab',
                  `${tabId === 'withdraw' && 'active'}`
                )}
                onClick={() => setTabId('withdraw')}
              >
                <p className="m-auto">Rút tiền</p>
              </div>
            </div>
            <div className={styles.table_wrapper}>
              <input className={styles.history_search} placeholder="Search" />
              <table className={styles.history_table}>
                {renderHeader()}
                {renderDataTable()}
              </table>
              {(!data || !data.length) && (
                <p className={styles.table_empty}>No data</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HistoryPage
