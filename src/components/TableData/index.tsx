/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React from 'react';
import className from 'classnames/bind';
import PropTypes from 'prop-types';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import styles from './styles.module.css';
import { useAppContext } from '../../helpers';
import { setData } from '../../appState/reducer';

const cx = className.bind(styles);

type TableDataType = {
	data?: any;
	totalData?: any;
	headers?: any;
	search?: string;
	noActions?: boolean;
	children?: React.ReactNode;
	PaginationCus?: boolean;
	startPagiCus?: number;
	endPagiCus?: number;
};

function TableData({
	data = [],
	totalData,
	headers,
	search = '',
	noActions,
	children,
	PaginationCus,
	startPagiCus = 1,
	endPagiCus = 10,
}: TableDataType) {
	const { name, index, h1, h2, h3, h4, h5, h6, h7, h8, h9, h10 } = headers;
	const { state, dispatch } = useAppContext();
	const { show, page } = state.set.pagination;
	const { sort } = state.set;
	const lengthHeader = Object.keys(headers).length;
	const handleChangeLimitPage = (e: any) => {
		dispatch(
			setData({
				pagination: {
					...state.set.pagination,
					show: parseInt(e.target.value),
				},
			}),
		);
	};
	const handleChangePage = (e: any, value: string) => {
		dispatch(
			setData({
				...state.set,
				pagination: {
					...state.set.pagination,
					page: parseInt(value),
				},
			}),
		);
	};
	function Thead({ item }: { item: any }) {
		return (
			<>
				{item && (
					<th className={`${cx(item.iconSort && 'hovered')}`}>
						{item.title}{' '}
						{item.iconSort && (
							<span className={`${cx('icon-sort')}`}>
								{item.iconSort}
							</span>
						)}
					</th>
				)}
			</>
		);
	}
	const start = (page - 1) * show + 1;
	const end = start + data?.length - 1;
	return (
		<>
			<table className={`${cx('table')}`}>
				<thead className={`${cx('thead')}`}>
					<tr>
						<Thead item={index} />
						<Thead item={h1} />
						<Thead item={h2} />
						<Thead item={h3} />
						<Thead item={h4} />
						<Thead item={h5} />
						<Thead item={h6} />
						<Thead item={h7} />
						<Thead item={h8} />
						<Thead item={h9} />
						<Thead item={h10} />
						{!noActions && <th></th>}
					</tr>
				</thead>
				{data?.length > 0 || (search.length > 0 && data?.length > 0) ? (
					<tbody className="tbody">{children}</tbody>
				) : (
					<tbody className="tbody">
						<tr>
							<td
								colSpan={lengthHeader}
								style={{
									textAlign: 'center',
									fontWeight: 'bold',
									fontStyle: 'italic',
									padding: '12px 0',
								}}
							>
								No Data
							</td>
						</tr>
					</tbody>
				)}
			</table>
			{data?.length > 0 && totalData && (
				<>
					<div className={`${cx('pagination-countpage')}`}>
						<Stack
							spacing={2}
							className={`${cx('pagination-container')}`}
						>
							<Pagination
								onChange={(e) => handleChangePage}
								page={page}
								showFirstButton
								showLastButton
								count={
									Math.ceil(
										totalData / (PaginationCus ? 10 : show),
									) || 0
								}
								variant="outlined"
								shape="rounded"
							/>
						</Stack>
					</div>
					<div className={`${cx('countpage-container')}`}>
						{!PaginationCus && (
							<select
								className={`${cx('countpage-select')}`}
								value={show}
								title="..."
								onChange={handleChangeLimitPage}
							>
								<option value="10">10</option>
								<option value="20">20</option>
								<option value="30">30</option>
								<option value="50">50</option>
							</select>
						)}
						<span className={`${cx('countpage-text')}`}>
							items per page |{' '}
							{PaginationCus ? startPagiCus : start} -{' '}
							{PaginationCus
								? totalData < endPagiCus
									? totalData
									: endPagiCus
								: end}{' '}
							of {totalData}
						</span>
					</div>
				</>
			)}
		</>
	);
}

TableData.propTypes = {
	headers: PropTypes.object,
	data: PropTypes.array,
	totalData: PropTypes.number,
	children: PropTypes.node,
	search: PropTypes.string,
};

export default TableData;
