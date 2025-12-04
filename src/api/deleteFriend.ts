import api from './axiosInstance';

const deleteFriend = async (authorId: number) => {
  await api.delete(`friend/${authorId}`);
};

export default deleteFriend;
