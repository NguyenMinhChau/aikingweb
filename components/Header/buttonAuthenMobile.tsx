'use client';
import { useState } from 'react';
import Link from 'next/link';
import routers from '../../routers/routers';
import { useRouter } from 'next/navigation';
import { useAppContext } from '../../helpers';
import { authLogoutSV } from '../../services/authen';

const ButtonAuthenMobile = () => {
	const { state, dispatch } = useAppContext();
	const { currentUser } = state.set;
	const router = useRouter();
	const [snackbar, setSnackbar] = useState({
		open: false,
		type: '',
		message: '',
	});
	const handleLogout = (e: any) => {
		e.preventDefault();
		authLogoutSV({
			email_user: currentUser?.email,
			router,
			setSnackbar,
			dispatch,
		});
	};
	return (
		<button
			title="button_authen_mobile"
			className="bg-gray-2 lg:hidden md:hidden dark:bg-dark-bg flex h-9 cursor-pointer items-center justify-center rounded-full text-black dark:text-white md:h-14 md:w-14 mr-2"
		>
			{!currentUser ? (
				<>
					<Link href={routers.signin} className="mx-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 512 512"
							className="h-5 w-5 stroke-current dark:hidden md:h-6 md:w-6"
						>
							<path d="M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z" />
						</svg>
					</Link>
					<Link href={routers.singup} className="mx-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 512 512"
							className="h-5 w-5 stroke-current dark:hidden md:h-6 md:w-6"
						>
							<path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM160 152V264v96c0 13.3 10.7 24 24 24s24-10.7 24-24V288h60.9l37.2 81.9c5.5 12.1 19.7 17.4 31.8 11.9s17.4-19.7 11.9-31.8L315.7 275c21.8-14.3 36.3-39 36.3-67c0-44.2-35.8-80-80-80H184c-13.3 0-24 10.7-24 24zm48 88V176h64c17.7 0 32 14.3 32 32s-14.3 32-32 32H208z" />
						</svg>
					</Link>
				</>
			) : (
				<div className="mx-2" onClick={handleLogout}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 512 512"
						className="h-5 w-5 stroke-current dark:hidden md:h-6 md:w-6"
					>
						<path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
					</svg>
				</div>
			)}
		</button>
	);
};

export default ButtonAuthenMobile;
