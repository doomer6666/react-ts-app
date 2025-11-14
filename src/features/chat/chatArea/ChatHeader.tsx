import type { FC } from 'react';

const ChatHeader: FC<{ name: string }> = ({ name }) => {
  return (
    <div className="chat-header">
      <div className="chat-header-info">
        <div className="chat-header-avatar">{name[0]}</div>
        <div>
          <div className="chat-header-name">{name}</div>
          {/* <div className="chat-header-status">Онлайн</div> */}
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
