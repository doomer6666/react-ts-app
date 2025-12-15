import React, { useState, type FC } from 'react';
import getTimeAgo from '../../../utils/getTimeAgo';
import type IChatItem from '../../../types/chat/IChatItem';
import { useChat } from '../../../context/ChatContext';
import ModalLeaveChat from '../ModalLeaveChat';
import leaveChat from '../../../api/leaveChat';

const ChatItem: FC<IChatItem> = ({
  id,
  name,
  preview,
  chatTime,
  chatBadge,
  mutate,
}) => {
  const timeAgo = getTimeAgo(chatTime);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const activeChatContext = useChat();

  const handleOpenModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpenModal(true);
  };

  const handleLeaveChat = async () => {
    await leaveChat(id);
    await mutate();
    setIsOpenModal(false);
  };

  return (
    <div
      className={`chat-item ${activeChatContext.activeChat === id ? 'active' : ''}`}
      onClick={() => activeChatContext.setActiveChat(id)}
    >
      <div className="chat-avatar">{name[0]}</div>
      <div className="chat-info">
        <div className="chat-name">{name}</div>
        <div className="chat-preview">{`${preview}: ${timeAgo}`}</div>
      </div>

      <div className="chat-meta">
        <button
          className="chat-option"
          aria-label="Chat options"
          onClick={handleOpenModal}
        >
          ×
        </button>
        {chatBadge && <div className="chat-badge">{chatBadge}</div>}
      </div>
      {isOpenModal && (
        <ModalLeaveChat
          onClose={() => setIsOpenModal(false)}
          chatId={id}
          onLeaveChat={handleLeaveChat}
        />
      )}
    </div>
  );
};

export default ChatItem;
