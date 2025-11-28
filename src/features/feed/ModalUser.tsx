import type { FC } from 'react';
import Modal from '../../components/Modal';
// import api from '../../api/axiosInstance';

interface ModalUserProps {
  name: string;
  avatarLetter: string;
  onClose: () => void;
}

const ModalUser: FC<ModalUserProps> = ({ name, avatarLetter, onClose }) => {
  // как будут ручки
  // handleOpenChat = async()=>{
  //   const response = api.post()
  // }
  return (
    <Modal onClose={onClose}>
      <div className="profile-modal">
        <button className="modal-close" id="closeModal" onClick={onClose}>
          <img src="./close.svg" />
        </button>
        <div className="profile-header">
          <div className="profile-avatar" id="modalAvatar">
            {avatarLetter}
          </div>
          <div className="profile-name" id="modalName">
            {name}
          </div>
        </div>
        <div className="profile-actions">
          <button className="profile-btn">
            <img src="./plus.svg" />
            Добавить в друзья
          </button>
          <button className="profile-btn">
            <img src="./airplane.svg" />
            Написать сообщение
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalUser;
