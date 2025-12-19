import { useEffect, useState, type FC } from 'react';
import Modal from '../../components/Modal';
import { useNavigate } from 'react-router-dom';
import { Statuses, type StatusValues } from '../../consts/FriendStatuses';
import moveToChat from '../../utils/openChat';
import deleteFriend from '../../api/deleteFriend';
import addFriend from '../../api/addFriend';
import getFriendStatus from '../../utils/getFriendStatus';
interface ModalUserProps {
  name: string;
  authorId: number;
  avatarLetter: string;
  onClose: () => void;
}

export interface IChat {
  id: number;
  name: string;
  preview: string;
  chatTime: string;
  chatBadge: number;
  chatMembers: { id: number; username: string }[];
}

const ModalUser: FC<ModalUserProps> = ({
  name,
  authorId,
  avatarLetter,
  onClose,
}) => {
  const navigate = useNavigate();
  const [authorStatus, setAuthorStatus] = useState<StatusValues>();
  const [isActiveOptions, setIsActiveOptions] = useState(false);

  const handleFriendCheck = async () => {
    const status = await getFriendStatus(authorId);

    if (status === 'friends') {
      setAuthorStatus(Statuses.FRIEND);
    } else if (status === 'following') {
      setAuthorStatus(Statuses.SENT);
    } else if (status === 'pending') {
      setAuthorStatus(Statuses.SUBSCRIBER);
    } else {
      setAuthorStatus(Statuses.UNKNOWN);
    }

    setIsActiveOptions(false);
  };

  useEffect(() => {
    handleFriendCheck();
  }, []);

  const hanldeAddFriend = async () => {
    await addFriend(authorId);
    handleFriendCheck();
  };

  const handleDeleteFriend = async () => {
    await deleteFriend(authorId);
    handleFriendCheck();
  };

  return (
    <Modal onClose={onClose}>
      <div className="profile-modal">
        <button className="modal-close" id="closeModal" onClick={onClose}>
          <img src="./close.svg" />
        </button>
        <div className="profile-header">
          <div
            className="profile-avatar"
            id="modalAvatar"
            onClick={() => navigate('/profile/' + authorId)}
          >
            {avatarLetter}
          </div>
          <div className="profile-name" id="modalName">
            {name}
          </div>
        </div>
        <div className="profile-actions">
          <button
            className="profile-btn"
            onClick={() => moveToChat(name, navigate, authorId)}
          >
            <img src="./airplane.svg" />
            Написать сообщение
          </button>
          {authorStatus === Statuses.SENT && (
            <button
              className={`profile-btn ${isActiveOptions ? 'active' : ''}`}
              onClick={() => setIsActiveOptions(!isActiveOptions)}
            >
              Заявка отправлена
            </button>
          )}
          {authorStatus === Statuses.SUBSCRIBER && (
            <button
              className="profile-btn"
              onClick={() => setIsActiveOptions(!isActiveOptions)}
            >
              В подписчиках
            </button>
          )}
          {authorStatus === Statuses.FRIEND && (
            <button
              className="profile-btn"
              onClick={() => setIsActiveOptions(!isActiveOptions)}
            >
              В друзьях
            </button>
          )}
          {(authorStatus === Statuses.UNKNOWN ||
            (authorStatus === Statuses.SUBSCRIBER && isActiveOptions)) && (
            <button className="profile-btn" onClick={hanldeAddFriend}>
              <img src="./plus.svg" />
              Добавить в друзья
            </button>
          )}
          {isActiveOptions && authorStatus !== Statuses.SUBSCRIBER && (
            <button className="profile-btn" onClick={handleDeleteFriend}>
              {authorStatus === Statuses.FRIEND ? (
                <>Удалить из друзей</>
              ) : (
                <>Отменить</>
              )}
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ModalUser;
