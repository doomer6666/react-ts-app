import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  title?: string;
  children?: React.ReactNode;
  onConfirm?: () => void;
  onClose: () => void;
  confirmText?: string;
  cancelText?: string;
}

const Modal: React.FC<ModalProps> = ({
  title = 'Модальное окно',
  children,
  onConfirm,
  onClose,
  confirmText = 'ОК',
  cancelText = 'Отмена',
}) => {
  const modalRoot = document.getElementById('modal-root');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  if (!modalRoot) {
    return;
  }

  return createPortal(
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <span>{title}</span>
          <button className="modal-close" onClick={onClose}>
            x
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
    </div>,
    modalRoot,
  );
};

export default Modal;
