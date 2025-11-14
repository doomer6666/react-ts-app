import { useContext, type FC } from 'react';
import getTimeAgo from '../../../utils/getTimeAgo';
import type IChatItem from '../../../types/chat/IChatItem';
import { ChatContext } from '../../../pages/Chat';

const ChatItem: FC<IChatItem> = ({
  id,
  name,
  preview,
  chatTime,
  chatBadge,
}) => {
  const timeAgo = getTimeAgo(chatTime);

  const activeChatContext = useContext(ChatContext);
  const setActiveChat = (id: string) => {
    activeChatContext?.setActiveChat(id);
  };
  return (
    <div
      className={`chat-item ${activeChatContext?.activeChat === id ? 'active' : ''}`}
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
