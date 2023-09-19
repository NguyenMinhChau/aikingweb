import React from 'react';
import {View, Text} from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import tw from '../../styles/twrnc.global';
import {dd_mm_yy_hh_mm_ss_sub7} from '../../utils/TimerFormat';
import {fList} from '../../utils/array.utils';
import {EMPTY_CHAR} from '../../helpers/_empty';
import {Iconify} from 'react-native-iconify';
import SkeletonRow from './SkeletonRow';

export default function StepperVerticalCP({
  currentStrokeWidth = 3,
  separatorStrokeWidth = 3,
  currentStepIndicatorSize = 35,
  stepIndicatorSize = 35,
  currentPage,
  data = [],
  itemCurrent,
  colorSuccess = '#43a047',
  colorCircle = '#43a047',
  iconSuccess,
  labelsContentCustom,
  sectionLeftContentCustom,
}) {
  const stepIndicatorStyles = {
    stepIndicatorSize: stepIndicatorSize,
    currentStepIndicatorSize: currentStepIndicatorSize,
    separatorStrokeWidth: separatorStrokeWidth,
    currentStepStrokeWidth: currentStrokeWidth,
    stepStrokeCurrentColor: colorCircle, // current border color
    separatorFinishedColor: colorSuccess, // line finish color
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: colorSuccess,
    stepIndicatorUnFinishedColor: '#aaaaaa',
    stepIndicatorCurrentColor: colorCircle, // background current color
    stepIndicatorLabelFontSize: 15,
    currentStepIndicatorLabelFontSize: 15,
    stepIndicatorLabelCurrentColor: itemCurrent?.status ? '#ffffff' : '#000000', // color text current
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,0.5)',
    labelColor: '#666666',
    labelSize: 15,
    currentStepLabelColor: colorSuccess,
    labelAlign: 'flex-start',
  };
  return (
    <>
      {sectionLeftContentCustom ? (
        <View style={tw` flex-col items-center h-full justify-around`}>
          {sectionLeftContentCustom}
        </View>
      ) : (
        <View style={tw` flex-col items-center h-full justify-around mr-2`}>
          {fList(data).map((item, _idx) => {
            if (_idx <= currentPage) {
              return (
                <View
                  style={tw.style('flex-col items-start gap-1 w-[130px]')}
                  key={_idx}>
                  {item?.status && (
                    <View
                      style={tw.style('items-center justify-center w-full')}>
                      <Text
                        style={tw.style(
                          'font-bold text-[12px] text-black text-center',
                          {
                            color: item?.status ? item?.colorStatus : '#000',
                          },
                        )}>
                        {item?.status}
                      </Text>
                    </View>
                  )}
                  {fList(item?.checkServiceHuawei)?.length > 0 ? (
                    <View style={tw`w-full`}>
                      {item?.checkServiceHuawei.map((check, __idx) => {
                        const colorCheck =
                          check?.status === 'NOT OK' ? '#f34a4a' : '#4b6ef3';
                        return (
                          <View style={tw`flex-col gap-1`}>
                            <View style={tw`flex-row items-start gap-1`}>
                              <Iconify
                                icon="mdi:list-status"
                                size={17}
                                color={colorCheck}
                              />
                              <Text
                                style={tw.style(
                                  'font-medium text-[12px] text-black',
                                  {
                                    color: colorCheck,
                                  },
                                )}>
                                {check?.message}
                              </Text>
                            </View>
                            <View style={tw`flex-row items-start gap-1`}>
                              <Iconify
                                icon="ri:time-line"
                                size={17}
                                color={colorCheck}
                              />
                              <Text
                                style={tw.style(
                                  'font-medium text-[12px] text-black',
                                  {
                                    color: colorCheck,
                                  },
                                )}>
                                {dd_mm_yy_hh_mm_ss_sub7(check?.timestamp)}
                              </Text>
                            </View>
                            <View style={tw`flex-row items-start gap-1`}>
                              <Iconify
                                icon="mdi:user-outline"
                                size={17}
                                color={colorCheck}
                              />
                              <Text
                                style={tw.style(
                                  'font-medium text-[12px] text-black',
                                  {
                                    color: colorCheck,
                                  },
                                )}>
                                {check?.email}
                              </Text>
                            </View>
                          </View>
                        );
                      })}
                    </View>
                  ) : (
                    <>
                      {item?.date && (
                        <View style={tw`flex-row items-start gap-1`}>
                          <Iconify
                            icon="ri:time-line"
                            size={17}
                            color={item?.status ? item?.colorStatus : '#4b6ef3'}
                          />
                          <Text
                            style={tw.style(
                              'font-medium text-[12px] text-black',
                              {
                                color: item?.status
                                  ? item?.colorStatus
                                  : '#4b6ef3',
                              },
                            )}>
                            {dd_mm_yy_hh_mm_ss_sub7(item?.date)}
                          </Text>
                        </View>
                      )}
                      {item?.taskMaker && (
                        <View style={tw`flex-row items-start gap-1`}>
                          <Iconify
                            icon="mdi:user-outline"
                            size={18}
                            color={item?.status ? item?.colorStatus : '#4b6ef3'}
                          />
                          <Text
                            style={tw.style(
                              'font-medium text-[12px] text-black',
                              {
                                color: item?.status
                                  ? item?.colorStatus
                                  : '#4b6ef3',
                              },
                            )}>
                            {item?.taskMaker}
                          </Text>
                        </View>
                      )}
                    </>
                  )}
                </View>
              );
            } else {
              return (
                <View
                  style={tw.style('flex-col items-center gap-1')}
                  key={_idx}>
                  <Text></Text>
                  <Text></Text>
                </View>
              );
            }
          })}
        </View>
      )}
      <View style={tw`px-[20px] flex-1`}>
        <StepIndicator
          customStyles={stepIndicatorStyles}
          stepCount={fList(data).length}
          direction="vertical"
          currentPosition={currentPage}
          renderStepIndicator={({position, stepStatus}) => {
            // console.log('position: ', position);
            // console.log('currentPage: ', currentPage);
            // console.log('itemCurrent: ', itemCurrent);
            if (position < currentPage && !itemCurrent?.status) {
              return (
                <View
                  style={tw.style(
                    'w-full h-full items-center justify-center rounded-full bg-green-600',
                  )}>
                  <Text>{iconSuccess}</Text>
                </View>
              );
            } else {
              return (
                <View
                  style={tw.style(
                    'w-full h-full items-center justify-center rounded-full',
                  )}>
                  <Text style={tw`text-white font-bold`}>{position + 1}</Text>
                </View>
              );
            }
          }}
          labels={
            labelsContentCustom
              ? labelsContentCustom
              : fList(data).map((item, _idx) => {
                  const isCheckIndex = _idx > currentPage;
                  return (
                    <View style={tw`w-full`} key={_idx}>
                      <View
                        style={tw.style(
                          'flex-col items-start gap-1 ml-2',
                          _idx === 0 && 'mt-[20px]',
                          _idx === data.length - 1 && 'mb-[10px]',
                        )}>
                        <Text
                          style={tw.style('font-bold', {
                            color: isCheckIndex
                              ? '#9ca3af'
                              : item?.colorTitle && item?.active
                              ? item?.colorTitle
                              : '#000',
                          })}>
                          {item?.title}
                        </Text>
                        <View style={tw`flex-col gap-1`}>
                          {fList(item?.body).map((val, __idx) => {
                            return (
                              <Text
                                key={__idx}
                                style={tw.style('text-[12px]  font-medium', {
                                  color: isCheckIndex
                                    ? '#9ca3af'
                                    : val.color && val.active
                                    ? val.color
                                    : '#000',
                                })}>
                                {val?.label}
                                {val?.label ? ': ' : ' '}
                                <Text
                                  style={tw.style({
                                    color: isCheckIndex
                                      ? '#9ca3af'
                                      : val.color && val.active
                                      ? val.color
                                      : '#000',
                                  })}>
                                  {isCheckIndex
                                    ? '***'
                                    : val?.value || val?.value === 0
                                    ? val?.value
                                    : EMPTY_CHAR}
                                </Text>
                              </Text>
                            );
                          })}
                        </View>
                      </View>
                    </View>
                  );
                })
          }
        />
      </View>
    </>
  );
}
