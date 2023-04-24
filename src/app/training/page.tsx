import { Breadcrumb, SkeletonCP } from '../../../components';

const TrainningPage = () => {
	return (
		<>
			<Breadcrumb pageName="Đào tạo" description="Đào tạo" />
			<div className="container">
				<div className="my-3">
					<SkeletonCP />
				</div>
			</div>
		</>
	);
};

export default TrainningPage;
