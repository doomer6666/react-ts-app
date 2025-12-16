import type { FC } from 'react';
import Modal from '../components/Modal';

interface ModalExitLayoutProps {
  onClose: () => void;
  onLeave: () => void;
  headerText: string;
  message: string;
  exitText: string;
}

const ModalExitLayout: FC<ModalExitLayoutProps> = ({
  onClose,
  onLeave,
  headerText,
  message,
  exitText,
}) => {
  return (
    <Modal onClose={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">{headerText}</div>
          <div className="modal-close" onClick={onClose}>
            &times;
          </div>
        </div>
        <div className="modal-body">
          <div className="confirm-icon">
            <img src="/exit.svg" />
          </div>
          <div className="confirm-title">Вы уверены?</div>
          <div className="confirm-text">{message}</div>
        </div>
        <div className="modal-footer">
          <button className="modal-button cancel" onClick={onClose}>
            Отмена
          </button>
          <button className="modal-button danger" onClick={onLeave}>
            {exitText}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalExitLayout;
