'use client';
import Image from 'next/image';
import { Breadcrumb } from '../../../../components';
import { styled } from '@mui/material';
import ImageUyThac from '../../../../public/images/interestRate/uythacdautuvang.png';

type ItemStylesContainerType = {
	theme?: any;
	cols?: any;
	spacing?: string;
};

const ItemStylesContainer: any = styled('div')(
	({ theme, cols, spacing }: ItemStylesContainerType) => ({
		display: 'flex',
		flexWrap: 'wrap',
		gap: '16px',
		width: '100%',
		height: '100%',
		margin: '20px 0',
		'& .item_content': {
			// mobile
			[theme.breakpoints.up('xs')]: {
				flex: `1 1 calc((100% / 1) - (${spacing} * 2))`,
			},
			// Tablet
			[theme.breakpoints.between('sm', 'md')]: {
				flex: `1 1 calc((100% / 2) - (${spacing} * 2))`,
			},
			// PC
			[theme.breakpoints.up('lg')]: {
				flex: `1 1 calc((100% / ${cols}) - (${spacing} * 2))`,
			},
			borderRadius: '8px',
			backgroundColor: '#fff',
			border: '1px solid #ccc',
			color: '#000',
			overflow: 'hidden',
			padding: '10px',
		},
	}),
);

const InvestmentGoldPage = () => {
	return (
		<>
			<Breadcrumb
				pageName="Ủy thác đầu tư vàng"
				description="Ủy thác đầu tư vàng"
			/>
			<div className="container">
				<div className="my-3">
					<div className="text-center text-[22px] font-bold text-primary uppercase">
						Lợi ích tích lũy ủy thác vàng cho nhà đầu tư?
					</div>
					<ItemStylesContainer cols={2} spacing="8px">
						<div className="item_content flex items-center justify-start gap-2">
							<div className="text-[16px] w-full text-center font-medium leading-6">
								Lãi suất ủy thác hấp dẫn
							</div>
						</div>
						<div className="item_content flex items-center justify-start gap-2">
							<div className="text-[16px] w-full text-center font-medium leading-6">
								Hợp đồng uy tín
							</div>
						</div>
					</ItemStylesContainer>
					<div className="text-center text-[22px] font-bold text-primary uppercase">
						Bảng lãi suất tham khảo
					</div>
					<div className="w-full h-full mt-5">
						<Image
							src={ImageUyThac?.src}
							alt="Image"
							width={100}
							height={100}
							className="w-full h-full"
							sizes="fill"
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default InvestmentGoldPage;
