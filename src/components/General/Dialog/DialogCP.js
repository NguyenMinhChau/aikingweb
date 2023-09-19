import React from 'react';
import {Dialog, Portal} from 'react-native-paper';
import tw from '../../../styles/twrnc.global';
import {Text, TouchableOpacity, View} from 'react-native';
import {Iconify} from 'react-native-iconify';

export default function DialogCP({
  visible,
  setVisible,
  children,
  title,
  styleDialog,
}) {
  return (
    <Portal>
      <Dialog
        style={tw.style(
          'p-0 mx-[5%] my-[12%] bg-white rounded-xl overflow-hidden',
          {
            ...styleDialog,
          },
        )}
        visible={visible}
        onDismiss={() => setVisible(false)}>
        <Dialog.Content style={tw`p-0 m-0`}>
          {title && (
            <View
              style={tw`w-full flex flex-row gap-2 items-start justify-between`}>
              <Text
                style={tw`font-bold text-[18px] text-black ml-4 mt-3 leading-6`}>
                {title}
              </Text>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => setVisible(false)}>
                <Iconify
                  style={tw`text-right mt-3 mr-4`}
                  icon="material-symbols:close"
                  size={30}
                  color="#ccc"
                />
              </TouchableOpacity>
            </View>
          )}
          <>{children}</>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
}
