import type { FC } from 'react';
import getTimeAgo from '../../../utils/getTimeAgo';
import settings from '../../../api/config';

interface ChatMessageProps {
  direction: string;
  name: string;
  message: string;
  time: string;
  imageUrl?: string;
  avatarUrl?: string;
}
const ChatMessage: FC<ChatMessageProps> = ({
  direction,
  name,
  message,
  time,
  imageUrl,
  avatarUrl,
}) => {
  const timeAgo = getTimeAgo(time);

  return (
    <div className={`message ${direction}`}>
      {avatarUrl ? (
        <div className="message-avatar">
          <img src={settings.apiBaseUrl + avatarUrl} alt="Avatar" />
        </div>
      ) : (
        <div className="message-avatar">{name[0]}</div>
      )}
      <div className="message-content">
        <div className="message-text">{message}</div>
        {imageUrl && (
          <div className="message-image">
            <img src={settings.apiBaseUrl + imageUrl} alt="Message image" />
          </div>
        )}
        <div className="message-time">{timeAgo}</div>
      </div>
    </div>
  );
};

export default ChatMessage;
