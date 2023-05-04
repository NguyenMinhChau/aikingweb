'use client';
import React, { useEffect, useState } from 'react';
import className from 'classnames/bind';
import styles from './History.module.css';
import { LoginRegisterCp, Breadcrumb, SnackbarCp } from '@/components';
import DepositsHistory from '../deposits-history/page';
import WithdrawsHistory from '../widthdraw-history/page';
import { useAppContext } from '@/helpers';

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
export default function History() {
  const { state } = useAppContext();
  const { currentUser } = state.set;
  const [idTab, setIdTab] = useState(1);
  const [snackbar, setSnackbar] = useState({
    open: false,
    type: '',
    message: '',
  });
  useEffect(() => {
    document.title = `Lịch sử | ${process.env.NEXT_PUBLIC_TITLE_WEB}`;
    if (!currentUser) {
      setSnackbar({
        open: true,
        type: 'error',
        message: <LoginRegisterCp />,
      });
    }
  }, []);
  const handleCloseSnackbar = (event, reason) => {
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
      <Breadcrumb pageName="Lịch sử" description="Lịch sử" />
      <div className="container mb-5">
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
