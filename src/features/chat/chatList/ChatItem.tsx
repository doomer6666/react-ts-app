import { useRef, type FC } from 'react';
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
  const optionButtonFer = useRef<HTMLButtonElement>(null);
  const timeAgo = getTimeAgo(chatTime);

  const activeChatContext = useChat();
  const setActiveChat = (id: number) => {
    activeChatContext?.setActiveChat(id);
  };

  // showOptions = () => {};
  return (
    <div
      className={`chat-item ${activeChatContext.activeChat === id ? 'active' : ''}`}
      onClick={() => setActiveChat(id)}
    >
      <div className="chat-avatar">{name[0]}</div>
      <div className="chat-info">
        <div className="chat-name">{name}</div>
        <div className="chat-preview">{`${preview}: ${timeAgo}`}</div>
      </div>

      <div className="chat-meta">
        <button
          ref={optionButtonFer}
          className="chat-option"
          aria-label="Chat options"
        >
          ×
        </button>
        {chatBadge && <div className="chat-badge">{chatBadge}</div>}
      </div>
    </div>
  );
};

export default ChatItem;
