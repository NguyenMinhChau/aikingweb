'use client';
import { Inter } from 'next/font/google';
import { Hero, SkeletonCP } from '../components';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
	return (
		<>
			<Hero />
			<div className="m-3">
				<SkeletonCP />
			</div>
		</>
	);
}
