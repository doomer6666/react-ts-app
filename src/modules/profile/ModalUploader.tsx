import React from 'react';
import Modal from '../../components/Modal';

interface ModalUploaderProps {
  title?: string;
  children?: React.ReactNode;
  onConfirm?: () => void;
  onClose: () => void;
  confirmText?: string;
  cancelText?: string;
}

const ModalUploader: React.FC<ModalUploaderProps> = ({
  title = 'Модальное окно',
  children,
  onConfirm,
  onClose,
  confirmText = 'ОК',
  cancelText = 'Отмена',
}) => {
  return (
    <Modal onClose={onClose}>
      <div className="modal">
        <div className="modal-header">
          <span>{title}</span>
          <button className="modal-close" onClick={onClose}>
            <img src="./close.svg" />
          </button>
        </div>

        <div className="modal-body">{children}</div>

        <div className="modal-footer">
          <button className="modal-btn cancel" onClick={onClose}>
            {cancelText}
          </button>
          {onConfirm && (
            <button className="modal-btn confirm" onClick={onConfirm}>
              {confirmText}
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ModalUploader;
