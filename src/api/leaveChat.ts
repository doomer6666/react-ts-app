import api from './axiosInstance';

const leaveChat = async (chatId: number) => {
  await api.delete(`chats/${chatId}/leave`);
};

export default leaveChat;
