import { type FC } from 'react';
import getTimeAgo from '../../../utils/getTimeAgo';
import type IChatItem from '../../../types/chat/IChatItem';
import { useChat } from '../../../context/ChatContext';

const ChatItem: FC<IChatItem> = ({
  id,
  name,
  preview,
  chatTime,
  chatBadge,
}) => {
  const timeAgo = getTimeAgo(chatTime);

  const activeChatContext = useChat();
  const setActiveChat = (id: number) => {
    activeChatContext?.setActiveChat(id);
  };
  return (
    <div
      className={`chat-item ${activeChatContext.activeChat === id ? 'active' : ''}`}
      onClick={() => setActiveChat(id)}
    >
      <div className="chat-avatar">{name[0]}</div>
      <div className="chat-info">
        <div className="chat-name">{name}</div>
        <div className="chat-preview">{preview}</div>
      </div>
      <div className="chat-meta">
        <div className="chat-time">{timeAgo}</div>
        {chatBadge && <div className="chat-badge">{chatBadge}</div>}
      </div>
    </div>
  );
};

export default ChatItem;
