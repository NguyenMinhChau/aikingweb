import React from 'react';
import {View, Text, Image} from 'react-native';
import {Iconify} from 'react-native-iconify';
import {List} from 'react-native-paper';
import tw from '../../../styles/twrnc.global';
import {EMPTY_CHAR} from '../../../helpers/_empty';
import {onCopyToClipboard} from '../../../utils/copy.clipboard';
import {fList} from '../../../utils/array.utils';

export default function RowDialogCP({
  header,
  label,
  subLabel,
  value,
  ValueCP,
  valueList = [],
  colorVal,
  icon,
  colorIcon = '#57cf7f',
  leftIcon,
  rightIcon,
  noneBorderBottom,
  styleLabel,
  styleSubLabel,
  styleVal,
  styleHeader,
  styleRow,
  styleLeftIcon,
  styleRightIcon,
  noBullet = false,
  onCopy = false,
  dataAccord = [], // {title: '', value: {label: '', value: '', code: ''}}} || {label: '', value: '', code: ''}
  onClickAccord,
  showAccord = false,
}) {
  return (
    <>
      {header && (
        <View style={tw.style('bg-gray-100 p-1 mt-3', {...styleHeader})}>
          <Text style={tw`font-bold text-black`}>{header}</Text>
        </View>
      )}
      <View
        onTouchStart={onClickAccord ? onClickAccord : () => {}}
        style={tw.style(
          'justify-between flex-row items-center gap-2 px-1 py-2 border-b-[2px] border-gray-200 border-dotted',
          noneBorderBottom && 'border-b-0',
          {...styleRow},
        )}>
        <View style={tw`items-center flex-row`}>
          <View
            style={tw.style('mr-1', leftIcon && 'w-[25px] h-[25px]', {
              ...styleLeftIcon,
            })}>
            {leftIcon ? (
              <Image
                source={leftIcon}
                resizeMode="contain"
                style={tw`w-full h-full`}
              />
            ) : (
              <>{!noBullet && <Text>-</Text>}</>
            )}
          </View>
          <View>
            <Text style={tw.style('font-normal text-black', {...styleLabel})}>
              {label}
            </Text>
            {subLabel && (
              <Text
                style={tw.style('text-black text-[12px] font-bold', {
                  ...styleSubLabel,
                })}>
                {subLabel}
              </Text>
            )}
          </View>
        </View>
        {ValueCP ? (
          <ValueCP />
        ) : (
          <View style={tw`items-center justify-end flex-row flex-grow w-1`}>
            <Text
              style={tw.style(
                'font-bold text-black w-full text-right',
                colorVal && `text-[${colorVal}]`,
                {...styleVal},
              )}>
              {icon ? (
                <Iconify
                  icon="lucide:check-circle"
                  width={20}
                  height={20}
                  color={colorIcon}
                />
              ) : rightIcon ? (
                <View
                  style={tw.style('mr-1', rightIcon && 'w-[30px] h-[30px]', {
                    ...styleRightIcon,
                  })}>
                  <Image
                    source={rightIcon}
                    resizeMode="contain"
                    style={tw`w-full h-full`}
                  />
                </View>
              ) : valueList.length > 0 ? (
                <View style={tw`flex-col items-end gap-1`}>
                  {valueList.map((val, _idx) => (
                    <Text
                      key={_idx}
                      style={tw.style(
                        'font-bold text-black w-full text-right',
                        colorVal && `text-[${colorVal}]`,
                        {...styleVal},
                      )}>
                      {val}
                    </Text>
                  ))}
                </View>
              ) : (
                <Text
                  onPress={onCopy ? () => onCopyToClipboard(value) : () => {}}>
                  {onCopy && (
                    <Iconify icon="tabler:copy" size={18} color="#000" />
                  )}
                  <Text
                    style={tw.style(
                      'text-[13px] leading-5 text-black font-bold',
                      {...styleVal},
                      colorVal && `text-[${colorVal}]`,
                    )}>
                    {value || value === 0 ? value : EMPTY_CHAR}
                  </Text>
                </Text>
              )}
            </Text>
          </View>
        )}
      </View>
      {onClickAccord && showAccord && (
        <List.AccordionGroup>
          {dataAccord.map(({label, value}, index) => {
            return (
              <List.Accordion
                key={index}
                style={tw.style('bg-white pr-[12px]')}
                titleStyle={tw.style(`text-[15px] text-black`)}
                theme={{colors: {primary: '#4169e1'}}}
                title={label}
                right={() => {
                  return (
                    <>
                      {Array.isArray(value) ? (
                        <Iconify
                          icon="eva:arrow-down-fill"
                          size={15}
                          color="#000"
                        />
                      ) : null}
                    </>
                  );
                }}
                rippleColor="transparent"
                id={label}>
                {Array.isArray(value)
                  ? fList(value)?.map(({label, code}, __idx) => {
                      return (
                        <List.Item
                          key={__idx}
                          style={tw.style('py-1 px-0')}
                          titleStyle={tw.style('text-[13px] text-black')}
                          title={`${label} - Code: ${code}`}
                        />
                      );
                    })
                  : null}
              </List.Accordion>
            );
          })}
        </List.AccordionGroup>
      )}
    </>
  );
}
