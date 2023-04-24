const DataWithdrawsHistory = () => {
	return {
		headers: {
			name: process.env.NEXT_PUBLIC_WITHDRAWS_HISTORY,
			index: {
				title: 'STT',
			},
			h1: {
				title: 'Số tiền rút',
			},
			h2: {
				title: 'Ngày rút',
			},
			h3: {
				title: 'Ngân hàng',
			},
			h4: {
				title: 'Người tạo',
			},
			h5: {
				title: 'Trạng thái',
			},
		},
	};
};

export default DataWithdrawsHistory;
