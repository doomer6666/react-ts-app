import { useEffect, useState } from 'react';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';

import useSWR from 'swr';
import { fetcher } from '../../../api/fetcher';
import type { IChatMessage } from '../../../types/chat/IChatMessage';
import { useChat } from '../../../context/ChatContext';
import ChatEmptyArea from './ChatEmptyArea';
import api from '../../../api/axiosInstance';
import { handleMessage } from '../../../api/ws';

interface IChat {
  id: number;
  name: string;
  preview: string;
  chatTime: Date;
  chatBadge?: string;
  chatMembers: string[];
}

const ChatArea = () => {
  const chatContext = useChat();
  const [chatName, setChatName] = useState<string>('чат');
  const [chatId, setChatId] = useState<number>(0);
  const [chatBadge, setChatBadge] = useState<string>('');
  useEffect(() => {
    const fetchChatName = async () => {
      if (chatContext.activeChat) {
        try {
          const response = await api.get<IChat>(
            `/chats/${chatContext.activeChat}`,
          );
          setChatName(response.data.name);
          setChatId(response.data.id);
          if (response.data.chatBadge) setChatBadge(response.data.chatBadge);
        } catch (error) {
          console.error('Failed to fetch chat name:', error);
        }
      }
    };

    fetchChatName();
  }, [chatContext.activeChat]);

  const { data, error, isLoading, mutate } = useSWR<IChatMessage[]>(
    `/chats/${chatContext.activeChat}/messages`,
    fetcher,
    {
      revalidateOnFocus: true,
      shouldRetryOnError: false,
    },
  );

  useEffect(() => {
    if (!chatContext.activeChat) return;

    const unsubscribe = handleMessage((msg) => {
      if (
        msg.type === 'message' &&
        msg.payload?.chatId === chatContext.activeChat
      ) {
        const newMsg: IChatMessage = msg.payload.message;
        try {
          mutate(
            (current) => (current ? [...current, newMsg] : [newMsg]),
            false,
          );
        } catch (err) {
          console.warn('[ws] Failed', err);
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, [chatContext.activeChat, mutate]);

  if (!data || error) {
    return <ChatEmptyArea />;
  }

  const messages: IChatMessage[] = data;

  return (
    <div className="chat-area">
      {chatContext.activeChat !== null && (
        <>
          {isLoading && <div>Загрузка...</div>}
          <ChatHeader name={chatName} chatId={chatId} chatBadge={chatBadge} />

          <div className="chat-messages">
            {/* <div className="message-date">Сегодня</div> */}
            {messages.map((item) => (
              <ChatMessage
                key={`${item.direction}-${item.time}`}
                direction={item.direction}
                name={item.name}
                message={item.message}
                time={item.time}
                imageUrl={item.imageUrl}
                avatarUrl={item.avatarUrl}
              />
            ))}
          </div>
          <ChatInput />
        </>
      )}
    </div>
  );
};

export default ChatArea;
