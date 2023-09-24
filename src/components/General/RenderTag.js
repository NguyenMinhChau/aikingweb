import React from 'react';
import {View, Text} from 'react-native';
import tw from '../../styles/twrnc.global';
import {EMPTY_CHAR} from '../../helpers/_empty';

const MAP_COLOR = [
  {
    list: [
      'trễ hạn',
      'dropped',
      'down',
      'offline',
      '',
      'inactive',
      'quá hạn',
      'not ok',
      'reject',
      'critical',
      'false',
      'no',
      'tre han',
      'fail',
      'failed',
      'error',
      'không',
      'canceled',
      'not using',
      'close',
      'rejected',
      'chưa đánh giá',
      'chưa có điện',
      'off',
      'expired',
      'rejected',
      'check service nok',
    ],
    color: '#f34b4b',
  },
  {
    list: [
      'pending',
      'chưa rõ',
      'chưa có',
      'opening',
      'warning',
      'waiting',
      'cannot check',
      'chưa đánh giá',
      'running',
      'đang diễn ra,',
    ],
    color: '#f39c12',
  },
  {
    list: ['in-progress', 'processing', 'in progress', 'using'],
    color: '#f1c40f',
  },
  {
    list: ['processing', 'cúp điện', 'inf-btht', 'plan', 'approvedcheckin'],
    color: '#1e90ff',
  },
  {
    list: ['đứt cáp', 'inf-ktht', 'admin', 'user'],
    color: '#3742fa',
  },
  {
    list: [
      'có',
      'completed',
      'đúng hạn',
      'closed',
      'up',
      'online',
      'true',
      'active',
      'ok',
      'approve',
      'finished',
      'yes',
      'normal',
      'true',
      'dung han',
      'success',
      'done',
      'đã đánh giá',
      'đã hoàn tất',
      'đã có điện',
      'on',
      'confirmed',
      'config ok',
      'check service ok',
    ],
    color: '#43a047',
  },
  {
    list: ['executing'],
    color: '#8e44ad',
  },
];

const RANDOM_COLOR = [
  '#f34b4b',
  '#f39c12',
  '#3498db',
  '#5375e5',
  '#43a047',
  '#1abc9c',
  '#e84393',
  '#40739e',
  '#B53471',
  '#8e44ad',
  // 'expired',
];

export default function RenderTagCP({
  tag,
  randomColor = false,
  outline = false,
  styleContainer,
  styleText,
}) {
  const bgColor = outline
    ? 'transparent'
    : !randomColor
    ? MAP_COLOR.find(item => {
        return item.list.includes(tag?.toLowerCase());
      })?.color
    : RANDOM_COLOR[Math.floor(Math.random() * RANDOM_COLOR.length)];
  const borderColor = outline
    ? !randomColor
      ? MAP_COLOR.find(item => {
          return item.list.includes(tag?.toLowerCase());
        })?.color
      : RANDOM_COLOR[Math.floor(Math.random() * RANDOM_COLOR.length)]
    : '#a4b0be';
  const textColor = outline
    ? !randomColor
      ? MAP_COLOR.find(item => {
          return item.list.includes(tag?.toLowerCase());
        })?.color
      : RANDOM_COLOR[Math.floor(Math.random() * RANDOM_COLOR.length)]
    : !tag
    ? '#000'
    : '#fff';

  return (
    <View
      style={tw.style('rounded-md py-1 px-2 border', {
        backgroundColor: bgColor,
        borderColor: borderColor,
        ...styleContainer,
      })}>
      <Text
        style={tw.style('font-bold text-[12px]', {
          color: textColor,
          ...styleText,
        })}>
        {tag || EMPTY_CHAR}
      </Text>
    </View>
  );
}
