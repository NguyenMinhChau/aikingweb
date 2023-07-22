'use client';
import LogoLightSquare from '../../../public/images/logo/logo_light_square.png';
import ServiceIT from '../../../public/images/introduce/service_it.png';
import Introduce from '../../../public/images/introduce/introduce.png';
import Investment from '../../../public/images/introduce/investment.png';
import Sumenh from '../../../public/images/introduce/su_menh.png';
import { Breadcrumb, ContentOne, ContentTwo } from '../../../components';

const AboutUsPage = () => {
	return (
		<>
			<Breadcrumb pageName="Giới thiệu" description="Giới thiệu" />
			<div className="container">
				<div className="my-3">
					<ContentOne
						title={`<b>Giới thiệu chung về <span class='text-primary'>Aiking Investment</span></b>`}
						desc={[
							`- Công Ty <b>TNHH MTV Đầu Tư Và Công Nghệ Aiking</b> được cấp phép hoạt động bởi Sở Kế Hoạch Đầu Tư Thành Phố Hồ Chí Minh ngày 07/07/2020.`,
							`- <b>Tên giao dịch:</b> Công ty TNHH MTV Đầu tư và Công nghệ Aiking.`,
							`- <b>Mã số thuế:</b> <i>0316370529</i>. `,
						]}
						urlImage={Introduce?.src}
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
						urlImage={ServiceIT?.src}
					/>
					<ContentOne
						title={`<b><span class='text-primary'>2. Dịch vụ tư vấn đầu tư</span></b>`}
						desc={[
							`<b>AIKING ĐI CÙNG NHÀ ĐẦU TƯ!</b>`,
							`- Đội ngũ chuyên gia tài chính hơn 10 năm kinh nghiệm trong việc quản lý nguồn tiền sẽ giúp cho các nhà đầu tư:`,
							`+ Có kênh đầu tư an toàn, tối ưu lợi nhuận.`,
							`+ Có thêm nguồn thu nhập thụ động trong ngắn hạn và gia tăng tài sản trong dài hạn. `,
							`- Đội ngũ chăm sóc khách hàng tận tình, chu đáo hỗ trợ khách hàng 24/7.`,
							`<b>ĐẦU TƯ CHO CUỘC SỐNG AN NHÀN! TẠI SAO KHÔNG?</b>`,
							`- Aiking tư vấn các sản phẩm giúp cho nhà đầu tư thảnh thơi tận hưởng cuộc sống trọn vẹn.`,
							`- Tư vấn Ủy thác đầu tư: `,
							`+ Tiết kiệm`,
							`+ Vàng`,
							`+ Đô la, ngoại hối`,
							`<span class="text-primary font-bold">AIKING INVESTMENT</span> với dịch vụ tư vấn đầu tư tận tình và chu đáo sẽ không làm các nhà đầu tư thất vọng.`,
						]}
						urlImage={Investment?.src}
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
						Vấn Đầu Tư.`,
						]}
						urlImage={Sumenh?.src}
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
			</div>
		</>
	);
};

export default AboutUsPage;
