import React from "react";

interface ModalProps {
  isOpen: boolean;
  title?: string;
  children?: React.ReactNode;
  onConfirm?: () => void;
  onClose: () => void;
  confirmText?: string;
  cancelText?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  title = "Модальное окно",
  children,
  onConfirm,
  onClose,
  confirmText = "ОК",
  cancelText = "Отмена",
}) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
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
    </div>
  );
};

export default Modal;