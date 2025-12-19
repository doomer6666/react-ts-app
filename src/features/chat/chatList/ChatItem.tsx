import React, { useState, type FC } from 'react';
import getTimeAgo from '../../../utils/getTimeAgo';
import type IChatItem from '../../../types/chat/IChatItem';
import { useChat } from '../../../context/ChatContext';
import leaveChat from '../../../api/leaveChat';
import ModalExitLayout from '../../../layouts/ModalExitLayout';

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
      {chatBadge !== null ? (<div className="chat-avatar"><img src={"http://localhost:8000/" + chatBadge} alt="Avatar"/></div>) :
        (<div className="chat-avatar">{name[0]}</div>)
      }
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
        {/* {chatBadge && <div className="chat-badge">{chatBadge}</div>} */}
      </div>
      {isOpenModal && (
        <ModalExitLayout
          onClose={() => setIsOpenModal(false)}
          onLeave={handleLeaveChat}
          headerText="ПОКИНУТЬ ЧАТ"
          message="Вы собираетесь покинуть чат. История сообщений будет удалена, и вы не сможете получать новые сообщения из этого чата."
          exitText="Покинуть"
        />
      )}
    </div>
  );
};

export default ChatItem;
