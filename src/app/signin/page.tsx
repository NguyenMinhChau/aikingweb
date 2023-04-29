'use client';
import Link from 'next/link';
import { FormInput } from '@/components';
import { useAppContext } from '@/helpers';
import { useState } from 'react';
import { setData } from '@/appState/reducer';
import { authLoginSV } from '@/services/authen';
import { useRouter } from 'next/navigation';

const SignInPage = () => {
  const { state, dispatch } = useAppContext();
  const { username, password } = state.set;
  const [isProcess, setIsProcess] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    type: '',
    message: '',
  });
  const { push } = useRouter();

  const handleLogin = () => {
    setIsProcess(true);
    authLoginSV({
      username,
      password,
      setSnackbar,
      dispatch,
      history: push,
      setIsProcess,
    });
    dispatch(
      setData({
        email: '',
        password: '',
      })
    );
  };

  const onChangeUserName = (e: any) => {
    dispatch(setData({ username: e.target.value }));
  };

  const onChangePassword = (e: any) => {
    dispatch(setData({ password: e.target.value }));
  };

  const onEnter = () => {};

  const renderLoginForm = () => {
    return (
      <form>
        <div className="mb-8">
          <FormInput
            label="Họ và tên"
            type="text"
            placeholder="Nhập họ và tên"
            name="email"
            value={username}
            onChange={onChangeUserName}
            onEnter={onEnter}
          />
        </div>
        <div className="mb-8">
          <FormInput
            label="Mật khẩu"
            type="password"
            placeholder="Nhập mật khẩu"
            name="password"
            value={password}
            onChange={onChangePassword}
            showPwd={false}
            onEnter={onEnter}
          />
        </div>
        <div className="mb-8 flex flex-col justify-between sm:flex-row sm:items-center">
          <div className="mb-4 sm:mb-0">
            <label
              htmlFor="checkboxLabel"
              className="flex cursor-pointer select-none items-center text-sm font-medium text-body-color"
            >
              <div className="relative">
                <input type="checkbox" id="checkboxLabel" className="sr-only" />
                <div className="box mr-4 flex h-5 w-5 items-center justify-center rounded border border-body-color border-opacity-20 dark:border-white dark:border-opacity-10">
                  <span className="opacity-0">
                    <svg
                      width="11"
                      height="8"
                      viewBox="0 0 11 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.0915 0.951972L10.0867 0.946075L10.0813 0.940568C9.90076 0.753564 9.61034 0.753146 9.42927 0.939309L4.16201 6.22962L1.58507 3.63469C1.40401 3.44841 1.11351 3.44879 0.932892 3.63584C0.755703 3.81933 0.755703 4.10875 0.932892 4.29224L0.932878 4.29225L0.934851 4.29424L3.58046 6.95832C3.73676 7.11955 3.94983 7.2 4.1473 7.2C4.36196 7.2 4.55963 7.11773 4.71406 6.9584L10.0468 1.60234C10.2436 1.4199 10.2421 1.1339 10.0915 0.951972ZM4.2327 6.30081L4.2317 6.2998C4.23206 6.30015 4.23237 6.30049 4.23269 6.30082L4.2327 6.30081Z"
                        fill="#ff5e57"
                        stroke="#ff5e57"
                        strokeWidth="0.4"
                      />
                    </svg>
                  </span>
                </div>
              </div>
              Nhớ đăng nhập
            </label>
          </div>
          <div>
            <Link
              href="/forgotPassword"
              className="text-sm font-medium text-primary hover:underline"
            >
              Quên mật khẩu?
            </Link>
          </div>
        </div>
        <div className="mb-6 flex justify-center">
          {!isProcess ? (
            <button
              className="flex w-full items-center justify-center rounded-md bg-primary py-4 px-9 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp"
              type="submit"
              onClick={handleLogin}
            >
              Đăng nhập
            </button>
          ) : (
            <i
              className="bx bx-loader bx-spin bx-rotate-90"
              style={{ color: '#000' }}
            ></i>
          )}
        </div>
      </form>
    );
  };

  return (
    <>
      <section className="relative z-10 overflow-hidden pt-36 pb-16 md:pb-20 lg:pt-[180px] lg:pb-28">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[500px] rounded-md bg-primary bg-opacity-5 py-10 px-6 dark:bg-dark sm:p-[60px]">
                <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                  Đăng nhập tài khoản
                </h3>
                <p className="mb-11 text-center text-base font-medium text-body-color">
                  Đăng nhập vào tài khoản của bạn để thanh toán nhanh hơn.
                </p>
                {renderLoginForm()}
                <p className="text-center text-base font-medium text-body-color">
                  Bạn chưa có tài khoản?{' '}
                  <Link href="/signup" className="text-primary hover:underline">
                    Đăng ký
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

export default SignInPage;
