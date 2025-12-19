import useSWR from 'swr';
import ChatItem from './ChatItem';
import { fetcher } from '../../../api/fetcher';
import type IChatItem from '../../../types/chat/IChatItem';
import { useMemo, useState } from 'react';

const ChatList = () => {
  const { data, error, isLoading, mutate } = useSWR<IChatItem[]>(
    '/chats/',
    fetcher,
    {
      revalidateOnFocus: true,
      shouldRetryOnError: false,
    },
  );
  const [filterInput, setFilterInput] = useState('');
  const filteredChatList = useMemo(() => {
    return data?.filter((item) =>
      item.name.toLowerCase().includes(filterInput.toLowerCase().trim()),
    );
  }, [data, filterInput]);

  if (!data || error) {
    return;
  }

  return (
    <div className="chat-list-container">
      <div className="chat-list-header">
        <div className="chat-list-title">ЧАТЫ</div>
        <div className="chat-search">
          <span className="chat-search-icon">🔍</span>
          <input
            type="text"
            placeholder="Поиск"
            value={filterInput}
            onChange={(e) => setFilterInput(e.target.value)}
          />
        </div>
      </div>
      {isLoading && <div>Загрузка...</div>}
      <div className="chat-list">
        {filteredChatList?.map((item) => (
          <ChatItem
            mutate={mutate}
            key={item.id}
            id={item.id}
            name={item.name}
            preview={item.preview}
            chatBadge={item.chatBadge}
            chatTime={item.chatTime}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatList;
