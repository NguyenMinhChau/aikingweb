import Link from 'next/link';
import React from 'react';
type ServicesLinkItemType = {
	href?: string;
	nameIcon: string;
	title: string;
	onClick?: () => void;
};
function ServicesLinkItem({
	href,
	nameIcon,
	title,
	onClick,
}: ServicesLinkItemType) {
	const Cp = ({ children }: { children: React.ReactNode }) => {
		if (href) {
			return (
				<Link
					href={href}
					className="flex flex-col items-center w-1/4 sm:w-1/6 lg:w-1/12 mr-2"
				>
					{children}
				</Link>
			);
		} else {
			return (
				<div
					onClick={onClick}
					className="flex flex-col items-center w-1/4 sm:w-1/6 lg:w-1/12 mr-2 cursor-pointer"
				>
					{children}
				</div>
			);
		}
	};
	return (
		<Cp>
			<div className="flex flex-1 items-center justify-center w-full p-2 rounded-md bg-primary">
				<i className={`${nameIcon} text-white text-2xl`}></i>
			</div>
			<div className="text-xs text-center min-w-max uppercase font-bold mt-2">
				{title}
			</div>
		</Cp>
	);
}

export default ServicesLinkItem;
