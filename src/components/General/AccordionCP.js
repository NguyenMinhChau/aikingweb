import React from 'react';
import {TouchableOpacity, View, Text, Image} from 'react-native';
import {Iconify} from 'react-native-iconify';
import tw from '../../styles/twrnc.global';
import {useLayoutAnimation} from '../../utils/LayoutAnimation';

export default function AccordionCP({
  open,
  toggleDropDown,
  dataList,
  openSub2,
  toggleDropDownSub2,

  title,
  onClickItem,
  onRedirect,
  sourceImage,
  sourceIcon,
  colorDots = '#2b5de1',
}) {
  return (
    <>
      <RenderItemMenu
        open={open}
        toggleDropDown={toggleDropDown}
        dataList={dataList}
        openSub2={openSub2}
        toggleDropDownSub2={toggleDropDownSub2}
        title={title}
        onClickItem={onClickItem}
        onRedirect={onRedirect}
        sourceImage={sourceImage}
        sourceIcon={sourceIcon}
        colorDots={colorDots}
      />
    </>
  );
}

export const RenderItemMenu = ({
  open,
  toggleDropDown,
  dataList,
  openSub2,
  toggleDropDownSub2,

  title,
  onClickItem,
  onRedirect,
  sourceImage,
  sourceIcon,
  colorDots = '#2b5de1',
}) => {
  const {LayoutAnimationConfig} = useLayoutAnimation();
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={tw`py-2 m-2 p-2 border-b-2 border-b-gray-200 relative`}
      onPress={() => {
        dataList.length === 0 && !onRedirect
          ? {}
          : dataList.length > 0
          ? toggleDropDown()
          : onRedirect
          ? onRedirect()
          : onClickItem();
        LayoutAnimationConfig();
      }}>
      <View style={tw`flex-row justify-between items-center`}>
        <View style={tw`flex-row items-center justify-start`}>
          {sourceImage && <Image source={sourceImage} style={tw`mr-1`} />}
          {sourceIcon && sourceIcon}
          <Text style={tw`text-[16px] pl-2 font-bold text-black`}>{title}</Text>
        </View>
        {dataList.length > 0 && (
          <Image
            source={require('../../assets/images/icons/arrow_right.png')}
          />
        )}
      </View>
      {open && dataList.length > 0 && (
        <>
          <View style={tw`border-[0.5px] border-gray-300 w-full m-2`}></View>
          <View style={tw`flex-col gap-2`}>
            {dataList.map((item, index) =>
              item?.subMenuLev2 ? (
                <RenderItemMenu
                  key={index}
                  toggleDropDown={toggleDropDownSub2}
                  open={openSub2}
                  title={item?.label}
                  dataList={item?.subMenuLev2}
                  onClickItem={onClickItem}
                  onRedirect={onRedirect}
                  sourceImage={item?.image}
                  sourceIcon={item?.icon}
                  colorDots={colorDots}
                />
              ) : (
                <RenderSubFinal
                  key={index}
                  item={item}
                  onRedirect={onRedirect}
                  onClickItem={onClickItem}
                  colorDots={colorDots}
                />
              ),
            )}
          </View>
        </>
      )}
    </TouchableOpacity>
  );
};

export const RenderSubFinal = ({item, onRedirect, onClickItem, colorDots}) => {
  return (
    <TouchableOpacity
      style={tw`flex-row items-center`}
      onPress={
        item?.disabled
          ? () => {}
          : onRedirect
          ? () => onRedirect(item)
          : () => onClickItem(item.value)
      }
      disabled={item?.disabled || false}>
      <Iconify
        icon="ph:dot-duotone"
        size={40}
        color={item?.disabled ? '#ccc' : colorDots}
      />
      <Text
        style={tw.style(
          'text-[16px] ml-1 text-black flex-grow w-1',
          item?.disabled && 'text-gray-400',
        )}>
        {item?.label}
      </Text>
    </TouchableOpacity>
  );
};
