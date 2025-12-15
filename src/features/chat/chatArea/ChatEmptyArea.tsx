import { useState } from 'react';
import ModalChatInvite from '../chatInvite/ModalChatInvite';

const ChatEmptyArea = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="empty-chat">
      <img src="./letter.svg" />
      <div className="empty-chat-text">Выберите чат или создайте новый</div>
      <button className="create-chat-btn" onClick={() => setOpenModal(true)}>
        Создать чат
      </button>
      {openModal && <ModalChatInvite onClose={() => setOpenModal(false)} />}
    </div>
  );
};

export default ChatEmptyArea;
