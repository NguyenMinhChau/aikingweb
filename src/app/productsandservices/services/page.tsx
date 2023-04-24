import { Breadcrumb, SkeletonCP } from '../../../../components';

const ServicesPage = () => {
	return (
		<>
			<Breadcrumb
				pageName="Dịch vụ phần mềm"
				description="Dịch vụ phần mềm"
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
