import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import tw from '../../styles/twrnc.global';

export default function ModalCP({open, close, title, children}) {
  return (
    <>
      <Modal
        visible={open}
        animationType="slide"
        transparent={true}
        onRequestClose={close}>
        <TouchableWithoutFeedback onPress={close}>
          <View style={tw`flex-1 justify-end`}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View
                style={tw`bg-white p-[10px] rounded-tl-[50px] rounded-tr-[50px] shadow-2xl max-h-[90%]`}>
                <ScrollView
                  contentContainerStyle={tw.style('flex-grow')}
                  showsVerticalScrollIndicator={false}>
                  <View style={tw`items-center`}>
                    <View
                      style={tw`bg-gray-300 w-[50px] h-[5px] rounded-full mb-2`}
                      onTouchStart={close}></View>
                    {title && (
                      <Text style={tw`text-black font-bold text-[20px] mb-2`}>
                        {title}
                      </Text>
                    )}
                  </View>
                  {children}
                </ScrollView>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
}
