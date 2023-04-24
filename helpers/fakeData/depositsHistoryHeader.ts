const DataDepositsHistory = () => {
	return {
		headers: {
			name: process.env.NEXT_PUBLIC_DEPOSITS_HISTORY,
			index: {
				title: 'STT',
			},
			h1: {
				title: 'Số tiền nạp',
			},
			h2: {
				title: 'Ngày nạp',
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

export default DataDepositsHistory;
