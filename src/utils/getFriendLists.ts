import api from '../api/axiosInstance';

export interface Friend {
  friend_id: number;
  id: number;
  status: string;
  user_id: number;
}
const getFriendLists = async (authorId: number, userId: number) => {
  try {
    const authorFriends: Friend[] = await (
      await api.get(`friend/${authorId}`)
    ).data.filter((friend: Friend) => friend.friend_id === userId);

    const authorSubscribers: Friend[] = await (
      await api.get(`friend/subscribers/${authorId}`)
    ).data.filter(
      (subscriber: Friend) =>
        subscriber.friend_id === authorId && subscriber.user_id === userId,
    );

    const userSubscribers: Friend[] = await (
      await api.get(`friend/subscribers/${userId}`)
    ).data.filter((subscriber: Friend) => subscriber.user_id == authorId);

    return [authorFriends, authorSubscribers, userSubscribers];
  } catch (e) {
    console.error(e);
    return [[], [], []];
  }
};

export default getFriendLists;
