'use client';
import Link from 'next/link';
import { Breadcrumb } from '../../../components';

const RecruitmentPage = () => {
	return (
		<>
			<Breadcrumb pageName="Tuyển dụng" description="Tuyển dụng" />
			<div className="container">
				<div className="my-3">
					<div className="text-[18px] text-justify leading-9">
						Xuất phát từ lĩnh vực công nghệ, Aiking Investment vô
						cùng tự hào khi các dịch vụ và sản phẩm luôn nhận được
						sự hài lòng và phản hồi tích cực từ khách hàng. Đầu năm
						2023, Aiking đặt chân vào lĩnh vực nhân sự, cụ thể với
						dịch vụ tuyển dụng thuê ngoài VINJOB. Đóng vai trò là
						cầu nối giữa nguồn lao động đa dạng (khối backoffice,
						khối mass, lao động phổ thông,…) và các đối tác có nhu
						cầu tuyển dụng. Tại đây, Aiking mong muốn phát triển{' '}
						<b>VINJOB</b> trở thành nơi lý tưởng để khách hàng có
						thể đặt niềm tin hợp tác để giải quyết vấn đề về nguồn
						nhân lực của doanh nghiệp. Tìm hiểu Vinjob:{' '}
						<Link
							className="font-bold text-primary italic"
							href="https://vinjob.com.vn/"
							target="_blank"
						>
							https://vinjob.com.vn/
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default RecruitmentPage;
