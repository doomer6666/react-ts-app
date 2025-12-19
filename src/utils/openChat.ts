import type { NavigateFunction } from 'react-router-dom';
import api from '../api/axiosInstance';
import { getChats } from '../api/getChats';
import type { IChat } from '../features/feed/ModalUser';

type OpenChatProps = (
  name: string,
  navigate: NavigateFunction,
  authorId: number,
) => Promise<void>;

const moveToChat: OpenChatProps = async (name, navigate, authorId) => {
  try {
    const chats: IChat[] = await getChats();
    const authorName = localStorage.getItem('name');

    if (!authorName) {
      return;
    }

    const existChat = chats.find(
      (chat) =>
        chat.chatMembers.length === 2 &&
        chat.chatMembers.some((members) => members.username === authorName) &&
        chat.chatMembers.some((members) => members.username === name),
    );

    if (existChat) {
      navigate('/message', { state: { chatId: existChat.id } });
    } else {
      const { data } = await api.post<{ id: number }>('/chats/private', {
        userId: authorId,
      });

      navigate('/message', { state: { chatId: data.id } });
    }
  } catch (error) {
    console.log(error);
  }
};

export default moveToChat;
