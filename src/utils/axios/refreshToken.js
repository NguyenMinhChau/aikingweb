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
        const res = await refreshToken(`refreshToken/${currentUser?.id}`);
        if (res.code === 0) {
          const refreshUser = {
            ...currentUser,
            token: res.data.toString(),
          };
          await setAsyncStore(refreshUser);
          dispatch(
            setCurrentUserPL({
              currentUser: getAsyncStore(dispatch),
            }),
          );
          currentUser.token = `${res.data}`;
          handleFunc(refreshUser, id ? id : '');
          return refreshUser;
        } else {
          toastShow(toast, 'RefreshToken not found- Please login again');
        }
      } else {
        handleFunc(currentUser, id ? id : '');
        return currentUser;
      }
    }
  } catch (err) {
    console.log(err);
  }
};
export default requestRefreshToken;
