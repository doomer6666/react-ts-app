import api from './axiosInstance';

export const getProfile = async (id: number) => {
  const profileData = await api.get(`profile/${id}`);
  return profileData.data;
};
