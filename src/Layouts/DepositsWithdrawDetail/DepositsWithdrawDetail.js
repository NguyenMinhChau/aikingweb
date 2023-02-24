/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import className from 'classnames/bind';
import { useParams, useLocation } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Button, Icons, Image } from '../../components';
import moment from 'moment';
import {
    useAppContext,
    textUtils,
    refreshPage,
    numberUtils,
} from '../../utils';
import styles from './DepositsWithdrawDetail.module.css';

import {
    adminGetWithdrawByIdSV,
    adminGetDepositByIdSV,
    getDepositsWithdrawById,
} from '../../services/admin';

const cx = className.bind(styles);

function DepositsWithdrawDetail() {
    const { idDeposits, idWithdraw } = useParams();
    const { state, dispatch } = useAppContext();
    const location = useLocation();
    const [withdrawValue, setWithdrawValue] = useState({});
    const {
        edit,
        data: { dataUser },
    } = state.set;
    useEffect(() => {
        document.title = `Chi tiết | ${process.env.REACT_APP_TITLE_WEB}`;
        getDepositsWithdrawById({
            state,
            dispatch,
            idDeposits,
            idWithdraw,
        });
    }, []);
    function ItemRender({
        title,
        info,
        bankInfo,
        methodBank,
        nameAccount,
        numberAccount,
    }) {
        return (
            <div className='detail-item'>
                <div className='detail-title'>{title}</div>
                <div className={`${cx('detail-status')}`}>
                    {bankInfo ? (
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-end',
                            }}
                        >
                            <span className='info'>
                                {methodBank ? (
                                    methodBank
                                ) : (
                                    <Skeleton width={30} />
                                )}
                            </span>
                            <span className='info'>
                                {nameAccount ? (
                                    nameAccount
                                ) : (
                                    <Skeleton width={30} />
                                )}
                            </span>
                            <span className='info'>
                                {numberAccount ? (
                                    numberAccount
                                ) : (
                                    <Skeleton width={30} />
                                )}
                            </span>
                        </div>
                    ) : (
                        <span className='info'>
                            {info || info === 0 ? (
                                info
                            ) : (
                                <Skeleton width={30} />
                            )}
                        </span>
                    )}
                </div>
            </div>
        );
    }
    const x = edit?.itemData && edit?.itemData;
    const username = dataUser?.data?.find((t) => t?._id === x.userId)?.payment
        .username;
    const email = dataUser?.data?.find((t) => t?._id === x.userId)?.payment
        .email;
    const bankName = dataUser?.data?.find((t) => t?._id === x.userId)?.payment
        ?.bank?.bankName;
    const accountNumber = dataUser?.data?.find((t) => t?._id === x.userId)
        ?.payment?.bank?.account;
    const accountName = dataUser?.data?.find((t) => t?._id === x.userId)
        ?.payment?.bank?.name;
    const infoUser = {
        name: username,
        email: email,
        bankName: bankName,
        accountNumber: accountNumber,
        accountName: accountName,
    };
    return (
        <>
            <Button
                className='confirmbgc mb8'
                onClick={refreshPage.refreshPage}
            >
                <div className='flex-center'>
                    <Icons.RefreshIcon className='fz12 mr8' />
                    <span className={`${cx('general-button-text')}`}>
                        Tải lại trang
                    </span>
                </div>
            </Button>
            <div className={`${cx('info-container')}`}>
                <div className={`${cx('detail-container')}`}>
                    <div className='detail-item'>
                        <div className='detail-title'>Trạng thái</div>
                        <div className={`${cx('detail-status')}`}>
                            {x ? (
                                <>
                                    <span
                                        className={`status fwb ${
                                            x.status
                                                .toLowerCase()
                                                .replace(' ', '') + 'bgc'
                                        }`}
                                    >
                                        {textUtils.FirstUpc(x.status)}
                                    </span>
                                </>
                            ) : (
                                <Skeleton width={50} />
                            )}
                        </div>
                    </div>
                    <ItemRender
                        title='Họ và tên'
                        info={infoUser?.name && infoUser?.name}
                    />
                    <ItemRender
                        title='Email'
                        info={infoUser?.email && infoUser?.email}
                    />
                    <ItemRender
                        title={`Ngày ${idDeposits ? 'nạp' : 'rút'}`}
                        info={
                            x &&
                            moment(x.createdAt).format('DD/MM/YYYY HH:mm:ss')
                        }
                    />
                    <ItemRender
                        title={`Số tiền ${idDeposits ? 'nạp' : 'rút'}`}
                        info={x && numberUtils.formatVND(x.amount)}
                    />
                    <ItemRender
                        title='Phương thức thanh toán'
                        bankInfo
                        methodBank={
                            location.pathname.includes('withdraw')
                                ? infoUser?.bankName
                                : 'Vietcombank'
                        }
                        nameAccount={
                            location.pathname.includes('withdraw')
                                ? infoUser?.accountName
                                : 'AIKING GROUP'
                        }
                        numberAccount={
                            x && location.pathname.includes('withdraw')
                                ? infoUser?.accountNumber
                                : '00725345179'
                        }
                    />
                    {idDeposits && (
                        <ItemRender
                            title='Hóa đơn'
                            info={
                                x && (
                                    <a
                                        href={`${process.env.REACT_APP_URL_SERVER}${x.statement}`}
                                        target='_blank'
                                    >
                                        {x.statement ? (
                                            x.statement.replace('/images/', '')
                                        ) : (
                                            <Skeleton width='30px' />
                                        )}
                                    </a>
                                )
                            }
                        />
                    )}
                </div>
                {idDeposits && (
                    <div className={`${cx('detail-container')}`}>
                        <div className={`${cx('document-review-container')}`}>
                            <div className={`${cx('document-review-title')}`}>
                                Xem hóa đơn
                            </div>
                            {x?.statement ? (
                                <div className={`${cx('document-container')}`}>
                                    <Image
                                        src={`${process.env.REACT_APP_URL_SERVER}/${x?.statement}`}
                                        alt={x.statement.replace(
                                            '/images/',
                                            ''
                                        )}
                                        className={`${cx(
                                            'document-review-image'
                                        )}`}
                                    />
                                </div>
                            ) : (
                                <Skeleton width='100%' height='200px' />
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default DepositsWithdrawDetail;