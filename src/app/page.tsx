'use client';
import { Inter } from 'next/font/google';
const MessengerCustomerChat = require('react-messenger-customer-chat');
import { Hero, SkeletonCP } from '../../components';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
	return (
		<>
			<MessengerCustomerChat
				pageId="104145032476041"
				appId="468033418602915"
			/>
			<Hero />
			<div className="m-3">
				<SkeletonCP />
			</div>
		</>
	);
}
