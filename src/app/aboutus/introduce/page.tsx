import { Breadcrumb, SkeletonCP } from '../../../components';

const IntroducePage = () => {
	return (
		<>
			<Breadcrumb pageName="Giới thiệu" description="Giới thiệu" />
			<div className="container">
				<div className="my-3">
					<SkeletonCP />
				</div>
			</div>
		</>
	);
};

export default IntroducePage;
