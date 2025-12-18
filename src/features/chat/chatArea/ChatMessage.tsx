import type { FC } from 'react';
import getTimeAgo from '../../../utils/getTimeAgo';

interface ChatMessageProps {
  direction: string;
  name: string;
  message: string;
  time: string;
  imageUrl?: string;
}
const ChatMessage: FC<ChatMessageProps> = ({
  direction,
  name,
  message,
  time,
  imageUrl,
}) => {
  const timeAgo = getTimeAgo(time);

  return (
    <div className={`message ${direction}`}>
      <div className="message-avatar">{name[0]}</div>
      <div className="message-content">
        <div className="message-text">{message}</div>
        {imageUrl && (
          <div className="message-image">
            <img src={'http://localhost:8000/' + imageUrl} alt="Message image" />
          </div>
        )}
        <div className="message-time">{timeAgo}</div>
      </div>
    </div>
  );
};

export default ChatMessage;
