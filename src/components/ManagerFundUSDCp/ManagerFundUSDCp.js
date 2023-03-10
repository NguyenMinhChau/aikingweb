/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import className from 'classnames/bind';
import styles from './ManagerFundUSDCp.module.css';
import { indexTable } from '../../utils/tableIndex';
import { formatVND, formatVNDCurrency } from '../../utils/format/FormatMoney';
import moment from 'moment';
import { Skeleton } from '@mui/material';
import { useAppContext } from '../../utils';
import SnackbarCp from '../SnackbarCp/SnackbarCp';
import { General } from '../../layouts';
import DataManagerFundUsdHeader from '../../utils/fakeData/dataManagerFundUsdHeader';
import { userGetDisbursementByIdContractSV } from '../../services/user';
import { dateFormat } from '../../utils/format/DateVN';
import Modal from '../Modal/Modal';
import CustomcareLine from '../CustomcareLine/CustomcareLine';
import { setData } from '../../app/reducer';
import dataFilterManagerFund from '../../utils/dataTableCusFilter/dataFilterManagerFund';

const cx = className.bind(styles);

export default function ManagerFundUSDCp({ data }) {
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
    const [snackbar, setSnackbar] = useState({
        open: false,
        type: '',
        message: '',
    });
    const handleModalDetailTrue = (e) => {
        e.stopPropagation();
        setIsModalDetail(true);
    };
    const handleModalDetailFalse = (e) => {
        e.stopPropagation();
        setIsModalDetail(false);
    };
    let dataManagerFundUSDFlag = data?.usd.sort((a, b) => b?.id - a?.id) || [];
    if (manager_fund_usd) {
        dataManagerFundUSDFlag = dataManagerFundUSDFlag.filter((item) => {
            return (
                item?.id
                    ?.toString()
                    ?.toLowerCase()
                    .includes(manager_fund_usd?.toLowerCase()) ||
                item?.cycle
                    ?.toString()
                    ?.toLowerCase()
                    .includes(manager_fund_usd?.toLowerCase()) ||
                item?.status
                    ?.toString()
                    ?.toLowerCase()
                    .includes(manager_fund_usd?.toLowerCase()) ||
                item?.principal
                    ?.toString()
                    ?.toLowerCase()
                    .includes(manager_fund_usd?.toLowerCase()) ||
                item?.disbursement
                    ?.toString()
                    ?.toLowerCase()
                    .includes(manager_fund_usd?.toLowerCase()) ||
                dateFormat(item?.date_start, 'DD/MM/YYYY')
                    ?.toString()
                    ?.toLowerCase()
                    .includes(manager_fund_usd?.toLowerCase())
            );
        });
    }
    useEffect(() => {
        dataManagerFundUSDFlag?.map((item) => {
            userGetDisbursementByIdContractSV({
                id_contract: item?.id,
                setSnackbar,
                setDisbursement,
            });
        });
    }, []);
    if (disbursement?.length <= dataManagerFundUSDFlag?.length) {
        dataManagerFundUSDFlag?.map((item) => {
            userGetDisbursementByIdContractSV({
                id_contract: item?.id,
                setSnackbar,
                setDisbursement,
            });
        });
    }
    const uniqueDisbursement = disbursement.filter(
        (v, i, a) => a.findIndex((t) => t.disbursement === v.disbursement) === i
    );
    for (let i = 0; i < dataManagerFundUSDFlag?.length; i++) {
        for (let j = 0; j < uniqueDisbursement?.length; j++) {
            if (
                dataManagerFundUSDFlag[i].principal ===
                uniqueDisbursement[j].principal
            ) {
                dataManagerFundUSDFlag[i].disbursement =
                    uniqueDisbursement[j].disbursement;
            }
        }
    }
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbar({
            ...snackbar,
            open: false,
        });
    };
    const colorStatus = (item) => {
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
                {data.map((item, index) => {
                    return (
                        <tr
                            key={index}
                            onClick={() => {
                                setItemFund(item);
                                setIsModalDetail(true);
                            }}
                        >
                            <td>{indexTable(page, show, index)}</td>
                            <td className='item-w200'>
                                {item?.id}/{dateFormat(item?.createdAt, 'YYYY')}
                                /HDQDTUSD-
                                {dateFormat(item?.date_start, 'DD/MM/YYYY')}
                            </td>
                            <td className='item-w100'>{item?.cycle} th??ng</td>
                            <td className='item-w100'>
                                {formatVND(item?.principal)}
                            </td>
                            <td className='item-w150'>
                                {formatVNDCurrency(item?.disbursement)}
                            </td>
                            <td className='item-w100'>
                                <span
                                    className={`status ${
                                        colorStatus(item) + 'bgc'
                                    }`}
                                >
                                    {item?.status}
                                </span>
                            </td>
                        </tr>
                    );
                })}
            </>
        );
    }
    const handleCancelContract = async (id) => {
        await 1;
        setIsProcessModal(true);
        setTimeout(() => {
            setIsProcessModal(false);
            setIsModalDetail(false);
            setSnackbar({
                open: true,
                type: 'success',
                message: `H???y h???p ?????ng id = ${id}. Ch???c n??ng ??ang ph??t tri???n!`,
            });
        }, 3000);
    };
    return (
        <div className={`${cx('container')}`}>
            <SnackbarCp
                openSnackbar={snackbar.open}
                handleCloseSnackbar={handleCloseSnackbar}
                messageSnackbar={snackbar.message}
                typeSnackbar={snackbar.type}
            />
            <General
                className={cx('manager_fund_usd')}
                valueSearch={manager_fund_usd}
                nameSearch='manager_fund_usd'
                dataHeaders={DataManagerFundUsdHeader().headers}
                noActions
                noRefresh
                totalData={dataManagerFundUSDFlag?.length}
                PaginationCus={true}
                startPagiCus={start}
                endPagiCus={end}
                dataPagiCus={dataFilterManagerFund(
                    dataManagerFundUSDFlag,
                    manager_fund_usd,
                    start,
                    end
                )}
            >
                <RenderBodyTable data={dataManagerFundUSDFlag} />
            </General>
            {isModalDetail && (
                <Modal
                    openModal={handleModalDetailTrue}
                    closeModal={handleModalDetailFalse}
                    titleHeader='Chi ti???t h???p ?????ng'
                    actionButtonText='H???y h???p ?????ng'
                    classNameButton={`cancelbgcbold`}
                    onClick={() => handleCancelContract(itemFund?.id)}
                    isProcess={isProcessModal}
                >
                    <CustomcareLine
                        title='M?? HD:'
                        textLink={`${itemFund?.id}/${dateFormat(
                            itemFund?.createdAt,
                            'YYYY'
                        )}/HDQDTUSD`}
                        marginLeft={0}
                        colorStatus={`status cancelbgcbold`}
                    />
                    <CustomcareLine
                        title='T??n:'
                        textLink={currentUser?.username}
                        marginLeft={0}
                    />
                    <CustomcareLine
                        title='G??i:'
                        textLink='QU??? ?????U T?? USD'
                        marginLeft={0}
                        colorStatus={`warning`}
                    />
                    <CustomcareLine
                        title='Th???i gian g???i:'
                        textLink={dateFormat(
                            itemFund?.date_start,
                            'DD/MM/YYYY'
                        )}
                        marginLeft={0}
                    />
                    <CustomcareLine
                        title='K??? h???n:'
                        textLink={itemFund?.cycle + ' th??ng'}
                        marginLeft={0}
                    />
                    <CustomcareLine
                        title='V???n:'
                        textLink={formatVND(itemFund?.principal)}
                        marginLeft={0}
                        colorStatus={`info`}
                    />
                    <CustomcareLine
                        title='Gi???i ng??n:'
                        textLink={formatVNDCurrency(itemFund?.disbursement)}
                        marginLeft={0}
                        noneBorderBottom
                        colorStatus={`success`}
                    />
                </Modal>
            )}
        </div>
    );
}
