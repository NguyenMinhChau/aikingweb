import { Breadcrumb, SkeletonCP } from '../../../../components';

const ServicesPage = () => {
	return (
		<>
			<Breadcrumb
				pageName="Dịch vụ tư vấn đầu tư"
				description="Dịch vụ tư vấn đầu tư"
			/>
			<div className="container">
				<div className="my-3">
					<SkeletonCP />
				</div>
			</div>
		</>
	);
};

export default ServicesPage;
