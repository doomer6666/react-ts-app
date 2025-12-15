import type { FC } from 'react';
import Modal from '../../components/Modal';

interface ModalLeaveChatProps {
  onClose: () => void;
  chatId: number;
  onLeaveChat: () => void;
}
const ModalLeaveChat: FC<ModalLeaveChatProps> = ({ onClose, onLeaveChat }) => {
  return (
    <Modal onClose={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">ПОКИНУТЬ ЧАТ</div>
          <div className="modal-close" onClick={onClose}>
            &times;
          </div>
        </div>
        <div className="modal-body">
          <div className="confirm-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="32"
              height="32"
            >
              <path
                d="M5 21V3h9v4h2V2a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v20a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-5h-2v4H5z"
                fill="#E57373"
              />
              <path
                d="M21.7 12.3l-4-4a1 1 0 0 0-1.4 1.4L18.6 12H10a1 1 0 0 0 0 2h8.6l-2.3 2.3a1 1 0 0 0 1.4 1.4l4-4a1 1 0 0 0 0-1.4z"
                fill="#E57373"
              />
            </svg>
          </div>
          <div className="confirm-title">Вы уверены?</div>
          <div className="confirm-text">
            Вы собираетесь покинуть чат. История сообщений будет удалена, и вы
            не сможете получать новые сообщения из этого чата.
          </div>
        </div>
        <div className="modal-footer">
          <button className="modal-button cancel" onClick={onClose}>
            Отмена
          </button>
          <button className="modal-button danger" onClick={onLeaveChat}>
            Покинуть
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalLeaveChat;
