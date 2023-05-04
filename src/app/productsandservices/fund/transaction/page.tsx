'use client';
import React, { useEffect, useState } from 'react';
import className from 'classnames/bind';
import styles from './Transactions.module.css';
import { Breadcrumb, LoginRegisterCp, SnackbarCp } from '@/components';
import { useAppContext } from '@/helpers';
import DepositsHistory from '../deposits-history/page';
import WithdrawsHistory from '../widthdraw-history/page';
const cx = className.bind(styles);

const LIST_TABS = [
  {
    id: 1,
    title: 'Nạp tiền',
    component: DepositsHistory,
  },
  {
    id: 2,
    title: 'Rút tiền',
    component: WithdrawsHistory,
  },
];

export default function Transactions() {
  const { state } = useAppContext();
  const { currentUser } = state.set;
  const [idTab, setIdTab] = useState(1);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    type: string;
    message: any;
  }>({
    open: false,
    type: '',
    message: '',
  });
  useEffect(() => {
    document.title = `Giao dịch | ${process.env.NEXT_PUBLIC_TITLE_WEB}`;
    if (!currentUser) {
      setSnackbar({
        open: true,
        type: 'error',
        message: <LoginRegisterCp />,
      });
    }
  }, [currentUser]);
  const handleCloseSnackbar = (event: any, reason: any) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({
      ...snackbar,
      open: false,
    });
  };
  return (
    <>
      <Breadcrumb pageName="Giao dịch" description="Giao dịch" />
      <div className={`${cx('container')}`}>
        <SnackbarCp
          openSnackbar={snackbar.open}
          handleCloseSnackbar={handleCloseSnackbar}
          messageSnackbar={snackbar.message}
          typeSnackbar={snackbar.type}
        />
        <div className={`${cx('body')}`}>
          <div className={`${cx('history_container')}`}>
            <div className={`${cx('history_list')}`}>
              {LIST_TABS.map((item, index) => (
                <div
                  className={`${cx(
                    'history_item',
                    idTab === item?.id ? 'active' : ''
                  )}`}
                  key={index}
                  onClick={() => setIdTab(item?.id)}
                >
                  <div className={`${cx('history_item_title')}`}>
                    {item.title}
                  </div>
                </div>
              ))}
            </div>
            <div className={`${cx('body_components')}`}>
              {LIST_TABS.map((item, index) => {
                if (item?.id === idTab) {
                  const Component = item?.component;
                  return <Component key={index} />;
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
