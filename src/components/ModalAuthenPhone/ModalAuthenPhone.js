/* eslint-disable prettier/prettier */
import {View, Text, TextInput, ActivityIndicator} from 'react-native';
import React from 'react';
import styles from './ModalAuthenPhoneCss';
import {Button, Modal} from 'native-base';
import stylesStatus from '../../styles/Status';
import stylesGeneral from '../../styles/General';
import InputItem from '../InputItem/InputItem';

const ModalAuthenPhone = ({
  stateModal,
  setModal,
  onPress,
  handleChange,
  valueInput,
  isProcessOTP,
}) => {
  return (
    <Modal isOpen={stateModal} onClose={() => setModal(false)}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>Nhập mã xác thực</Modal.Header>
        <Modal.Body>
          <InputItem
            label="OTP"
            placeholder="Nhập mã OTP"
            nameInput="otpCode"
            value={valueInput}
            handleChange={handleChange}
            // typeInput="number-pad"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button
              variant="ghost"
              colorScheme="blueGray"
              onPress={() => {
                setModal(false);
              }}>
              Thoát
            </Button>
            <Button
              style={[
                stylesStatus.primarybgcbold,
                isProcessOTP && stylesGeneral.op6,
              ]}
              disabled={isProcessOTP}
              onPress={onPress}>
              {isProcessOTP ? <ActivityIndicator color="white" /> : 'Xác thực'}
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default ModalAuthenPhone;
