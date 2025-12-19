import type { FC } from 'react';

const ChatHeader: FC<{ name: string; chatId: number; chatBadge?: string }> = ({ name, chatBadge }) => {
  return (
    <div className="chat-header">
      <div className="chat-header-info">
        {chatBadge !== '' ? (
          <div className="chat-header-avatar">
            <img src={"http://localhost:8000/" + chatBadge} alt="Avatar" />
          </div>
        ) : (
          <div className="chat-header-avatar">{name[0]}</div>
        )}
        <div>
          <div className="chat-header-name">{name}</div>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
