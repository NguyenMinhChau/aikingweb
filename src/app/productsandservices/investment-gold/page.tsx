import { Breadcrumb, SkeletonCP } from '../../../../components';

const WebPage = () => {
	return (
		<>
			<Breadcrumb
				pageName="Ủy thác đầu tư vàng"
				description="Ủy thác đầu tư vàng"
			/>
			<div className="container">
				<div className="my-3">
					<SkeletonCP />
				</div>
			</div>
		</>
	);
};

export default WebPage;
