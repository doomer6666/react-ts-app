import useSWR from 'swr';
import ChatItem from './ChatItem';
import { fetcher } from '../../../api/fetcher';
import type IChatItem from '../../../types/chat/IChatItem';

const ChatList = () => {
  const { data, error, isLoading } = useSWR<IChatItem[]>('/chats/', fetcher, {
    revalidateOnFocus: true,
    shouldRetryOnError: false,
  });

  if (!data || error) {
    return;
  }
  const chatList: IChatItem[] = data;

  return (
    <div className="chat-list-container">
      <div className="chat-list-header">
        <div className="chat-list-title">ЧАТЫ</div>
        <div className="chat-search">
          <span className="chat-search-icon">🔍</span>
          <input type="text" placeholder="Поиск" />
        </div>
      </div>
      {isLoading && <div>Загрузка...</div>}
      <div className="chat-list">
        {chatList.map((item) => (
          <ChatItem
            key={item.id}
            id={item.id}
            name={item.name}
            preview={item.preview}
            chatTime={item.chatTime}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatList;
