import type IUser from '../types/IUser';
import api from './axiosInstance';

interface SipmleIUser {
  name: string;
  id: number;
  avatarUrl?: string;
}

export const getProfile = async (id: number) => {
  const { data } = await api.get<IUser>(`profile/${id}`);
  return data;
};

export const getSipmleProfile = async (
  id: number
): Promise<SipmleIUser | null> => {
  const { data } = await api.get<IUser>(`profile/${id}`);

  if (!data?.userId) return null;

  return {
    id: data.userId,
    name: data.name,
    avatarUrl: data.avatarUrl,
  };
};