import type IUser from '../types/IUser';
import api from './axiosInstance';

export const getProfile = async (id: number) => {
  const { data } = await api.get<IUser>(`profile/${id}`);
  return data;
};

export const getSipmleProfile = async (id: number) => {
  const { data } = await api.get<IUser>(`profile/${id}`);
  return { id: data?.userId, name: data.name };
};
