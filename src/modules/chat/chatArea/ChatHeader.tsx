import { useState, type FC } from 'react';
import ModalChat from '../../../layouts/ModalChat';
import settings from '../../../api/config';

const ChatHeader: FC<{ name: string; chatId: number; chatBadge?: string }> = ({
  name,
  chatBadge,
  chatId,
}) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  return (
    <div className="chat-header">
      <div className="chat-header-info" onClick={() => setIsOpenModal(true)}>
        {chatBadge !== '' ? (
          <div className="chat-header-avatar">
            <img src={settings.apiBaseUrl + chatBadge} alt="Avatar" />
          </div>
        ) : (
          <div className="chat-header-avatar">{name[0]}</div>
        )}
        <div>
          <div className="chat-header-name">{name}</div>
        </div>
      </div>
      {isOpenModal && (
        <ModalChat
          onClose={() => {
            setIsOpenModal(false);
          }}
          isCreated={true}
          chatId={chatId}
        />
      )}
    </div>
  );
};

export default ChatHeader;
