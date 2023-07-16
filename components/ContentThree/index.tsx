'use client';
import { styled } from '@mui/material';
import CounterUp from '../CounterUp';

type ContentThreeContainerStyledType = {
	theme?: any;
	cols?: any;
	spacing?: string;
};
type ContentThreeType = {
	data?: any;
	cols?: number;
	spacing?: string;
};

const ContentThreeContainerStyled = styled('div')(
	({ theme, cols, spacing }: ContentThreeContainerStyledType) => ({
		display: 'flex',
		flexWrap: 'wrap',
		alignItems: 'center',
		justifyContent: 'flex-start',
		gap: '8px',
		width: '100%',
		height: '100%',
		'& .content_three_item': {
			flex: `1 1 calc((100% / ${cols}) - (${spacing} * 2))`,
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			height: '300px',
		},
	}),
);

export default function ContentThree({
	data = [],
	cols = 3,
	spacing = '8px',
}: ContentThreeType) {
	return (
		<>
			<ContentThreeContainerStyled cols={cols} spacing={spacing}>
				{data.map((item: any, index: any) => {
					return (
						<div
							className="content_three_item flex-col"
							key={index}
						>
							<div className="font-bold h-[30%] text-center select-none flex gap-1 items-center justify-center text-white text-[20px] break-words">
								<CounterUp
									start={item?.start}
									end={item?.end}
									type={item?.text}
								/>
							</div>
							<div
								key={index}
								className="drop-shadow-md h-[70%] rounded-xl bg-no-repeat bg-center aspect-square w-full"
								style={{
									backgroundImage: `url('${item?.urlImage}')`,
									backgroundSize: '100% 100%',
								}}
							></div>
						</div>
					);
				})}
			</ContentThreeContainerStyled>
		</>
	);
}
