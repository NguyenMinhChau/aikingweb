'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import menuData from './menuData';
import { usePathname, useRouter } from 'next/navigation';
import styles from './Header.module.css';
import LogoLight from '../../public/images/logo/logo_light.png';
import LogoLightSquare from '../../public/images/logo/logo_light_square.png';
import { useAppContext } from '../../helpers';
import { authLogoutSV } from '../../services/authen';
import ButtonAuthenMobile from './buttonAuthenMobile';

const Header = () => {
	const { state, dispatch } = useAppContext();
	const { currentUser } = state.set;
	const router = useRouter();
	// Navbar toggle
	const [navbarOpen, setNavbarOpen] = useState(false);
	const [isProcess, setIsProcess] = useState(false);
	const [snackbar, setSnackbar] = useState({
		open: false,
		type: '',
		message: '',
	});
	const handleCloseSnackbar = (event: any, reason: any) => {
		if (reason === 'clickaway') {
			return;
		}
		setSnackbar({
			...snackbar,
			open: false,
		});
	};
	const navbarToggleHandler = () => {
		setNavbarOpen(!navbarOpen);
	};

	// Sticky Navbar
	const [sticky, setSticky] = useState(false);
	const handleStickyNavbar = () => {
		if (window.scrollY >= 80) {
			setSticky(true);
		} else {
			setSticky(false);
		}
	};
	useEffect(() => {
		window.addEventListener('scroll', handleStickyNavbar);
	});

	// submenu handler
	const [openIndex, setOpenIndex] = useState(-1);
	const [openIndexLevel2, setOpenIndexLevel2] = useState(-2);
	const handleSubmenu = (index: number) => {
		if (openIndex === index) {
			setOpenIndex(-1);
			setOpenIndexLevel2(-2);
		} else {
			setOpenIndex(index);
		}
	};
	const handleSubmenuLevel2 = (index: number) => {
		if (openIndexLevel2 === index) {
			setOpenIndexLevel2(-2);
		} else {
			setOpenIndexLevel2(index);
		}
	};
	const pathname = usePathname();
	const handleLogout = (e: any) => {
		e.preventDefault();
		setIsProcess(true);
		authLogoutSV({
			email_user: currentUser?.email,
			router,
			setSnackbar,
			setIsProcess,
			dispatch,
		});
	};
	return (
		<>
			<header
				className={`header top-0 left-0 z-40 flex w-full items-center bg-transparent ${
					sticky
						? '!fixed !z-[9999] !bg-white !bg-opacity-80 shadow-sticky backdrop-blur-sm !transition dark:!bg-primary dark:!bg-opacity-20'
						: 'absolute'
				}`}
			>
				<div className="container">
					<div className="relative -mx-4 flex items-center justify-between">
						<div className="w-60 max-w-full px-4">
							<Link
								href="/"
								className={`header-logo block w-full ${
									sticky ? 'py-5 lg:py-2' : 'py-8'
								} `}
							>
								<Image
									src={LogoLightSquare}
									alt="logo"
									width={140}
									height={30}
									style={{ minWidth: '120px' }}
									className="w-full dark:hidden"
								/>
								{/* <Image
									src={LogoDark}
									alt="logo"
									width={140}
									height={30}
									className="hidden w-full dark:block"
								/> */}
							</Link>
						</div>
						<div className="flex w-full items-center justify-between px-4">
							<div>
								<button
									onClick={navbarToggleHandler}
									id="navbarToggler"
									aria-label="Mobile Menu"
									className="absolute right-4 top-1/2 block translate-y-[-50%] rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden"
								>
									<span
										className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
											navbarOpen
												? ' top-[7px] rotate-45'
												: ' '
										}`}
									/>
									<span
										className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
											navbarOpen ? 'opacity-0 ' : ' '
										}`}
									/>
									<span
										className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
											navbarOpen
												? ' top-[-8px] -rotate-45'
												: ' '
										}`}
									/>
								</button>
								<nav
									id="navbarCollapse"
									className={`navbar absolute right-0 z-30 bottom-0 left-0 top-[100%] h-[100vh] lg:h-auto rounded border-[.5px] border-body-color/50 py-4 px-6 duration-300 dark:border-body-color/20 bg-white lg:visible lg:static lg:w-auto lg:border-none lg:!bg-transparent lg:p-0 lg:opacity-100 ${
										navbarOpen
											? 'visibility top-full opacity-100'
											: 'invisible top-[120%] opacity-0'
									}`}
								>
									<ul className="block lg:flex lg:space-x-12">
										{menuData.map((menuItem, index) => {
											const listPath =
												pathname.split('/');
											const classed = listPath.includes(
												menuItem.title.toLowerCase(),
											)
												? styles.active
												: '';
											return (
												<li
													key={menuItem.id}
													className="group relative"
												>
													{menuItem.path ? (
														<Link
															href={menuItem.path}
															className={`flex py-2 text-base text-dark group-hover:opacity-70 dark:text-white lg:mr-0 lg:inline-flex lg:py-6 lg:px-0 ${classed}`}
														>
															{menuItem.title}
														</Link>
													) : (
														<>
															<a
																onClick={() =>
																	handleSubmenu(
																		menuItem?.id,
																	)
																}
																key={
																	menuItem.id
																}
																className="flex cursor-pointer items-center justify-between py-2 text-base text-dark group-hover:opacity-70 dark:text-white lg:mr-0 lg:inline-flex lg:py-6 lg:px-0"
															>
																{menuItem.title}
																<span className="pl-3">
																	<svg
																		width="15"
																		height="14"
																		viewBox="0 0 15 14"
																	>
																		<path
																			d="M7.81602 9.97495C7.68477 9.97495 7.57539 9.9312 7.46602 9.8437L2.43477 4.89995C2.23789 4.70308 2.23789 4.39683 2.43477 4.19995C2.63164 4.00308 2.93789 4.00308 3.13477 4.19995L7.81602 8.77183L12.4973 4.1562C12.6941 3.95933 13.0004 3.95933 13.1973 4.1562C13.3941 4.35308 13.3941 4.65933 13.1973 4.8562L8.16601 9.79995C8.05664 9.90933 7.94727 9.97495 7.81602 9.97495Z"
																			fill="currentColor"
																		/>
																	</svg>
																</span>
															</a>
															<div
																className={`submenu relative top-full left-0 rounded-md bg-white transition-[top] duration-300 group-hover:opacity-100 dark:bg-dark lg:invisible lg:absolute lg:top-[110%] lg:block lg:w-[250px] lg:p-4 lg:opacity-0 lg:shadow-lg lg:group-hover:visible lg:group-hover:top-full ${
																	openIndex ===
																	menuItem?.id
																		? 'block'
																		: 'hidden'
																}`}
															>
																{menuItem?.submenu?.map(
																	(
																		submenuItem,
																	) => {
																		return submenuItem?.path ? (
																			<Link
																				href={
																					submenuItem?.path
																				}
																				key={
																					submenuItem.id
																				}
																				className="block rounded py-2.5 text-sm text-dark hover:opacity-70 dark:text-white lg:px-3"
																				onClick={() => {
																					setNavbarOpen(
																						false,
																					);
																				}}
																			>
																				{
																					submenuItem.title
																				}
																			</Link>
																		) : (
																			<>
																				<a
																					onClick={() =>
																						handleSubmenuLevel2(
																							submenuItem?.id,
																						)
																					}
																					onMouseOver={() => {
																						setOpenIndexLevel2(
																							submenuItem?.id,
																						);
																					}}
																					key={
																						submenuItem.id
																					}
																					className={`flex cursor-pointer items-center rounded py-2.5 text-sm text-dark hover:opacity-70 dark:text-white lg:px-3 ${
																						listPath[
																							listPath.length -
																								1
																						] ===
																							submenuItem.title.toLowerCase() &&
																						styles.active
																					}`}
																				>
																					{
																						submenuItem.title
																					}
																					<span className="pl-3">
																						<svg
																							width="15"
																							height="14"
																							viewBox="0 0 15 14"
																						>
																							<path
																								d="M7.81602 9.97495C7.68477 9.97495 7.57539 9.9312 7.46602 9.8437L2.43477 4.89995C2.23789 4.70308 2.23789 4.39683 2.43477 4.19995C2.63164 4.00308 2.93789 4.00308 3.13477 4.19995L7.81602 8.77183L12.4973 4.1562C12.6941 3.95933 13.0004 3.95933 13.1973 4.1562C13.3941 4.35308 13.3941 4.65933 13.1973 4.8562L8.16601 9.79995C8.05664 9.90933 7.94727 9.97495 7.81602 9.97495Z"
																								fill="currentColor"
																							/>
																						</svg>
																					</span>
																				</a>
																				<div
																					className={`submenu relative top-full left-0 rounded-md bg-white transition-[top] duration-300 group-hover:opacity-100 dark:bg-dark lg:invisible lg:absolute lg:top-[110%] lg:block lg:w-[250px] lg:p-4 lg:opacity-0 lg:shadow-lg  lg:group-hover:top-full lg:group-hover:${
																						openIndexLevel2 ===
																						submenuItem?.id
																							? 'visible'
																							: 'hidden'
																					} ${
																						openIndexLevel2 ===
																						submenuItem?.id
																							? 'block'
																							: 'hidden'
																					}`}
																				>
																					{submenuItem?.submenu?.map(
																						(
																							submenuItemLevel2,
																						) => (
																							<Link
																								href={
																									submenuItemLevel2?.path!
																								}
																								key={
																									submenuItemLevel2.id
																								}
																								className="block rounded py-2.5 text-sm text-dark hover:opacity-70 dark:text-white lg:px-3"
																								onClick={() => {
																									setNavbarOpen(
																										false,
																									);
																								}}
																							>
																								{
																									submenuItemLevel2.title
																								}
																							</Link>
																						),
																					)}
																				</div>
																			</>
																		);
																	},
																)}
															</div>
														</>
													)}
												</li>
											);
										})}
									</ul>
								</nav>
							</div>
						</div>
						<div className="flex flex-none items-center justify-end pr-16 lg:pr-0">
							{!currentUser ? (
								<>
									<Link
										href="/signin"
										className="hidden py-3 px-7 text-base font-bold text-dark hover:opacity-70 dark:text-white md:block"
									>
										Đăng nhập
									</Link>
									<Link
										href="/signup"
										className="ease-in-up hidden rounded-md bg-primary py-3 px-8 text-base font-bold text-white transition duration-300 hover:bg-opacity-90 hover:shadow-signUp md:block md:px-9 lg:px-6 xl:px-9 md:mr-3"
									>
										Đăng ký
									</Link>
								</>
							) : (
								<div
									onClick={handleLogout}
									className="ease-in-up hidden rounded-md bg-primary py-3 px-8 text-base font-bold text-white transition duration-300 cursor-pointer hover:bg-opacity-90 hover:shadow-signUp md:block md:px-9 lg:px-6 xl:px-9 md:mr-3"
								>
									{!isProcess ? (
										'Đăng xuất'
									) : (
										<i
											className="bx bx-loader bx-spin bx-rotate-90"
											style={{ color: '#000' }}
										></i>
									)}
								</div>
							)}
							<div>
								<ButtonAuthenMobile />
							</div>
						</div>
					</div>
				</div>
			</header>
		</>
	);
};

export default Header;
