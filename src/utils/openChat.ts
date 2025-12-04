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

    const existChat = chats.filter(
      (chat) =>
        chat.chatMembers.includes(authorName) &&
        chat.chatMembers.includes(name),
    )[0];

    if (existChat) {
      navigate('/message', { state: { chatId: existChat.id } });
    } else {
      const response: {
        userId: number;
      } = await api.post('/chats/private', {
        userId: authorId,
      });
      navigate('/message', { state: { chatId: response.userId } });
    }
  } catch (error) {
    console.log(error);
  }
};

export default moveToChat;
