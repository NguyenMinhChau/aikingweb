/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import className from 'classnames/bind';
import styles from './Proifile.module.css';
import {
    CreditCard,
    CustomcareLine,
    FormInput,
    IconForm,
    Image,
    LoginRegisterCp,
    LoginRegisterCpTwo,
    Modal,
    SelectValueCp,
    SliderHeader,
    SnackbarCp,
} from '../../components';
import IMAGE from '../../assets/images/logo-company.png';
import { formatVND } from '../../utils/format/FormatMoney';
import { routers } from '../../routers';
import { useAppContext } from '../../utils';
import { setData } from '../../app/reducer';
import { dataBank } from '../../utils/dataBank';
import { adminGetUserByIdSV } from '../../services/admin';
import {
    userAddPaymentSV,
    userChangePasswordSV,
    userUploadLicenseSV,
} from '../../services/user';
import { authLogoutSV } from '../../services/authen';
import requestRefreshToken from '../../utils/axios/refreshToken';

const cx = className.bind(styles);

export default function Proifile() {
    const { state, dispatch } = useAppContext();
    const history = useNavigate();
    const {
        currentUser,
        userById,
        email,
        otpCode,
        bankName,
        accountNumber,
        accountName,
        password,
        confirmPassword,
        oldPassword,
    } = state.set;
    const [snackbar, setSnackbar] = useState({
        open: false,
        type: '',
        message: '',
    });
    const [showEye, setShowEye] = useState(false);
    const [isProcessModalEmail, setIsProcessModalEmail] = useState(false);
    const [modalEmail, setModalEmail] = useState(false);
    const [isShowOTP, setIsShowOTP] = useState(false);
    const [modalRecivingAccount, setModalRecivingAccount] = useState(false);
    const [showSelect, setShowSelect] = useState(false);
    const [isProcessModalReciving, setisProcessModalReciving] = useState(false);
    const [modalChangePwd, setmodalChangePwd] = useState(false);
    const [modalUpload, setModalUpload] = useState(false);
    const [isProcessModalPwd, setisProcessModalPwd] = useState(false);
    const [isProcessModalUpload, setisProcessModalUpload] = useState(false);
    const [uploadCCCDFont, setUploadCCCDFont] = useState(null);
    const [uploadCCCDBeside, setUploadCCCDBeside] = useState(null);
    const [uploadLicenseFont, setUploadLicenseFont] = useState(null);
    const [uploadLicenseBeside, setUploadLicenseBeside] = useState(null);
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbar({
            ...snackbar,
            open: false,
        });
    };
    const handleModalEmailTrue = (e) => {
        e.stopPropagation();
        setModalEmail(true);
    };
    const handleModalEmailFalse = (e) => {
        e.stopPropagation();
        setIsShowOTP(false);
        setModalEmail(false);
        dispatch(
            setData({
                email: '',
                otpCode: '',
            })
        );
    };
    const handleModalRecivingTrue = (e) => {
        e.stopPropagation();
        setModalRecivingAccount(true);
    };
    const handleModalRecivingFalse = (e) => {
        e.stopPropagation();
        setModalRecivingAccount(false);
        dispatch(
            setData({
                bankName: '',
                accountName: '',
                accountNumber: '',
            })
        );
    };
    const handleModalPwdTrue = (e) => {
        e.stopPropagation();
        setmodalChangePwd(true);
    };
    const handleModalPwdFalse = (e) => {
        e.stopPropagation();
        setmodalChangePwd(false);
        dispatch(
            setData({
                oldPassword: '',
                password: '',
                confirmPassword: '',
            })
        );
    };
    const handleModalUploadTrue = (e) => {
        e.stopPropagation();
        setModalUpload(true);
    };
    const handleModalUploadFalse = (e) => {
        e.stopPropagation();
        setModalUpload(false);
        setUploadCCCDFont(null);
        setUploadCCCDBeside(null);
        setUploadLicenseFont(null);
        setUploadLicenseBeside(null);
    };
    const handleModalAuthenOldEmail = (e) => {
        e.stopPropagation();
        setModalEmail(true);
        setIsShowOTP(true);
    };
    useEffect(() => {
        document.title = `T??i kho???n | ${process.env.REACT_APP_TITLE_WEB}`;
        if (currentUser) {
            adminGetUserByIdSV({
                id_user: currentUser?.id,
                dispatch,
                setSnackbar,
            });
        }
    }, []);
    const handleShowEye = () => {
        setShowEye(!showEye);
    };
    const handleClick = () => {
        setSnackbar({
            open: true,
            type: 'info',
            message: 'Giao di???n ??ang ???????c ph??t tri???n!',
        });
    };
    const handleSubmitNewEmail = async () => {
        await 1;
        if (!email) {
            setSnackbar({
                open: true,
                type: 'error',
                message: 'Vui l??ng nh???p email!',
            });
        } else {
            setIsProcessModalEmail(true);
            setTimeout(() => {
                setIsProcessModalEmail(false);
                console.log(email);
                setIsShowOTP(true);
                dispatch(setData({ email: '' }));
            }, 3000);
        }
    };
    const handleAuthenOTP = async () => {
        await 1;
        if (!otpCode) {
            setSnackbar({
                open: true,
                type: 'error',
                message: 'Vui l??ng nh???p m?? OTP!',
            });
        } else {
            setIsProcessModalEmail(true);
            setTimeout(() => {
                setIsProcessModalEmail(false);
                setModalEmail(false);
                setIsShowOTP(false);
                console.log(otpCode);
                setSnackbar({
                    open: true,
                    type: 'info',
                    message: 'Ch???c n??ng ??ang ???????c ph??t tri???n!',
                });
                dispatch(setData({ otpCode: '' }));
            }, 3000);
        }
    };
    const handleSendMethod = (dataToken) => {
        userAddPaymentSV({
            id_user: currentUser?.id,
            account: accountNumber,
            bankName: bankName?.name,
            name: accountName,
            setSnackbar,
            setisProcessModalReciving,
            setModalRecivingAccount,
            history,
            token: dataToken?.token,
        });
    };
    const handleAddMethod = async () => {
        await 1;
        if (!bankName || !accountName || !accountNumber) {
            setSnackbar({
                open: true,
                type: 'error',
                message: 'Vui l??ng nh???p ?????y ????? th??ng tin',
            });
        } else {
            setisProcessModalReciving(true);
            requestRefreshToken(
                currentUser,
                handleSendMethod,
                state,
                dispatch,
                setData,
                setSnackbar
            );
            adminGetUserByIdSV({
                id_user: currentUser?.id,
                dispatch,
                setSnackbar,
            });
            dispatch(
                setData({
                    bankName: '',
                    accountName: '',
                    accountNumber: '',
                })
            );
        }
    };
    const handleSendPwd = (dataToken) => {
        userChangePasswordSV({
            id_user: currentUser?.id,
            token: dataToken?.token,
            oldPassword: oldPassword,
            newPassword: password,
            setSnackbar,
            setisProcessModalPwd,
            setmodalChangePwd,
        });
    };
    const handleChangePwd = async () => {
        await 1;
        if (!password || !oldPassword || !confirmPassword) {
            setSnackbar({
                open: true,
                type: 'error',
                message: 'Vui l??ng nh???p ?????y ????? th??ng tin',
            });
        } else if (password !== confirmPassword) {
            setSnackbar({
                open: true,
                type: 'error',
                message: 'M???t kh???u kh??ng kh???p',
            });
        } else {
            setisProcessModalPwd(true);
            requestRefreshToken(
                currentUser,
                handleSendPwd,
                state,
                dispatch,
                setData,
                setSnackbar
            );
        }
    };
    const handleLogout = async () => {
        await 1;
        authLogoutSV({
            id_user: currentUser?.id,
            history,
            setSnackbar,
            dispatch,
        });
    };
    const handleSendUploadSV = (dataToken) => {
        userUploadLicenseSV({
            id_user: currentUser?.id,
            token: dataToken?.token,
            setSnackbar,
            setisProcessModalUpload,
            setModalUpload,
            imagePersonNationalityFont: uploadCCCDFont?.file,
            imagePersonNationalityBeside: uploadCCCDBeside?.file,
            imageLicenseFont: uploadLicenseFont?.file,
            imageLicenseBeside: uploadLicenseBeside?.file,
            setUploadCCCDFont,
            setUploadCCCDBeside,
            setUploadLicenseFont,
            setUploadLicenseBeside,
        });
    };
    const handleUpload = async () => {
        await 1;
        if (
            (userById?.uploadCCCDFont || uploadCCCDFont) &&
            (userById?.uploadCCCDBeside || uploadCCCDBeside) &&
            (userById?.uploadLicenseFont || uploadLicenseFont) &&
            (userById?.uploadLicenseBeside || uploadLicenseBeside)
        ) {
            setisProcessModalUpload(true);
            requestRefreshToken(
                currentUser,
                handleSendUploadSV,
                state,
                dispatch,
                setData,
                setSnackbar
            );
        } else {
            setSnackbar({
                open: true,
                type: 'error',
                message: 'Vui l??ng ch???n ?????y ????? ???nh',
            });
        }
    };
    const checkbank =
        userById?.payment?.bank?.bankName &&
        userById?.payment?.bank?.name &&
        userById?.payment?.bank?.account;
    const URL_SERVER = process.env.REACT_APP_URL_SERVER;
    const RenderImageDocument = ({
        nameFile,
        idFile,
        urlImage,
        urlImagePending,
        onChange,
    }) => {
        return (
            <label className={`${cx('image-item')}`} id={idFile}>
                {!urlImage && !urlImagePending ? (
                    <>
                        <IconForm.UploadIcon
                            className={`${cx('icon-upload')}`}
                        />
                    </>
                ) : (
                    <Image
                        src={
                            !urlImagePending
                                ? `${URL_SERVER}/${urlImage?.replace(
                                      'uploads/',
                                      ''
                                  )}`
                                : urlImagePending
                        }
                        alt=''
                        className={`${cx('image-view')}`}
                    />
                )}
                <input
                    type='file'
                    id={idFile}
                    className={`${cx('input-file')}`}
                    name={nameFile}
                    onChange={onChange}
                />
            </label>
        );
    };
    const handleChangeUploadCCCDFont = useCallback(
        (e) => {
            const { files } = e.target;
            setUploadCCCDFont({
                url: URL.createObjectURL(files[0]),
                file: files[0],
            });
        },
        [uploadCCCDFont]
    );
    const handleChangeUploadCCCDBeside = useCallback(
        (e) => {
            const { files } = e.target;
            setUploadCCCDBeside({
                url: URL.createObjectURL(files[0]),
                file: files[0],
            });
        },
        [uploadCCCDBeside]
    );
    const handleChangeUploadLicenseFont = useCallback(
        (e) => {
            const { files } = e.target;
            setUploadLicenseFont({
                url: URL.createObjectURL(files[0]),
                file: files[0],
            });
        },
        [uploadLicenseFont]
    );
    const handleChangeUploadLicenseBeside = useCallback(
        (e) => {
            const { files } = e.target;
            setUploadLicenseBeside({
                url: URL.createObjectURL(files[0]),
                file: files[0],
            });
        },
        [uploadLicenseBeside]
    );
    return (
        <div className={`${cx('container')}`}>
            <SliderHeader
                urlImage='https://images.unsplash.com/photo-1531973576160-7125cd663d86?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y29tcGFueXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=2000&q=2000'
                title1='T??I'
                title2='KHO???N'
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
                            <i className='fa fa-user'></i>
                            <span>Th??ng tin t??i kho???n</span>
                        </div>
                        {currentUser ? (
                            <div className={`${cx('menu_conatiner')}`}>
                                <div className={`${cx('authen_container')}`}>
                                    <Image
                                        src={IMAGE}
                                        alt='image_user'
                                        className={`${cx('image_user')}`}
                                    />
                                    <div
                                        className={`${cx(
                                            'authen_email_container'
                                        )}`}
                                    >
                                        <div className={`${cx('name_user')}`}>
                                            {currentUser?.username || '---'}
                                        </div>
                                        <div
                                            className={`${cx('email_authen')}`}
                                            onClick={handleModalEmailTrue}
                                        >
                                            <span>
                                                {currentUser?.email || '---'}
                                            </span>
                                            <i class='bx bx-chevron-right'></i>
                                        </div>
                                        <div
                                            className={`${cx('btn_authen')}`}
                                            onClick={handleModalAuthenOldEmail}
                                        >
                                            X??c th???c
                                        </div>
                                    </div>
                                </div>
                                <CustomcareLine
                                    nameIcon='bx bx-wallet'
                                    colorIcon='success'
                                    title='T???ng t??i s???n:'
                                    price={formatVND(currentUser?.balance || 0)}
                                    eye
                                    showEye={showEye}
                                    handleShowEye={handleShowEye}
                                />
                                <CustomcareLine
                                    nameIcon='bx bxs-credit-card-alt'
                                    colorIcon='cancel'
                                    link={'##'}
                                    textLink='T??i kho???n nh???n ti???n'
                                    onClick={handleModalRecivingTrue}
                                />
                                <CustomcareLine
                                    nameIcon='fa-solid fa-arrows-rotate'
                                    colorIcon='info'
                                    link={'##'}
                                    textLink='?????i m???t kh???u'
                                    onClick={handleModalPwdTrue}
                                />
                                <CustomcareLine
                                    nameIcon='fas fa-upload'
                                    colorIcon='success'
                                    link={'##'}
                                    textLink='Gi???y ph??p l??i xe/CCCD'
                                    onClick={handleModalUploadTrue}
                                />
                                <CustomcareLine
                                    nameIcon='fas fa-link'
                                    colorIcon='warning'
                                    link={'##'}
                                    textLink='T??i kho???n li??n k???t'
                                    noneBorderBottom
                                    onClick={handleClick}
                                />
                            </div>
                        ) : (
                            <LoginRegisterCp padding='24px' />
                        )}
                    </div>
                    <div className={`${cx('list_info_item')}`}>
                        <div className={`${cx('menu_conatiner')}`}>
                            <CustomcareLine
                                nameIcon='fa-regular fa-newspaper'
                                colorIcon='success'
                                link={'##'}
                                textLink='??i???u ki???n v?? ??i???u kho???n'
                                onClick={handleClick}
                            />
                            <CustomcareLine
                                nameIcon='fa-solid fa-user-plus'
                                colorIcon='warning'
                                link={'##'}
                                textLink='M???i b???n b??'
                                onClick={handleClick}
                            />
                            <CustomcareLine
                                nameIcon='fa-solid fa-users'
                                colorIcon='cancel'
                                link={'##'}
                                textLink='Hoa h???ng cho nh?? ?????u t??'
                                onClick={handleClick}
                            />
                            <CustomcareLine
                                nameIcon='fa-solid fa-circle-info'
                                colorIcon='info'
                                link={'##'}
                                textLink='H?????ng d???n s??? d???ng'
                                onClick={handleClick}
                            />
                            <CustomcareLine
                                nameIcon='fa-solid fa-phone'
                                colorIcon='success'
                                link={`${routers.providentFund}/${routers.customcare}`}
                                textLink='CSKH'
                                noneBorderBottom={!currentUser}
                            />
                            {currentUser && (
                                <div
                                    className={`${cx(
                                        'btn_logout'
                                    )} cancelbgcbold`}
                                    onClick={handleLogout}
                                >
                                    ????ng xu???t
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {modalEmail && (
                <Modal
                    openModal={handleModalEmailTrue}
                    closeModal={handleModalEmailFalse}
                    titleHeader={isShowOTP ? 'X??c th???c OTP' : 'Thay ?????i email'}
                    actionButtonText={isShowOTP ? 'X??c th???c' : 'G???i OTP'}
                    classNameButton={'infobgc'}
                    isProcess={isProcessModalEmail}
                    onClick={isShowOTP ? handleAuthenOTP : handleSubmitNewEmail}
                >
                    {isShowOTP ? (
                        <FormInput
                            label='M?? OTP'
                            placeholder='Nh???p m??'
                            name='otpCode'
                            value={otpCode}
                            onChange={(e) =>
                                dispatch(setData({ otpCode: e.target.value }))
                            }
                        />
                    ) : (
                        <FormInput
                            label='Nh???p email m???i'
                            placeholder='V?? d???: example@gmail.com'
                            name='email'
                            value={email}
                            onChange={(e) =>
                                dispatch(setData({ email: e.target.value }))
                            }
                        />
                    )}
                </Modal>
            )}
            {modalRecivingAccount && (
                <Modal
                    openModal={handleModalRecivingTrue}
                    closeModal={handleModalRecivingFalse}
                    titleHeader='T??i kho???n nh???n ti???n'
                    actionButtonText='G???i'
                    classNameButton={`warningbgc`}
                    isProcess={isProcessModalReciving}
                    onClick={handleAddMethod}
                    hideButton={checkbank}
                >
                    <p className={`${cx('text_desc')} info fwb mb8`}>
                        N???u ???? c?? t??i kho???n nh??ng kh??ng hi???n th??ng tin. Vui l??ng
                        F5 l???i trang, xin c???m ??n!
                    </p>
                    {checkbank ? (
                        <CreditCard
                            bankName={userById?.payment?.bank?.bankName}
                            cardNumber={userById?.payment?.bank?.account}
                            accountName={userById?.payment?.bank?.name}
                        />
                    ) : (
                        <>
                            <FormInput
                                label='S??? t??i kho???n'
                                placeholder='---'
                                name='accountNumber'
                                value={accountNumber}
                                onChange={(e) =>
                                    dispatch(
                                        setData({
                                            accountNumber: e.target.value,
                                        })
                                    )
                                }
                            />
                            <FormInput
                                label='T??n t??i kho???n'
                                placeholder='---'
                                name='accountName'
                                value={accountName}
                                onChange={(e) =>
                                    dispatch(
                                        setData({
                                            accountName: e.target.value,
                                        })
                                    )
                                }
                            />
                            <SelectValueCp
                                label='T??n ng??n h??ng'
                                value={bankName?.name}
                                placeholder='---'
                                data={dataBank}
                                nameSet='bankName'
                                stateSelect={showSelect}
                                setStateSelect={setShowSelect}
                            />
                        </>
                    )}
                </Modal>
            )}
            {modalChangePwd && (
                <Modal
                    openModal={handleModalPwdTrue}
                    closeModal={handleModalPwdFalse}
                    titleHeader='Thay ?????i m???t kh???u'
                    actionButtonText='G???i'
                    isProcess={isProcessModalPwd}
                    classNameButton={`warningbgc`}
                    onClick={handleChangePwd}
                >
                    <FormInput
                        label='M???t kh???u c??'
                        placeholder='Nh???p m???t kh???u c??'
                        name='oldPassword'
                        value={oldPassword}
                        showPwd
                        onChange={(e) =>
                            dispatch(setData({ oldPassword: e.target.value }))
                        }
                    />
                    <FormInput
                        label='M???t kh???u m???i'
                        placeholder='Nh???p m???t kh???u m???i'
                        name='password'
                        value={password}
                        showPwd
                        onChange={(e) =>
                            dispatch(setData({ password: e.target.value }))
                        }
                    />
                    <FormInput
                        label='X??c th???c m???t kh???u'
                        placeholder='X??c th???c'
                        name='confirmPassword'
                        value={confirmPassword}
                        showPwd
                        onChange={(e) =>
                            dispatch(
                                setData({ confirmPassword: e.target.value })
                            )
                        }
                    />
                </Modal>
            )}
            {modalUpload && (
                <Modal
                    openModal={handleModalUploadTrue}
                    closeModal={handleModalUploadFalse}
                    titleHeader='T???i gi???y t???'
                    actionButtonText='G???i'
                    isProcess={isProcessModalUpload}
                    classNameButton={`warningbgc`}
                    onClick={handleUpload}
                >
                    <div className={`${cx('container-document')}`}>
                        <p className={`${cx('text_desc')} info fwb mb8`}>
                            N???u ???? t???i gi???y t??? nh??ng kh??ng hi???n th??ng tin. Vui
                            l??ng F5 l???i trang, xin c???m ??n!
                        </p>
                        <div className={`${cx('document-title')}`}>
                            1. C??n c?????c c??ng d??n
                        </div>
                        <div className={`${cx('doucment-image-container')}`}>
                            <RenderImageDocument
                                nameFile='uploadCCCDFont'
                                idFile='uploadCCCDFont'
                                urlImage={userById?.uploadCCCDFont}
                                onChange={handleChangeUploadCCCDFont}
                                urlImagePending={uploadCCCDFont?.url}
                            />
                            <RenderImageDocument
                                nameFile='uploadCCCDBeside'
                                idFile='uploadCCCDBeside'
                                urlImage={userById?.uploadCCCDBeside}
                                onChange={handleChangeUploadCCCDBeside}
                                urlImagePending={uploadCCCDBeside?.url}
                            />
                        </div>
                    </div>
                    <div className={`${cx('container-document')}`}>
                        <div className={`${cx('document-title')}`}>
                            2. Gi???y ph??p l??i xe
                        </div>
                        <div className={`${cx('doucment-image-container')}`}>
                            <RenderImageDocument
                                nameFile='uploadLicenseFont'
                                idFile='uploadLicenseFont'
                                urlImage={userById?.uploadLicenseFont}
                                onChange={handleChangeUploadLicenseFont}
                                urlImagePending={uploadLicenseFont?.url}
                            />
                            <RenderImageDocument
                                nameFile='uploadLicenseBeside'
                                idFile='uploadLicenseBeside'
                                urlImage={userById?.uploadLicenseBeside}
                                onChange={handleChangeUploadLicenseBeside}
                                urlImagePending={uploadLicenseBeside?.url}
                            />
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
}
