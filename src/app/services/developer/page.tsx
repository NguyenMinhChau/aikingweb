import { Breadcrumb, ContentOne } from '../../../../components';
import Image01 from '../../../../public/images/developer/image_01.png';

const DeveloperPage = () => {
	return (
		<>
			<Breadcrumb pageName="Lập trình" description="Lập trình" />
			<div className="container">
				<div className="my-3">
					<ContentOne
						title={`<b><span class='text-primary'>AIKING</span> chuyên nhận...</b>`}
						desc={[
							`- Gia công phần mềm quản lý, website và thiết kế các ứng dụng theo yêu cầu của khách hàng gồm:`,
							`+ Thiết kế website.`,
							`+ Viết ứng dụng trên điện thoại.`,
							`+ Viết phần mềm theo yêu cầu khách hàng nhanh chóng, hiệu quả, uy tín.`,
						]}
						urlImage={Image01?.src}
					/>
				</div>
			</div>
		</>
	);
};

export default DeveloperPage;
