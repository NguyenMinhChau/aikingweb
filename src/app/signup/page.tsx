'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authRegisterSV } from '../../../services/authen';
import { useAppContext } from '../../../helpers';
import { actions } from '../../../appState/';
import { SnackbarCp } from '../../../components';
import { checkEmail, checkPwd } from '../../../helpers/validate';

const SignupPage = () => {
	const { state, dispatch } = useAppContext();
	const { username, email, password } = state.set;
	const [isProcess, setIsProcess] = useState(false);
	const [snackbar, setSnackbar] = useState({
		open: false,
		type: '',
		message: '',
	});
	const router = useRouter();
	const handleCloseSnackbar = (event: any, reason: any) => {
		if (reason === 'clickaway') {
			return;
		}
		setSnackbar({
			...snackbar,
			open: false,
		});
	};
	const handleChange = (e: any) => {
		const { name, value } = e.target;
		dispatch(
			actions.setData({
				[name]: value,
			}),
		);
	};
	const handleSignup = (e: any) => {
		e.preventDefault();
		if (!email || !username || !password) {
			setSnackbar({
				open: true,
				type: 'error',
				message: 'Vui lòng nhập đầy đủ thông tin!',
			});
		} else if (!checkPwd(password)) {
			setSnackbar({
				open: true,
				type: 'error',
				message:
					'Mật khẩu ít nhất 8 kí tự và bao gồm ít nhất một chữ cái viết hoa, một chữ cái viết thường, một số và một kí tự đặc biệt!',
			});
		} else if (!checkEmail(email)) {
			setSnackbar({
				open: true,
				type: 'error',
				message: 'Email không hợp lệ!',
			});
		} else {
			setIsProcess(true);
			authRegisterSV({
				username,
				email,
				password,
				setSnackbar,
				setIsProcess,
				router,
			});
		}
	};
	return (
		<>
			<SnackbarCp
				openSnackbar={snackbar.open}
				handleCloseSnackbar={handleCloseSnackbar}
				messageSnackbar={snackbar.message}
				typeSnackbar={snackbar.type}
			/>
			<section className="relative z-10 overflow-hidden pt-36 pb-16 md:pb-20 lg:pt-[180px] lg:pb-28">
				<div className="container">
					<div className="-mx-4 flex flex-wrap">
						<div className="w-full px-4">
							<div className="mx-auto max-w-[500px] rounded-md bg-primary bg-opacity-5 py-10 px-6 dark:bg-dark sm:p-[60px]">
								<h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
									Đăng ký tài khoản
								</h3>
								<p className="mb-11 text-center text-base font-medium text-body-color">
									Nó hoàn toàn miễn phí và siêu dễ dàng
								</p>
								<form>
									<div className="mb-8">
										<label
											htmlFor="name"
											className="mb-3 block text-sm font-medium text-dark dark:text-white"
										>
											{' '}
											Họ và tên{' '}
										</label>
										<input
											type="text"
											name="username"
											onChange={handleChange}
											placeholder="Nhập họ và tên"
											className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
										/>
									</div>
									<div className="mb-8">
										<label
											htmlFor="email"
											className="mb-3 block text-sm font-medium text-dark dark:text-white"
										>
											{' '}
											Email{' '}
										</label>
										<input
											type="email"
											name="email"
											onChange={handleChange}
											placeholder="Nhập email của bạn"
											className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
										/>
									</div>
									<div className="mb-8">
										<label
											htmlFor="password"
											className="mb-3 block text-sm font-medium text-dark dark:text-white"
										>
											{' '}
											Mật khẩu{' '}
										</label>
										<input
											type="password"
											name="password"
											onChange={handleChange}
											placeholder="Nhập mật khẩu"
											className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
										/>
									</div>
									<div className="mb-8 flex">
										<label
											htmlFor="checkboxLabel"
											className="flex cursor-pointer select-none text-sm font-medium text-body-color"
										>
											<div className="relative">
												<input
													type="checkbox"
													id="checkboxLabel"
													className="sr-only"
												/>
												<div className="box mr-4 mt-1 flex h-5 w-5 items-center justify-center rounded border border-body-color border-opacity-20 dark:border-white dark:border-opacity-10">
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
																fill="#157bfb"
																stroke="#157bfb"
																strokeWidth="0.4"
															/>
														</svg>
													</span>
												</div>
											</div>
											<span>
												Bằng cách tạo tài khoản có nghĩa
												là bạn đồng ý với
												<a
													href="#"
													className="text-primary hover:underline"
												>
													{' '}
													điều khoản và điều kiện{' '}
												</a>
												, và
												<a
													href="#"
													className="text-primary hover:underline"
												>
													{' '}
													chính sách quyền riêng tư{' '}
												</a>
												của chúng tôi
											</span>
										</label>
									</div>
									<div className="mb-6">
										<button
											onClick={handleSignup}
											className="flex w-full items-center justify-center rounded-md bg-primary py-4 px-9 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp"
										>
											{!isProcess ? (
												'Đăng ký'
											) : (
												<i
													className="bx bx-loader bx-spin bx-rotate-90"
													style={{ color: '#000' }}
												></i>
											)}
										</button>
									</div>
								</form>
								<p className="text-center text-base font-medium text-body-color">
									Bạn đã có một tài khoản?{' '}
									<Link
										href="/signin"
										className="text-primary hover:underline"
									>
										Đăng nhập
									</Link>
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className="absolute left-0 top-0 z-[-1]">
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
								<stop stopColor="#157bfb" />
								<stop
									offset="1"
									stopColor="#157bfb"
									stopOpacity="0"
								/>
							</linearGradient>
							<linearGradient
								id="paint1_linear_95:1005"
								x1="160.5"
								y1="220"
								x2="1099.45"
								y2="1192.04"
								gradientUnits="userSpaceOnUse"
							>
								<stop stopColor="#157bfb" />
								<stop
									offset="1"
									stopColor="#157bfb"
									stopOpacity="0"
								/>
							</linearGradient>
						</defs>
					</svg>
				</div>
			</section>
		</>
	);
};

export default SignupPage;
