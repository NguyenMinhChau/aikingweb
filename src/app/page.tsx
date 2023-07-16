'use client';
import { Inter } from 'next/font/google';
import LogoLightSquare from '../../public/images/logo/logo_light_square.png';
import DoiNguCG from '../../public/images/home/doi_ngu_chuyen_gia.png';
import TuVanDT from '../../public/images/home/tu_van_dau_tu.png';
import { ContentThree, Hero } from '../../components';
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
			<div className="container">
				<div className="m-3">
					<div className="text-[18px] text-justify leading-9">
						<b className="text-primary">AIIKING INVETSMENT</b> mang
						đến sự thịnh vượng, thảnh thơi, an nhàn cho quý khách
						hàng, quý đối tác. Chúng tôi không ngừng xây dựng phát
						triển để cho khách hàng trải nghiệm các dịch vụ tốt
						nhất. Tại <b className="text-primary">AIKING</b>, chúng
						tôi có:
					</div>
					<ContentThree
						cols={3}
						spacing="8px"
						data={[
							{
								urlImage: DoiNguCG?.src,
								start: 0,
								end: 20,
								text: 'Đội ngũ chuyên gia',
							},
							{
								urlImage: TuVanDT?.src,
								start: 0,
								end: 100,
								text: 'Tư vấn đầu tư hiệu quả cho khách hàng',
							},
							{
								urlImage: LogoLightSquare?.src,
								start: 0,
								end: 3,
								text: 'Dịch vụ tư vấn đầu tư',
							},
						]}
					/>
				</div>
			</div>
		</>
	);
}
