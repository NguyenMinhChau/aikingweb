import React, {useState, useRef, useEffect} from 'react';
import {View, Text, TouchableOpacity, TextInput, FlatList} from 'react-native';
import {Iconify} from 'react-native-iconify';
import tw from '../../styles/twrnc.global';
import {fList} from '../../utils/array.utils';
import useDebounce from '../../utils/hooks/useDebounce';

const CustomSelectCP = ({
  toggleDropDown,
  setToggleDropDown,
  selectList,
  onSelectValue,
  dataList = [],
  placeholder = 'Lựa chọn',
  idSelect = 'Lựa chọn',
  placeholderText = '#000',
  colorIcon = '#b6b6b6',
  multiple = false,
  isCheckAll = false,
  isCheckAllMultiple = false,
  isQuantityInitData = false,
  quantityDataInit = 10,
  NUMBER_SPLICE = 13,
}) => {
  const [searchText, setSearchText] = useState('');
  const [msg, setMsg] = useState('');

  const useSearchText = useDebounce(searchText, 100);

  const filteredData = fList(dataList).filter(item =>
    item.label.toLowerCase().includes(useSearchText.toLowerCase()),
  );

  const dataQuantityInit = fList(dataList).slice(0, quantityDataInit);
  const LENGTH_SELECT_LIST = fList(selectList).length;
  const LENGTH_DATA_LIST = fList(dataList).length;
  const LENGTH_DATA_FILTERED = fList(filteredData).length;
  const LENGTH_DATA_INITIAL = fList(dataQuantityInit).length;

  const DATA_CHOOSE_INIT_AND_FILTER = isQuantityInitData
    ? useSearchText
      ? fList(filteredData)
      : fList(dataQuantityInit)
    : fList(filteredData);
  const LENGTH_DATA_INIT_AND_FILTER = isQuantityInitData
    ? useSearchText
      ? LENGTH_DATA_FILTERED.toLocaleString()
      : LENGTH_DATA_INITIAL.toLocaleString()
    : LENGTH_DATA_FILTERED.toLocaleString();

  const refSearch = useRef(null);
  useEffect(() => {
    if (toggleDropDown) {
      refSearch.current.focus();
    }
  }, [toggleDropDown]);

  useEffect(() => {
    setTimeout(() => {
      if (fList(filteredData).length === 0) {
        setMsg('Không có dữ liệu');
      }
    }, 1000);
  }, [useSearchText]);

  const RenderFlatList = ({item, index}) => {
    return (
      <TouchableOpacity
        key={index}
        activeOpacity={0.8}
        onPress={() => {
          if (multiple) {
            if (fList(selectList).includes(item.value)) {
              onSelectValue(fList(selectList).filter(i => i !== item.value));
            } else {
              onSelectValue([...selectList, item.value]);
            }
          } else {
            onSelectValue(item.value);
            setToggleDropDown(false);
            setSearchText('');
          }
        }}
        style={tw`py-[8px] px-[4px]`}>
        <View style={tw`flex-row items-center`}>
          {multiple && (
            <>
              {fList(selectList).includes(item.value) ? (
                <Iconify
                  icon="ion:checkbox-outline"
                  size={20}
                  color="#007aff"
                />
              ) : (
                <Iconify icon="carbon:checkbox" size={20} color="#ccc" />
              )}
            </>
          )}
          <Text style={tw`ml-[10px] text-black`}>{item.label}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View style={tw`w-full flex-1 min-h-[45px] mb-2`}>
        <View
          style={tw`w-full px-3 pr-[13px] h-full rounded-lg border border-gray-300 justify-between items-center flex-row`}>
          {toggleDropDown && (
            <Iconify icon="ic:baseline-search" size={20} color={colorIcon} />
          )}
          {/* INPUT, TEXT */}
          {!multiple ? (
            <View style={tw`flex-row items-center flex-1`}>
              {selectList && (
                <Text
                  style={tw.style(
                    'text-black mb-[2px]',
                    toggleDropDown && 'ml-2',
                  )}
                  onTouchStart={() => {
                    setToggleDropDown(true);
                  }}>
                  {selectList.toString()}
                </Text>
              )}
              <TextInput
                placeholder={
                  selectList && selectList.length > 0 && selectList[0] !== ''
                    ? ''
                    : toggleDropDown
                    ? 'Tìm kiếm'
                    : placeholder
                }
                placeholderTextColor={placeholderText}
                value={searchText}
                onChangeText={text => {
                  setSearchText(text);
                  setMsg('');
                }}
                style={tw.style('flex-1')}
                onTouchStart={() => {
                  setToggleDropDown(true);
                }}
                ref={refSearch}
              />
            </View>
          ) : toggleDropDown ? (
            <View style={tw`flex-row items-center gap-1 flex-1 mx-2`}>
              <View
                style={tw.style(
                  'flex-row max-h-[200px] overflow-scroll flex-grow gap-2 flex-wrap py-2 w-full',
                  LENGTH_SELECT_LIST === 0 && 'hidden',
                )}>
                {LENGTH_SELECT_LIST > 0 ? (
                  fList(selectList)
                    .slice(0, NUMBER_SPLICE)
                    .map((item, _idx) => {
                      return (
                        <View
                          key={_idx}
                          style={tw.style(
                            'py-[2px] px-2 rounded-lg bg-blue-500 bg-opacity-10 border border-blue-600',
                          )}>
                          <Text style={tw`text-blue-600 text-[12px]`}>
                            {fList(dataList).find(i => i.value === item)?.label}
                          </Text>
                        </View>
                      );
                    })
                ) : (
                  <Text style={tw`text-[${placeholderText}]`}>
                    {placeholder}
                  </Text>
                )}
                {LENGTH_SELECT_LIST > 0 && (
                  <>
                    {LENGTH_SELECT_LIST > NUMBER_SPLICE && (
                      <Text style={tw`text-black mt-[4px]`}>
                        + {LENGTH_SELECT_LIST - NUMBER_SPLICE}
                      </Text>
                    )}
                    <TextInput
                      placeholder={''}
                      onChangeText={text => {
                        setSearchText(text);
                        setMsg('');
                      }}
                      style={tw.style('flex-1 p-0')}
                      onTouchStart={() => {
                        setToggleDropDown(true);
                      }}
                      ref={refSearch}
                    />
                  </>
                )}
              </View>
              {LENGTH_SELECT_LIST === 0 && (
                <TextInput
                  placeholder={'Tìm kiếm'}
                  placeholderTextColor={placeholderText}
                  onChangeText={text => {
                    setSearchText(text);
                    setMsg('');
                  }}
                  style={tw.style('flex-1 p-0')}
                  onTouchStart={() => {
                    setToggleDropDown(true);
                  }}
                  ref={refSearch}
                />
              )}
            </View>
          ) : (
            <View
              style={tw`flex-1 flex-row gap-2 flex-wrap py-2`}
              onTouchStart={() => {
                setToggleDropDown(!toggleDropDown);
              }}>
              {LENGTH_SELECT_LIST > 0 ? (
                <View style={tw`flex-row flex-wrap gap-2 items-center`}>
                  {fList(selectList)
                    .slice(0, NUMBER_SPLICE)
                    .map((item, _idx) => {
                      return (
                        <View
                          key={_idx}
                          style={tw.style(
                            'py-[2px] px-2 rounded-lg bg-blue-500 bg-opacity-10 border border-blue-600',
                          )}>
                          <Text style={tw`text-blue-600 text-[12px]`}>
                            {fList(dataList).find(i => i.value === item)?.label}
                          </Text>
                        </View>
                      );
                    })}
                  {LENGTH_SELECT_LIST > NUMBER_SPLICE && (
                    <Text style={tw`text-black mt-[4px]`}>
                      + {LENGTH_SELECT_LIST - NUMBER_SPLICE}
                    </Text>
                  )}
                </View>
              ) : (
                <Text
                  style={tw`flex-1 text-[${placeholderText}]`}
                  onPress={() => {
                    setToggleDropDown(!toggleDropDown);
                  }}>
                  {placeholder}
                </Text>
              )}
            </View>
          )}
          {/* ICON ARROW, CLOSE */}
          <TouchableOpacity
            style={tw`p-2`}
            activeOpacity={0.8}
            onPress={() => {
              setSearchText('');
              setToggleDropDown(!toggleDropDown);
            }}>
            {toggleDropDown ? (
              <Iconify icon="ic:outline-close" size={20} color={colorIcon} />
            ) : (
              <Iconify
                icon="iconamoon:arrow-down-2-bold"
                size={18}
                color={colorIcon}
                style={tw`font-bold`}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
      {/* DROPDOWN LIST */}
      {(toggleDropDown || searchText) && (
        <View
          style={tw.style(
            'p-1 flex-1 max-h-[200px] rounded-lg bg-white border border-b-[4px] mb-5 border-gray-300 overflow-hidden',
          )}>
          {(useSearchText || isQuantityInitData) &&
          fList(filteredData).length > 0 ? (
            <View style={tw`flex-col gap-2 flex-grow`}>
              {/* SHOW WHEN MULTIPLE */}
              {multiple && isCheckAll ? (
                <View style={tw`flex-row items-center justify-between gap-x-1`}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={tw`flex-row items-center px-[4px] pt-2`}
                    onPress={() => {
                      // CHECK ALL FILTER MULTIPLE
                      if (isCheckAllMultiple) {
                        // KIỂM TRA NẾU TẤT CẢ CÁC ITEM ĐÃ CHECK THÌ BỎ CHECK TẤT CẢ VÀ CẬP NHẬT SELECT LIST
                        if (
                          fList(DATA_CHOOSE_INIT_AND_FILTER).every(i =>
                            selectList.includes(i.value),
                          )
                        ) {
                          onSelectValue([
                            ...fList(selectList).filter(
                              i =>
                                !fList(DATA_CHOOSE_INIT_AND_FILTER)
                                  .map(i => i.value)
                                  .includes(i),
                            ),
                          ]);
                        }
                        // NGƯỢC LẠI THÌ THÊM VÀO SELECT LIST NHƯNG CÓ 2 TRƯỜNG HỢP XẢY RA
                        else {
                          const arrayNotCheckAllFilter = fList(
                            DATA_CHOOSE_INIT_AND_FILTER,
                          ).filter(i => !selectList.includes(i.value));
                          const isNotCheckAllFilter =
                            arrayNotCheckAllFilter.length > 0;
                          // TRƯỜNG HỢP 1: CÁC ITEM FILTER CHƯA CHECK ALL THÌ KHI CHECK SẼ THÊM TẤT CẢ CÁC ITEM FILTER VÀO SELECT LIST
                          if (!isNotCheckAllFilter) {
                            onSelectValue([
                              ...selectList,
                              ...fList(DATA_CHOOSE_INIT_AND_FILTER).map(
                                i => i.value,
                              ),
                            ]);
                          }
                          // TRƯỜNG HỢP 2: CHECK ALL LẠI VÀ THÊM CÁC ITEM CHƯA CHECK ALL VÀO SELECT LIST, NGOẠI TRỪ CÁC ITEM FILTER ĐÃ CHECK
                          else {
                            onSelectValue([
                              ...selectList,
                              ...fList(arrayNotCheckAllFilter).map(
                                i => i.value,
                              ),
                            ]);
                          }
                        }
                      } else {
                        // BỎ CHECK ALL
                        if (
                          fList(DATA_CHOOSE_INIT_AND_FILTER).length ===
                          LENGTH_SELECT_LIST
                        ) {
                          onSelectValue([]);
                        }
                        // CHECK ALL
                        else {
                          onSelectValue(
                            fList(DATA_CHOOSE_INIT_AND_FILTER).map(
                              i => i.value,
                            ),
                          );
                        }
                      }
                    }}>
                    <>
                      {fList(filteredData).length === LENGTH_SELECT_LIST ||
                      LENGTH_DATA_LIST === LENGTH_SELECT_LIST ? (
                        <Iconify
                          icon="ion:checkbox-outline"
                          size={20}
                          color="#007aff"
                        />
                      ) : LENGTH_SELECT_LIST > 0 &&
                        fList(filteredData).some(i =>
                          selectList.includes(i.value),
                        ) ? (
                        <Iconify
                          icon="bx:checkbox-minus"
                          size={20}
                          color="#007aff"
                        />
                      ) : (
                        <Iconify
                          icon="carbon:checkbox"
                          size={20}
                          color="#ccc"
                        />
                      )}
                    </>
                    <Text style={tw`ml-[10px] text-black`}>
                      Chọn tất cả {LENGTH_DATA_INIT_AND_FILTER}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={tw`flex-row items-center px-[4px] pt-2`}
                    onPress={() => {
                      if (LENGTH_DATA_LIST === LENGTH_SELECT_LIST) {
                        onSelectValue([]);
                      } else {
                        onSelectValue(fList(dataList).map(i => i.value));
                      }
                    }}>
                    <Text style={tw`mr-[10px] text-black`}>
                      Chọn tất cả {LENGTH_DATA_LIST.toLocaleString()}
                    </Text>
                    <>
                      {LENGTH_DATA_LIST === LENGTH_SELECT_LIST ? (
                        <Iconify
                          icon="ion:checkbox-outline"
                          size={20}
                          color="#007aff"
                        />
                      ) : LENGTH_SELECT_LIST > 0 ? (
                        <Iconify
                          icon="bx:checkbox-minus"
                          size={20}
                          color="#007aff"
                        />
                      ) : (
                        <Iconify
                          icon="carbon:checkbox"
                          size={20}
                          color="#ccc"
                        />
                      )}
                    </>
                  </TouchableOpacity>
                </View>
              ) : (
                <View
                  style={tw`flex-row px-[10px] pt-[5px] items-center justify-between gap-x-1`}>
                  <Text style={tw`text-gray-400 font-bold`}>
                    Tổng: {LENGTH_DATA_INIT_AND_FILTER}
                  </Text>
                </View>
              )}
              <FlatList
                showsVerticalScrollIndicator={false}
                data={DATA_CHOOSE_INIT_AND_FILTER}
                renderItem={RenderFlatList}
                keyExtractor={item => item.value.toString()}
                contentContainerStyle={tw`flex-grow pb-[40px]`}
                scrollEnabled={true}
                nestedScrollEnabled={true}
              />
            </View>
          ) : !searchText && !msg && !isQuantityInitData ? (
            <View style={tw`items-start`}>
              <Text style={tw`text-black text-[14px] my-2 mx-2`}>
                Vui lòng tìm kiếm để cho ra kết quả
              </Text>
            </View>
          ) : (
            <View style={tw`items-start`}>
              <Text style={tw`text-black text-[14px] my-2 mx-2`}>
                {msg ? msg : 'Đang tìm kiếm kết quả'}
              </Text>
            </View>
          )}
        </View>
      )}
    </>
  );
};

export default CustomSelectCP;
