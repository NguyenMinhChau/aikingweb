'use client';
import Link from 'next/link';
import { Breadcrumb } from '../../../components';

const ContactPage = () => {
	return (
		<>
			<Breadcrumb pageName="Liên hệ" description="Liên hệ" />
			<div className="container">
				<div className="my-3">
					<div className="text-center italic font-bold text-[20px] mb-4">
						Liên hệ với chúng tôi thông qua
					</div>
					<div className="flex flex-col gap-2">
						<div className="flex gap-2 items-center">
							<div className="font-bold italic text-[18px] uppercase">
								Hotline:
							</div>
							<Link
								className="text text-primary"
								href="tel:0345335422"
							>
								0345.355.422
							</Link>
						</div>
						<div className="flex gap-2 items-center">
							<div className="font-bold italic text-[18px] uppercase">
								e-Mail:
							</div>
							<Link
								className="text text-primary"
								href="mailto:aikinginvesmentgroup@gmail.com"
							>
								aikinginvesmentgroup@gmail.com
							</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ContactPage;
