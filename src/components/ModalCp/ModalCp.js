/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import {ActivityIndicator} from 'react-native';
import React from 'react';
import styles from './ModalCpCss';
import {Button, Modal} from 'native-base';
import stylesStatus from '../../styles/Status';
import stylesGeneral from '../../styles/General';
import InputItem from '../InputItem/InputItem';

const ModalCp = ({
  titleModal,
  stateModal,
  setModal,
  onPress,
  isProcessModal,
  btnText,
  children,
}) => {
  return (
    <Modal isOpen={stateModal} onClose={() => setModal(false)}>
      <Modal.Content maxWidth={'90%'} minWidth={'90%'}>
        <Modal.CloseButton />
        <Modal.Header>{titleModal}</Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button
              // variant="ghost"
              style={[stylesStatus.cancelbgcbold]}
              onPress={() => {
                setModal(false);
              }}>
              Quay lại
            </Button>
            <Button
              style={[
                stylesStatus.primarybgcbold,
                isProcessModal && stylesGeneral.op6,
              ]}
              disabled={isProcessModal}
              onPress={onPress}>
              {isProcessModal ? <ActivityIndicator color="white" /> : btnText}
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default ModalCp;
