import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';

import useSWR from 'swr';
import { fetcher } from '../../../api/fetcher';
import type { IChatMessage } from '../../../types/chat/IChatMessage';
import { useChat } from '../../../context/ChatContext';

const ChatArea = () => {
  const chatContext = useChat();

  const { data, error, isLoading } = useSWR<IChatMessage[]>(
    `/chats/${chatContext.activeChat}/messages`,
    fetcher,
    {
      revalidateOnFocus: true,
      shouldRetryOnError: false,
    },
  );

  if (!data || error) {
    return;
  }
  const messages: IChatMessage[] = data;
  const sender: string =
    messages.find((item) => item.direction === 'recieved')?.name || '';

  return (
    <div className="chat-area">
      {chatContext?.activeChat ? (
        <>
          {isLoading && <div>Загрузка...</div>}
          <ChatHeader name={sender} />

          <div className="chat-messages">
            {/* <div className="message-date">Сегодня</div> */}
            {messages.map((item) => (
              <ChatMessage
                direction={item.direction}
                name={item.name}
                message={item.message}
                time={item.time}
              />
            ))}
          </div>
          <ChatInput />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ChatArea;
