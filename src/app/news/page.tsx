'use client';
import Link from 'next/link';
import { Breadcrumb, SkeletonCP } from '../../../components';

const NewsPage = () => {
	return (
		<>
			<Breadcrumb pageName="Tin tức" description="Tin tức" />
			<div className="container">
				<div className="my-3">
					<SkeletonCP />
				</div>
			</div>
		</>
	);
};

export default NewsPage;
