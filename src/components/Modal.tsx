import {
  useEffect,
  useRef,
  type FC,
  type MouseEvent,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

const Modal: FC<ModalProps> = ({ children, onClose }) => {
  const modalRoot = document.getElementById('modal-root');

  const modalContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleClose = (e: MouseEvent<HTMLDivElement>) => {
    if (
      modalContentRef.current &&
      modalContentRef.current.contains(e.target as Node)
    ) {
      return;
    }
    onClose();
  };
  if (!modalRoot) {
    return null;
  }

  return createPortal(
    <div className="modal-overlay" onClick={(e) => handleClose(e)}>
      <div ref={modalContentRef}>{children}</div>
    </div>,
    modalRoot,
  );
};

export default Modal;
