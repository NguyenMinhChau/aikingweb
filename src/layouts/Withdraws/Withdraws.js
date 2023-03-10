/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import className from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Withdraws.module.css';
import {
    Button,
    CreditCard,
    CustomcareLine,
    FormInput,
    LoginRegisterCp,
    LoginRegisterCpTwo,
    Modal,
    SliderHeader,
    SnackbarCp,
} from '../../components';
import { useAppContext } from '../../utils';
import { setData } from '../../app/reducer';
import { formatUSD, formatVND } from '../../utils/format/FormatMoney';
import { dateFormat } from '../../utils/format/DateVN';
import {
    autoFormatNumberInputChange,
    convertNumberMultiple,
} from '../../utils/format/NumberFormat';
import { adminGetUserByIdSV } from '../../services/admin';
import { routers } from '../../routers';
import {
    userCancelWithdrawSV,
    userCreateWithdrawSV,
    userResendOtpWithdrawSV,
    userVerifyWithdrawSV,
} from '../../services/user';
import requestRefreshToken from '../../utils/axios/refreshToken';

const cx = className.bind(styles);

export default function Withdraws() {
    const { state, dispatch } = useAppContext();
    const { amountWithdraw, otpCode, currentUser, userById } = state.set;
    const [snackbar, setSnackbar] = useState({
        open: false,
        type: '',
        message: '',
    });
    const [isProcessModalWithdraw, setIsProcessModalWithdraw] = useState(false);
    const [isProcessResendOTP, setIsProcessResendOTP] = useState(false);
    const [modalVerifyWithdraw, setModalVerifyWithdraw] = useState(false);
    const [itemWithdraw, setItemWithdraw] = useState(null);
    const [isProcessCancelWithdraw, setIsProcessCancelWithdraw] =
        useState(false);
    const handleModalWithdrawTrue = (e) => {
        e.stopPropagation();
        setModalVerifyWithdraw(true);
    };
    const handleModalWithdrawFalse = (e) => {
        e.stopPropagation();
        setModalVerifyWithdraw(false);
    };
    useEffect(() => {
        document.title = `R??t ti???n | ${process.env.REACT_APP_TITLE_WEB}`;
        if (currentUser) {
            adminGetUserByIdSV({
                id_user: currentUser?.id,
                dispatch,
                setSnackbar,
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
    const handleSendWithdrawSV = (data) => {
        userCreateWithdrawSV({
            id_user: currentUser?.id,
            idPayment: userById?.payment?.bank?.idPayment,
            email_user: currentUser?.email,
            amountVND: Number(amountWithdraw.replace(/\./g, '')),
            setSnackbar,
            token: data?.token,
            setIsProcessModalWithdraw,
            setModalVerifyWithdraw,
            userById: userById,
            setItemWithdraw,
        });
    };
    const handleSendWithdraw = async (e) => {
        await 1;
        if (currentUser) {
            if (!amountWithdraw) {
                setSnackbar({
                    open: true,
                    type: 'error',
                    message: 'B???n ch??a nh???p s??? ti???n r??t',
                });
            } else if (!checkbank) {
                setSnackbar({
                    open: true,
                    type: 'error',
                    message: 'B???n ch??a th??m t??i kho???n ng??n h??ng',
                });
            } else {
                setIsProcessModalWithdraw(true);
                requestRefreshToken(
                    currentUser,
                    handleSendWithdrawSV,
                    state,
                    dispatch,
                    setData,
                    setSnackbar
                );
            }
        } else {
            setSnackbar({
                open: true,
                type: 'error',
                message: <LoginRegisterCp />,
            });
        }
    };
    const handleSendOTP = (dataToken) => {
        userVerifyWithdrawSV({
            id_user: currentUser?.id,
            dispatch,
            code: otpCode,
            token: dataToken?.token,
            setSnackbar,
            setIsProcessModalWithdraw,
            setModalVerifyWithdraw,
        });
    };
    const handleAuthenWithdraw = async (e) => {
        await 1;
        if (!otpCode) {
            setSnackbar({
                open: true,
                type: 'error',
                message: 'B???n ch??a nh???p m?? x??c th???c',
            });
        } else {
            setIsProcessModalWithdraw(true);
            requestRefreshToken(
                currentUser,
                handleSendOTP,
                state,
                dispatch,
                setData,
                setSnackbar
            );
            dispatch(
                setData({
                    amountWithdraw: '',
                    otpCode: '',
                })
            );
        }
    };
    const handleCancelWithdrawSV = (dataToken, id) => {
        userCancelWithdrawSV({
            id_user: currentUser?.id,
            dispatch,
            id_withdraw: id,
            token: dataToken?.token,
            setSnackbar,
            setIsProcessCancelWithdraw,
            setModalVerifyWithdraw,
        });
    };
    const handleCancelWithdraw = async (id) => {
        await 1;
        setIsProcessCancelWithdraw(true);
        requestRefreshToken(
            currentUser,
            handleCancelWithdrawSV,
            state,
            dispatch,
            setData,
            setSnackbar,
            id
        );
        dispatch(
            setData({
                amountWithdraw: '',
                otpCode: '',
            })
        );
    };
    const resendOtpSV = (dataToken, id) => {
        userResendOtpWithdrawSV({
            id_user: currentUser.id,
            id_withdraw: id,
            dispatch,
            token: dataToken?.token,
            setSnackbar,
            setIsProcessResendOTP,
        });
    };
    const handleResendOTP = async (id) => {
        await 1;
        setIsProcessResendOTP(true);
        requestRefreshToken(
            currentUser,
            resendOtpSV,
            state,
            dispatch,
            setData,
            setSnackbar,
            id
        );
    };
    const checkbank =
        userById?.payment?.bank?.bankName &&
        userById?.payment?.bank?.name &&
        userById?.payment?.bank?.account;
    return (
        <div className={`${cx('container')}`}>
            <SliderHeader
                urlImage='https://images.unsplash.com/photo-1531973576160-7125cd663d86?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y29tcGFueXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=2000&q=2000'
                title1='R??T'
                title2='TI???N'
                animateName='animate__fadeInTopRight'
            />
            <SnackbarCp
                openSnackbar={snackbar.open}
                handleCloseSnackbar={handleCloseSnackbar}
                messageSnackbar={snackbar.message}
                typeSnackbar={snackbar.type}
            />
            <div className={`${cx('body')}`}>
                <div className={`${cx('list_info_container')}`}>
                    <div className={`${cx('list_info_item')}`}>
                        <div className={`${cx('item_text')}`}>
                            <i className='fa fa-wallet'></i>
                            <span>Th??ng tin thanh to??n</span>
                        </div>
                        <div className={`${cx('menu_conatiner')}`}>
                            {currentUser ? (
                                <>
                                    {checkbank ? (
                                        <CreditCard
                                            bankName={
                                                userById?.payment?.bank
                                                    ?.bankName
                                            }
                                            cardNumber={
                                                userById?.payment?.bank?.account
                                            }
                                            accountName={
                                                userById?.payment?.bank?.name
                                            }
                                        />
                                    ) : (
                                        <span>
                                            Vui l??ng t???o{' '}
                                            <Link
                                                className='fwb warning'
                                                to={`${routers.providentFund}/${routers.profile}`}
                                            >
                                                t??i kho???n nh???n ti???n
                                            </Link>{' '}
                                            ????? th???c hi???n giao d???ch
                                        </span>
                                    )}
                                </>
                            ) : (
                                <LoginRegisterCp padding='12px' />
                            )}
                        </div>
                    </div>
                    <div className={`${cx('list_info_item')}`}>
                        <div className={`${cx('menu_conatiner')}`}>
                            <FormInput
                                label='S??? ti???n r??t'
                                placeholder='---'
                                value={amountWithdraw}
                                name='amountWithdraw'
                                onChange={(e) =>
                                    dispatch(
                                        setData({
                                            amountWithdraw:
                                                autoFormatNumberInputChange(
                                                    e.target.value
                                                ),
                                        })
                                    )
                                }
                                unit={amountWithdraw && 'VND'}
                            />
                            <Link
                                to={`${routers.providentFund}/${routers.history}`}
                                className={`${cx(
                                    'text_seen_history'
                                )} fwb cancel`}
                            >
                                Xem l???ch s??? n???p ti???n/r??t ti???n
                            </Link>
                            <Button
                                className={`${cx('btn_submit')} successbgcbold`}
                                onClick={handleSendWithdraw}
                                isProcess={isProcessModalWithdraw}
                                disabled={isProcessModalWithdraw}
                            >
                                Ti???p t???c
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            {modalVerifyWithdraw && (
                <Modal
                    openModal={handleModalWithdrawTrue}
                    closeModal={handleModalWithdrawFalse}
                    titleHeader='X??c th???c r??t ti???n'
                    actionButtonText='G???i'
                    classNameButton={`infobgc`}
                    isProcess={isProcessModalWithdraw}
                    isProcessCancel={isProcessCancelWithdraw}
                    onClick={handleAuthenWithdraw}
                    onClickCancel={() => handleCancelWithdraw(itemWithdraw?.id)}
                >
                    <CustomcareLine
                        nameIcon='fa-solid fa-rotate-right'
                        colorIcon='success'
                        title='Tr???ng th??i:'
                        textLink={itemWithdraw?.status}
                    />
                    <CustomcareLine
                        nameIcon='fa-regular fa-clock'
                        colorIcon='info'
                        title='Ng??y r??t:'
                        textLink={dateFormat(
                            itemWithdraw?.createdAt,
                            'DD/MM/YYYY HH:mm:ss'
                        )}
                    />
                    <CustomcareLine
                        nameIcon='fa-solid fa-money-bill'
                        colorIcon='warning'
                        title='S??? ti???n r??t:'
                        textLink={formatVND(itemWithdraw?.amount)}
                    />
                    <CustomcareLine
                        nameIcon='fa fa-bank'
                        colorIcon='cancel'
                        title='Ng??n h??ng th??? h?????ng:'
                        bankMethod
                        bankName={userById?.payment?.bank?.bankName}
                        accountName={userById?.payment?.bank?.name}
                        accountNumber={userById?.payment?.bank?.account}
                    />
                    <FormInput
                        label='M?? x??c th???c'
                        placeholder='---'
                        value={otpCode}
                        name='otpCode'
                        onChange={(e) =>
                            dispatch(setData({ otpCode: e.target.value }))
                        }
                        classNameField={`mt8`}
                    />
                    <div
                        className={`${cx('text_resend')} fwb cancel`}
                        onClick={
                            isProcessResendOTP
                                ? () => {}
                                : () => handleResendOTP(itemWithdraw?.id)
                        }
                    >
                        {isProcessResendOTP ? '??ang g???i m??...' : 'G???i l???i m??'}
                    </div>
                </Modal>
            )}
        </div>
    );
}
