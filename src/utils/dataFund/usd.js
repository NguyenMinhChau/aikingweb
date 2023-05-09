/* eslint-disable prettier/prettier */
import {TYPE_USD} from '@env';
export const DataFundUSD = [
  {
    id: 'usd_1',
    capital: '< 25M',
    timer: {
      desc: 'Khuyên dùng',
      urlImage: require('../../assets/images/background01.png'),
      list: [
        {
          id: 'timer_1',
          period: 1,
          interestRate: 0.7,
          type: TYPE_USD,
        },
        {
          id: 'timer_2',
          period: 3,
          interestRate: 2.42,
          type: TYPE_USD,
        },
        {
          id: 'timer_3',
          period: 6,
          interestRate: 5.52,
          type: TYPE_USD,
        },
        {
          id: 'timer_4',
          period: 9,
          interestRate: 9.37,
          type: TYPE_USD,
        },
        {
          id: 'timer_5',
          period: 12,
          interestRate: 14.03,
          type: TYPE_USD,
        },
        {
          id: 'timer_6',
          period: 18,
          interestRate: 23.95,
          type: TYPE_USD,
        },
      ],
    },
  },
  {
    id: 'usd_2',
    capital: '> 25-200M',
    timer: {
      desc: 'Lợi nhuận tốt nhất',
      urlImage: require('../../assets/images/background02.png'),
      list: [
        {
          id: 'timer_1',
          period: 1,
          interestRate: 0.8,
          type: TYPE_USD,
        },
        {
          id: 'timer_2',
          period: 3,
          interestRate: 2.72,
          type: TYPE_USD,
        },
        {
          id: 'timer_3',
          period: 6,
          interestRate: 6.15,
          type: TYPE_USD,
        },
        {
          id: 'timer_4',
          period: 9,
          interestRate: 10.35,
          type: TYPE_USD,
        },
        {
          id: 'timer_5',
          period: 12,
          interestRate: 15.39,
          type: TYPE_USD,
        },
        {
          id: 'timer_6',
          period: 18,
          interestRate: 26.17,
          type: TYPE_USD,
        },
      ],
    },
  },
  {
    id: 'usd_3',
    capital: '> 200-500M',
    timer: {
      desc: 'Lợi nhuận tốt nhất',
      urlImage: require('../../assets/images/background03.png'),
      list: [
        {
          id: 'timer_1',
          period: 1,
          interestRate: 0.9,
          type: TYPE_USD,
        },
        {
          id: 'timer_2',
          period: 3,
          interestRate: 3.03,
          type: TYPE_USD,
        },
        {
          id: 'timer_3',
          period: 6,
          interestRate: 6.78,
          type: TYPE_USD,
        },
        {
          id: 'timer_4',
          period: 9,
          interestRate: 11.33,
          type: TYPE_USD,
        },
        {
          id: 'timer_5',
          period: 12,
          interestRate: 16.77,
          type: TYPE_USD,
        },
        {
          id: 'timer_6',
          period: 18,
          interestRate: 28.43,
          type: TYPE_USD,
        },
      ],
    },
  },
];
