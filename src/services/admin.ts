import axios from 'axios';
import { setData } from '@/appState/reducer';

// ADMIN
export const adminInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_URL_SERVER}admin/`,
  withCredentials: true,
});
export const adminGet = async (path: string, options = {}) => {
  const res = await adminInstance.get(path, options);
  return res.data;
};
export const adminPost = async (path: string, options = {}) => {
  const res = await adminInstance.post(path, options);
  return res.data;
};
export const adminPut = async (path: string, options = {}) => {
  const res = await adminInstance.put(path, options);
  return res.data;
};
export const adminDelete = async (path: string, options = {}) => {
  const res = await adminInstance.delete(path, options);
  return res.data;
};

// GET USER BY ID
export const adminGetUserByIdSV = async (props: any) => {
  const { id_user, dispatch, setSnackbar } = props;
  let resGet = null;
  try {
    resGet = await adminGet(`user/${id_user}`, {});
    if (resGet.status === 200) {
      dispatch(
        setData({
          userById: resGet?.data,
        })
      );
    }
  } catch (e) {
    setSnackbar({
      open: true,
      type: 'error',
      message: resGet?.message || 'Lấy thông tin thất bại',
    });
  }
};
