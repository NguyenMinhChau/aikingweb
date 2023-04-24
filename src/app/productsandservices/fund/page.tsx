import React from 'react';
import { Breadcrumb } from '../../../../components';
import routers from '../../../../routers/routers';
import ServicesLinkItem from './home/servicesLinkItem';

function FundPage() {
	return (
		<>
			<Breadcrumb pageName="Quỹ" description="Quỹ" />
			<div className="container mb-5">
				<div className="w-full">
					<h1 className="font-bold mb-3">Các dịch vụ</h1>
					<div className="flex flex-wrap">
						<ServicesLinkItem
							href={routers.fundInterestRateTable}
							nameIcon="bx bxs-bank text-xl"
							title="Quỹ tham khảo"
						/>
						<ServicesLinkItem
							href={routers.fundSend}
							nameIcon="bx bx-donate-heart"
							title="Gửi quỹ"
						/>
						<ServicesLinkItem
							href={routers.fundManager}
							nameIcon="fa-solid fa-users"
							title="Quản lý quỹ"
						/>
					</div>
				</div>
			</div>
		</>
	);
}

export default FundPage;
