import type { FC } from 'react';
import Modal from '../../components/Modal';
import api from '../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
interface ModalUserProps {
  name: string;
  authorId: number;
  avatarLetter: string;
  onClose: () => void;
}

interface Chats {
  id: number;
  name: string;
  preview: string;
  chatTime: string;
  chatBadge: number;
  chatMembers: string[];
}

const ModalUser: FC<ModalUserProps> = ({
  name,
  authorId,
  avatarLetter,
  onClose,
}) => {
  const navigate = useNavigate();
  const handleOpenChat = async () => {
    try {
      const chats: Chats[] = await (await api.get('/chats/')).data;
      console.log(chats);
      const myName = localStorage.getItem('name');
      if (!myName) {
        return;
      }
      const existChat = chats.filter(
        (chat) =>
          chat.chatMembers.includes(myName) && chat.chatMembers.includes(name),
      )[0];
      if (existChat) {
        navigate('/message', { state: { chatId: existChat.id } });
      } else {
        const response: {
          userId: number;
        } = await api.post('/chats/private', {
          userId: authorId,
        });
        navigate('/message', { state: { chatId: response.userId } });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddFriend = async () => {
    await api.post('/chats/private', {
      userId: authorId,
    });
    navigate('/friend');
  };

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
          <button className="profile-btn" onClick={handleAddFriend}>
            <img src="./plus.svg" />
            Добавить в друзья
          </button>
          <button className="profile-btn" onClick={handleOpenChat}>
            <img src="./airplane.svg" />
            Написать сообщение
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalUser;
