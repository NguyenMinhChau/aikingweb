import React from 'react';
import {View, Text, Image, TouchableOpacity, FlatList} from 'react-native';
import tw from '../../../styles/twrnc.global';
import {EMPTY_CHAR} from '../../../helpers/_empty';
import {onCopyToClipboard} from '../../../utils/copy.clipboard';
import {IconCP} from '../../../utils/icon.utils';
import {BLACK_COLOR} from '../../../styles/colors.global';

export default function RowDialogCP({
  header,
  label,
  subLabel,
  SubLabelCustom,
  value,
  ValueCP,
  valueList = [],
  colorVal = BLACK_COLOR,
  icon,
  colorIcon = '#57cf7f',
  leftImage,
  leftNameIcon,
  rightImage,
  rightNameIcon,
  noneBorderBottom,
  styleLabel,
  styleSubLabel,
  styleVal,
  styleHeader,
  styleRow,
  styleLeftImage,
  styleLeftIcon,
  styleRightImage,
  styleRightIcon,
  noBullet = false,
  onCopy = false,
  dataAccord = [], // {title: '', value: {label: '', value: '', code: ''}}} || {label: '', value: '', code: ''}
  onClickAccord,
  showAccord = false,
  typeIcon,
  disabled = false,
  noValue = false,
}) {
  const ViewWrap = onClickAccord ? TouchableOpacity : View;
  return (
    <>
      {header && (
        <View
          style={tw.style('p-1 mt-3 w-full bg-gray-200', {
            ...styleHeader,
          })}>
          <Text style={tw.style(`font-bold text-black`)}>{header}</Text>
        </View>
      )}
      <ViewWrap
        activeOpacity={0.7}
        onTouchStart={onClickAccord ? onClickAccord : () => {}}
        onPress={onClickAccord && !disabled ? onClickAccord : () => {}}
        style={tw.style(
          'justify-between flex-row items-center gap-2 px-1 py-2 border-b-[0.5px] border-solid border-gray-300',
          noneBorderBottom && 'border-b-0',
          disabled && 'opacity-50',
          {
            ...styleRow,
          },
        )}>
        <View style={tw`items-center flex-row`}>
          {leftNameIcon ? (
            <IconCP
              name={leftNameIcon}
              size={23}
              color={BLACK_COLOR}
              style={tw.style(`mr-1`, {...styleLeftIcon})}
              typeIcon={typeIcon}
            />
          ) : (
            <View
              style={tw.style('mr-1', leftImage && 'w-[25px] h-[25px]', {
                ...styleLeftImage,
              })}>
              {leftImage ? (
                <Image
                  source={leftImage}
                  resizeMode="contain"
                  style={tw`w-full h-full`}
                />
              ) : (
                <>
                  {!noBullet && <Text style={tw.style('text-black')}>-</Text>}
                </>
              )}
            </View>
          )}
          <View>
            <Text
              style={tw.style('font-normal text-black', {
                ...styleLabel,
              })}>
              {label}
            </Text>
            {subLabel && (
              <Text
                style={tw.style('text-[12px] font-bold text-black', {
                  ...styleSubLabel,
                })}
                numberOfLines={1}>
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
              style={tw.style('font-bold w-full text-right', {
                color: colorVal,
                ...styleVal,
              })}>
              {icon ? (
                <IconCP
                  name="checkmark-circle-outline"
                  size={25}
                  color={colorIcon}
                />
              ) : rightNameIcon ? (
                <IconCP
                  name={rightNameIcon}
                  size={23}
                  color={BLACK_COLOR}
                  style={tw.style(`ml-1`, {...styleRightIcon})}
                  typeIcon={typeIcon}
                />
              ) : rightImage ? (
                <View
                  style={tw.style('mr-1', rightImage && 'w-[30px] h-[30px]', {
                    ...styleRightImage,
                  })}>
                  <Image
                    source={rightImage}
                    resizeMode="contain"
                    style={tw`w-full h-full`}
                  />
                </View>
              ) : valueList.length > 0 ? (
                <View style={tw`flex-col items-end gap-1`}>
                  {valueList.map((val, _idx) => (
                    <Text
                      key={_idx}
                      style={tw.style('font-bold w-full text-right', {
                        color: colorVal,
                        ...styleVal,
                      })}>
                      {val}
                    </Text>
                  ))}
                </View>
              ) : !noValue ? (
                <Text
                  onPress={onCopy ? () => onCopyToClipboard(value) : () => {}}>
                  {onCopy && (
                    <IconCP name="copy-outline" size={16} color={BLACK_COLOR} />
                  )}
                  <Text
                    style={tw.style('text-[13px] leading-5 font-bold', {
                      color: colorVal,
                      ...styleVal,
                    })}>
                    {value || value === 0 || value === '' || EMPTY_CHAR}
                  </Text>
                </Text>
              ) : null}
            </Text>
          </View>
        )}
      </ViewWrap>
      {SubLabelCustom && <SubLabelCustom />}
      {onClickAccord && showAccord && (
        <View style={tw.style('max-h-[200px]')}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={dataAccord}
            keyExtractor={item => item.label}
            renderItem={({item, index}) => {
              return (
                <Text style={tw.style(' py-2 text-black')}>{item?.label}</Text>
              );
            }}
            contentContainerStyle={tw.style(`p-2 flex-grow bg-white`)}
            nestedScrollEnabled
          />
        </View>
      )}
    </>
  );
}

{
  /* <List.AccordionGroup>
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
                <IconCP
                  name="chevron-down-outline"
                  size={15}
                  color={BLACK_COLOR}
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
                  title={`${label}`}
                />
              );
            })
          : null}
      </List.Accordion>
    );
  })}
</List.AccordionGroup>; */
}
