import type { FC } from 'react';
import getTimeAgo from '../../../utils/getTimeAgo';

interface ChatMessageProps {
  direction: string;
  name: string;
  message: string;
  time: string;
}
const ChatMessage: FC<ChatMessageProps> = ({
  direction,
  name,
  message,
  time,
}) => {
  const timeAgo = getTimeAgo(time);

  return (
    <div className={`message ${direction}`}>
      <div className="message-avatar">{name[0]}</div>
      <div className="message-content">
        <div className="message-text">{message}</div>
        <div className="message-time">{timeAgo}</div>
      </div>
    </div>
  );
};

export default ChatMessage;
