const DataManagerFundAgricultureHeader = () => {
	return {
		headers: {
			name: process.env.NEXT_PUBLIC_MANAGER_FUND_AGRICULTURE_HEADER,
			index: {
				title: 'STT',
			},
			h1: {
				title: 'Mã HD',
			},
			h2: {
				title: 'Kỳ hạn',
			},
			h3: {
				title: 'Số tiền gửi',
			},
			h4: {
				title: 'Tiền giải ngân',
			},
			h5: {
				title: 'Trạng thái',
			},
		},
	};
};

export default DataManagerFundAgricultureHeader;
