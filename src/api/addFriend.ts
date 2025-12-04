import api from './axiosInstance';

const addFriend = async (authorId: number) => {
  await api.post('/friend', {
    friendId: authorId,
  });
};

export default addFriend;
