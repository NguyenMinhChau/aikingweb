/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import className from 'classnames/bind';
import styles from './Deposits.module.css';
import { Link, useNavigate } from 'react-router-dom';
import {
    Button,
    CustomcareLine,
    FileUploadSingle,
    FormInput,
    FundMenuAndSlider,
    Image,
    LoginRegisterCp,
    LoginRegisterCpTwo,
    Modal,
    SelectValueCp,
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
import {
    userCreateDepositsSV,
    userUploadBillsDepositsSV,
} from '../../services/user';
import requestRefreshToken from '../../utils/axios/refreshToken';
import { dataBankAdmin } from '../../utils/dataBankAdmin';
import { routers } from '../../routers';

const cx = className.bind(styles);
const IMAGE_SLIDERS = [
    {
        id: 1,
        url: 'https://images.unsplash.com/photo-1560264280-88b68371db39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y3VzdG9tZXIlMjBzZXJ2aWNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=2000&q=60',
    },
];

export default function Deposits() {
    const { state, dispatch } = useAppContext();
    const { amountDeposits, bankDeposits, file, currentUser } = state.set;
    const [snackbar, setSnackbar] = useState({
        open: false,
        type: '',
        message: '',
    });
    const [showSelect, setShowSelect] = useState(false);
    const [isProcessModalDeposits, setIsProcessModalDeposits] = useState(false);
    const [isProcessUploadDeposits, setIsProcessUploadDeposits] =
        useState(false);
    const [isModalUploadDeposits, setisModalUploadDeposits] = useState(false);
    const [dataReturn, setDataReturn] = useState(null);
    const history = useNavigate();
    const handleModalDepositsTrue = (e) => {
        e.stopPropagation();
        setisModalUploadDeposits(true);
    };
    const handleModalDepositsFalse = (e) => {
        e.stopPropagation();
        setisModalUploadDeposits(false);
        dispatch(
            setData({
                file: [],
                amountDeposits: '',
                bankDeposits: '',
            })
        );
    };
    useEffect(() => {
        document.title = `N???p ti???n | ${process.env.REACT_APP_TITLE_WEB}`;
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
    const handleSendDeposits = (dataToken) => {
        userCreateDepositsSV({
            id_user: currentUser?.id,
            email_user: currentUser?.email,
            idPayment: 1,
            amountVND: amountDeposits.replace(/\./g, ''),
            token: dataToken?.token,
            setIsProcessModalDeposits,
            setisModalUploadDeposits,
            setSnackbar,
            setDataReturn,
        });
    };
    const handleSubmit = async () => {
        await 1;
        if (currentUser) {
            if (!amountDeposits || !bankDeposits) {
                setSnackbar({
                    open: true,
                    type: 'error',
                    message: 'B???n ch??a nh???p ????? th??ng tin',
                });
            } else {
                setIsProcessModalDeposits(true);
                requestRefreshToken(
                    currentUser,
                    handleSendDeposits,
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
    const handleSendUpload = (dataToken) => {
        userUploadBillsDepositsSV({
            id_user: currentUser?.id,
            dispatch,
            id_deposits: dataReturn?.id,
            image: file,
            token: dataToken?.token,
            setSnackbar,
            setIsProcessUploadDeposits,
            setisModalUploadDeposits,
        });
    };
    const handleUploadBillDeposits = async () => {
        await 1;
        if (file.length === 0) {
            setSnackbar({
                open: true,
                type: 'error',
                message: 'B???n ch??a ch???n file',
            });
        } else {
            setIsProcessUploadDeposits(true);
            setTimeout(() => {
                requestRefreshToken(
                    currentUser,
                    handleSendUpload,
                    state,
                    dispatch,
                    setData,
                    setSnackbar
                );
                dispatch(
                    setData({
                        amountDeposits: '',
                        bankDeposits: '',
                        file: [],
                    })
                );
            }, 3000);
        }
    };
    const urlImageFile = file.length > 0 && URL.createObjectURL(file[0]);
    return (
        <div className={`${cx('container')}`}>
            <SliderHeader
                urlImage='https://images.unsplash.com/photo-1531973576160-7125cd663d86?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y29tcGFueXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=2000&q=2000'
                title1='N???P'
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
                <FundMenuAndSlider
                    imageSliders={IMAGE_SLIDERS}
                    title='Th??ng tin n???p'
                    nameIconTitle='fa-solid fa-hand-holding-dollar'
                    paddingBottom={'55%'}
                >
                    <div className={`${cx('desc_body')}`}>
                        <SelectValueCp
                            label='T??n ng??n h??ng th??? h?????ng'
                            value={bankDeposits?.name}
                            placeholder='---'
                            data={dataBankAdmin}
                            nameSet='bankDeposits'
                            stateSelect={showSelect}
                            setStateSelect={setShowSelect}
                        />
                        <FormInput
                            label='S??? ti???n n???p'
                            placeholder='---'
                            value={amountDeposits}
                            name='amountDeposits'
                            onChange={(e) => {
                                dispatch(
                                    setData({
                                        amountDeposits:
                                            autoFormatNumberInputChange(
                                                e.target.value
                                            ),
                                    })
                                );
                            }}
                            unit={amountDeposits && 'VND'} // ???
                        />
                        <Link
                            to={`${routers.providentFund}/${routers.history}`}
                            className={`${cx('text_seen_history')} fwb cancel`}
                        >
                            Xem l???ch s??? n???p ti???n/r??t ti???n
                        </Link>
                        <Button
                            className={`${cx('btn_submit')} successbgcbold`}
                            onClick={handleSubmit}
                            isProcess={isProcessModalDeposits}
                            disabled={isProcessModalDeposits}
                        >
                            Ti???p t???c
                        </Button>
                    </div>
                </FundMenuAndSlider>
            </div>
            {isModalUploadDeposits && (
                <Modal
                    openModal={handleModalDepositsTrue}
                    closeModal={handleModalDepositsFalse}
                    titleHeader='T???i h??a ????n n???p ti???n'
                    actionButtonText='G???i'
                    classNameButton={`infobgc`}
                    isProcess={isProcessUploadDeposits}
                    onClick={handleUploadBillDeposits}
                >
                    <CustomcareLine
                        nameIcon='fa-solid fa-rotate-right'
                        colorIcon='success'
                        title='Tr???ng th??i:'
                        textLink={dataReturn?.status}
                    />
                    <CustomcareLine
                        nameIcon='fa-regular fa-clock'
                        colorIcon='info'
                        title='Ng??y r??t:'
                        textLink={dateFormat(
                            dataReturn?.createdAt,
                            'DD/MM/YYYY HH:mm:ss'
                        )}
                    />
                    <CustomcareLine
                        nameIcon='fa-solid fa-money-bill'
                        colorIcon='warning'
                        title='S??? ti???n r??t:'
                        textLink={formatVND(dataReturn?.amount || 0)}
                    />
                    <CustomcareLine
                        nameIcon='fa fa-bank'
                        colorIcon='cancel'
                        title='Ng??n h??ng th??? h?????ng:'
                        bankMethod
                        bankName={bankDeposits?.name}
                        accountName={bankDeposits?.accountName}
                        accountNumber={bankDeposits?.accountNumber}
                    />
                    <FileUploadSingle label='T???i h??nh ???nh' />
                    {urlImageFile && (
                        <div className={`${cx('view_image')}`}>
                            <Image
                                src={urlImageFile}
                                alt='image_upload'
                                className={`${cx('image')}`}
                            />
                        </div>
                    )}
                </Modal>
            )}
        </div>
    );
}
