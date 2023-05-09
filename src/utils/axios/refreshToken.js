/* eslint-disable prettier/prettier */
import jwt_decode from 'jwt-decode';
import {refreshToken} from '../../utils/axios/axiosInstance';
import {getAsyncStore, setAsyncStore} from '../localStore/localStore';
import {toastShow} from '../toast';

const requestRefreshToken = async (
  currentUser,
  handleFunc,
  state,
  dispatch,
  setCurrentUserPL,
  toast,
  id,
) => {
  try {
    const accessToken = currentUser?.token;
    if (accessToken) {
      const decodedToken = await jwt_decode(accessToken);
      const date = new Date();
      if (decodedToken.exp < date.getTime() / 1000) {
        const res = await refreshToken(`refreshToken/${currentUser?.email}`);
        // console.log('Refresh Token: ', res);
        if (res?.status === 200) {
          const refreshUser = {
            ...currentUser,
            token: res?.metadata?.toString(),
          };
          await setAsyncStore(refreshUser);
          dispatch(
            setCurrentUserPL({
              currentUser: getAsyncStore(dispatch),
            }),
          );
          currentUser.token = `${res?.metadata}`;
          handleFunc(refreshUser, id ? id : '');
          return refreshUser;
        } else {
          toastShow(
            toast,
            'Refresh token không tìm thấy - Vui lòng đăng nhập lại!',
          );
        }
      } else {
        handleFunc(currentUser, id ? id : '');
        return currentUser;
      }
    }
  } catch (err) {
    console.log(err);

    toastShow(
      toast,
      `Lỗi: ${err?.response?.data?.message || 'Không tìm thấy url'}.`,
      'error',
    );
  }
};
export default requestRefreshToken;
