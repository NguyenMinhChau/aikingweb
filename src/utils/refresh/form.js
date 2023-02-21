/* eslint-disable prettier/prettier */
import {useAppContext} from '../';
import {setFormValuePL} from '../../app/payloads/form';

export const useRefreshForm = () => {
  const {dispatch} = useAppContext();
  dispatch(
    setFormValuePL({
      email: '',
      username: '',
      password: '',
      phone: '',
      oldPwd: '',
      confirmPwd: '',
      otpCode: '',
    }),
  );
};
