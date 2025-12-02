import { useEffect, useState, type FC } from 'react';
import Modal from '../../components/Modal';
import api from '../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { Statuses, type StatusValues } from '../../consts/FriendStatuses';
interface ModalUserProps {
  name: string;
  authorId: number;
  avatarLetter: string;
  onClose: () => void;
}

interface Chat {
  id: number;
  name: string;
  preview: string;
  chatTime: string;
  chatBadge: number;
  chatMembers: string[];
}

interface Friend {
  friend_id: number;
  id: number;
  status: string;
  user_id: number;
}

const ModalUser: FC<ModalUserProps> = ({
  name,
  authorId,
  avatarLetter,
  onClose,
}) => {
  const navigate = useNavigate();
  const userId = Number(localStorage.getItem('id'));
  const [authorStatus, setAuthorStatus] = useState<StatusValues>();
  const [isActiveOptions, setIsActiveOptions] = useState(false);

  const handleFriendCheck = async () => {
    const authorFriends: Friend[] = await (
      await api.get(`friend/${authorId}`)
    ).data.filter((friend: Friend) => friend.friend_id === userId);

    const authorSubscribers: Friend[] = await (
      await api.get(`friend/subscribers/${authorId}`)
    ).data.filter((subscriber: Friend) => subscriber.friend_id === authorId);

    const userSubscribers: Friend[] = await (
      await api.get(`friend/subscribers/${userId}`)
    ).data.filter((subscriber: Friend) => subscriber.user_id == authorId);

    if (authorFriends.length > 0) {
      setAuthorStatus(Statuses.FRIEND);
    } else if (authorSubscribers.length > 0) {
      setAuthorStatus(Statuses.SENT);
    } else if (userSubscribers.length > 0) {
      setAuthorStatus(Statuses.SUBSCRIBER);
    } else {
      setAuthorStatus(Statuses.UNKNOWN);
    }
    console.log(
      userId,
      authorId,
      authorFriends,
      authorSubscribers,
      userSubscribers,
    );

    setIsActiveOptions(false);
  };

  useEffect(() => {
    handleFriendCheck();
  }, []);

  const handleOpenChat = async () => {
    try {
      const chats: Chat[] = await (await api.get('/chats/')).data;
      const authorName = localStorage.getItem('name');

      if (!authorName) {
        return;
      }

      const existChat = chats.filter(
        (chat) =>
          chat.chatMembers.includes(authorName) &&
          chat.chatMembers.includes(name),
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

  const hanldeAddFriend = async () => {
    await api.post('/friend', {
      friendId: authorId,
    });
    handleFriendCheck();
  };

  const handleDeleteFriend = async () => {
    await api.delete(`friend/${authorId}`);
    handleFriendCheck();
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
          <button className="profile-btn" onClick={handleOpenChat}>
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
