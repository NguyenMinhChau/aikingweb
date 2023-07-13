'use client';
import { useEffect } from 'react';
import { Inter } from 'next/font/google';
import LogoLightSquare from '../../public/images/logo/logo_light_square.png';
import { ContentOne, ContentTwo, Hero } from '../../components';
const MessengerCustomerChat = require('react-messenger-customer-chat');

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
	return (
		<>
			{/* <MessengerCustomerChat
				pageId="104145032476041"
				appId="468033418602915"
			/> */}
			<Hero />
			<div className="m-3">
				<ContentOne
					title={`<b>Giới thiệu chung về <span class='text-primary'>Aiking Investment</span></b>`}
					desc={[
						`- Công Ty <b>TNHH MTV Đầu Tư Và Công Nghệ Aiking</b> được cấp phép hoạt động bởi Sở Kế Hoạch Đầu Tư Thành Phố Hồ Chí Minh ngày 07/07/2020.`,
						`- <b>Tên giao dịch:</b> Công ty TNHH MTV Đầu tư và Công nghệ Aiking.`,
						`- <b>Mã số thuế:</b> <i>0316370529</i>. `,
					]}
					urlImage={LogoLightSquare?.src}
				/>
				<div
					data-aos="fade-right"
					className="text-[30px] text-center text-dark font-bold uppercase"
				>
					Các lĩnh vực hoạt động chủ lực của công ty
				</div>
				<div className="flex items-center justify-center mt-3">
					<div className="w-[15vw] h-[3px] bg-primary"></div>
				</div>
				<ContentTwo
					title={`<b><span class='text-primary'>1. Dịch vụ Công nghệ thông tin</span.></b>`}
					desc={[
						`- Chuyên sản xuất phần mềm, thiết lập hệ thống, website, xây dựng công cụ tự động trên website. Các sản phẩm nổi bật của công ty:`,
						`• Phần mềm chấm công trong Nhân Sự.`,
						`• Lập trình Website.`,
						`• Lập trình App.`,
						`• Lập trình phần mềm theo yêu cầu của khách hàng ...`,
					]}
					urlImage={LogoLightSquare?.src}
				/>
				<ContentOne
					title={`<b><span class='text-primary'>2. Dịch vụ tư vấn đầu tư và Kinh Doanh Hàng Hóa</span></b>`}
					desc={[
						`- Tư vấn cho khách hàng các kênh đầu tư có nguồn thu nhập thụ động hiệu quả.`,
						`- Kinh doanh những sản phẩm trong lĩnh vực làm đẹp và sức khỏe. Phụ kiện ngành Nail: Đá trang trí móng, sticker, charm và các phụ kiện khác...`,
					]}
					urlImage={LogoLightSquare?.src}
				/>
				<div className="text-[30px] text-center text-dark font-bold uppercase">
					Sứ mệnh, tầm nhìn và giá trị cốt lõi
				</div>
				<div className="flex items-center justify-center mt-3">
					<div className="w-[15vw] h-[3px] bg-primary"></div>
				</div>
				<ContentTwo
					title={`<b><span class='text-primary'>Sứ mệnh và tầm nhìn</span.></b>`}
					desc={[
						`- <b>Sứ mệnh:</b> <span class='text-primary font-bold'>Aiking Investment</span> cam kết không ngừng nâng cao, chất lượng
						sản phẩm, dịch vụ để mang đến lợi ích tốt nhất cho khách hàng`,
						`- <b>Tầm nhìn:</b> Trở thành biểu tượng uy tín hàng đầu Việt Nam về cung cấp
						sản phẩm, dịch vụ trong lĩnh vực Công Nghệ, Thương Mại Dịch Vụ, Tư
						Vấn Tài Chính.`,
					]}
					urlImage={LogoLightSquare?.src}
				/>
				<ContentOne
					title={`<b><span class='text-primary'>Giá trị cốt lõi</span></b>`}
					desc={[
						`- <b>Uy tín:</b> Luôn đặt chữ tín lên hàng đầu không ngừng hoàn thiện để đáp
						ứng đúng và cao hơn những cam kết.`,
						`- <b>Trách nhiệm:</b> <span class='text-primary font-bold'>Aiking Investment</span> luôn đặt trách nhiệm lên hàng đầu với
						khách hàng, đối tác và toàn thể nhân viên.`,
						`- <b>Đoàn kết:</b> <span class='text-primary font-bold'>Aiking Investment</span> xây dựng một tập thể gắn kết mọi thành
						viên và hướng đến lợi ích chung của công ty.`,
						`- <b>Chia sẻ:</b> Tại đây mọi người sẵn sàng chia sẻ những kiến thức, kỹ năng,
						kinh nghiệm cho nhau. Cùng nhau học hỏi những điều mới, những trải
						nghiệm mới để ngày càng phát triển hơn.`,
						`- <b>Con người:</b> <span class='text-primary font-bold'>Aiking Investment</span> xem nhân viên là nguồn tài sản quý giá
						của công ty. Các bạn được đào tạo những nghiệp vụ, kỹ năng để phát triển bản thân. Luôn tạo cho các bạn môi trường làm việc năng động, chuyên nghiệp để các bạn phát triển tối đa tiềm năng của bản thân.`,
					]}
					urlImage={LogoLightSquare?.src}
				/>
			</div>
		</>
	);
}
