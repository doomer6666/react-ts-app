import api from './axiosInstance';

export const getChats = async () => {
  const chats = await api.get('/chats/');
  return chats.data;
};
