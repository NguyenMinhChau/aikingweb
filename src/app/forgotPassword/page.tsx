'use client';
import { useState } from 'react';
import Link from 'next/link';
import { FormInput, SnackbarCp } from '@/components';
import { useAppContext } from '@/helpers';
import { userForgotPwdSV } from '@/services/user';
import { setData } from '@/appState/reducer';

const ForgotPasswordPage = () => {
  const { state, dispatch } = useAppContext();
  const { email } = state.set;
  const [isProcess, setIsProcess] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    type: '',
    message: '',
  });

  const onChangeEmail = (e: any) => {
    dispatch(setData({ email: e.target.value }));
  };

  const handleForgotPwd = () => {
    setIsProcess(true);
    userForgotPwdSV({
      email,
      setIsProcess,
      setSnackbar,
    });
    dispatch(
      setData({
        email: '',
      })
    );
  };
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
      <section className="relative z-10 overflow-hidden pt-36 pb-16 md:pb-20 lg:pt-[180px] lg:pb-28">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[500px] rounded-md bg-primary bg-opacity-5 py-10 px-6 dark:bg-dark sm:p-[60px]">
                <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                  Quên mật khẩu
                </h3>
                <SnackbarCp
                  openSnackbar={snackbar.open}
                  handleCloseSnackbar={handleCloseSnackbar}
                  messageSnackbar={snackbar.message}
                  typeSnackbar={snackbar.type}
                />
                <form>
                  <div className="mb-8">
                    <FormInput
                      label="Email"
                      type="email"
                      placeholder="Nhập email của bạn"
                      name="email"
                      value={email}
                      onChange={onChangeEmail}
                      onEnter={handleForgotPwd}
                    />
                  </div>
                  <div className="mb-6 flex justify-center">
                    {!isProcess ? (
                      <button
                        className="flex w-full items-center justify-center rounded-md bg-primary py-4 px-9 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp"
                        onClick={handleForgotPwd}
                      >
                        Gửi
                      </button>
                    ) : (
                      <i
                        className="bx bx-loader bx-spin bx-rotate-90"
                        style={{ color: '#000' }}
                      ></i>
                    )}
                  </div>
                </form>
                <p className="text-center text-base font-medium text-body-color">
                  Bạn chưa có tài khoản?{' '}
                  <Link href="/signup" className="text-primary hover:underline">
                    Đăng ký
                  </Link>
                </p>
                <p className="text-center text-base font-medium text-body-color">
                  Bạn đã có một tài khoản?{' '}
                  <Link href="/signin" className="text-primary hover:underline">
                    Đăng nhập
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 left-0 z-[-1]">
          <svg
            width="1440"
            height="969"
            viewBox="0 0 1440 969"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask
              id="mask0_95:1005"
              style={{ maskType: 'alpha' }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="1440"
              height="969"
            >
              <rect width="1440" height="969" fill="#090E34" />
            </mask>
            <g mask="url(#mask0_95:1005)">
              <path
                opacity="0.1"
                d="M1086.96 297.978L632.959 554.978L935.625 535.926L1086.96 297.978Z"
                fill="url(#paint0_linear_95:1005)"
              />
              <path
                opacity="0.1"
                d="M1324.5 755.5L1450 687V886.5L1324.5 967.5L-10 288L1324.5 755.5Z"
                fill="url(#paint1_linear_95:1005)"
              />
            </g>
            <defs>
              <linearGradient
                id="paint0_linear_95:1005"
                x1="1178.4"
                y1="151.853"
                x2="780.959"
                y2="453.581"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#ff5e57" />
                <stop offset="1" stopColor="#ff5e57" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_95:1005"
                x1="160.5"
                y1="220"
                x2="1099.45"
                y2="1192.04"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#ff5e57" />
                <stop offset="1" stopColor="#ff5e57" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>
    </>
  );
};

export default ForgotPasswordPage;
