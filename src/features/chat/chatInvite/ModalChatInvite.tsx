import { useEffect, useMemo, useState, type FC } from 'react';
import Modal from '../../../components/Modal';
import useSWR from 'swr';
import { fetcher } from '../../../api/fetcher';
import type { Friend } from '../../../utils/getFriendLists';
import { getProfile } from '../../../api/getProfie';
import type IUser from '../../../types/IUser';
import api from '../../../api/axiosInstance';

interface ModalChatInviteProps {
  onClose: () => void;
}

const ModalChatInvite: FC<ModalChatInviteProps> = ({ onClose }) => {
  const userId = Number(localStorage.getItem('id'));

  const { data } = useSWR<Friend[]>(`friend/${userId}`, fetcher, {
    revalidateOnFocus: true,
    shouldRetryOnError: false,
    refreshInterval: 100,
  });

  const [friendList, setFriendList] = useState<IUser[]>([]);

  const getFriendsProfile = async () => {
    if (data) {
      console.log(data);
      setFriendList(
        await Promise.all(data.map((friend) => getProfile(friend.friend_id))),
      );
    }
  };

  useEffect(() => {
    getFriendsProfile();
  }, [data]);

  const [chatName, setChatName] = useState('');
  const [filterInput, setFilterInput] = useState('');

  const filteredChatList = useMemo(() => {
    console.log(friendList);
    return friendList.filter((item) =>
      item.name.toLowerCase().includes(filterInput.toLowerCase().trim()),
    );
  }, [filterInput, friendList]);

  const [selectedFriends, setSelectedFriends] = useState<IUser[]>([]);

  const unSelectFriend = (friend: IUser) => {
    setSelectedFriends(selectedFriends.filter((item) => item !== friend));
  };

  const selectFriend = (friend: IUser) => {
    if (selectedFriends.includes(friend)) {
      unSelectFriend(friend);
    } else {
      setSelectedFriends([...selectedFriends, friend]);
    }
  };

  const createChat = async () => {
    await api.post('/chats/', {
      name: chatName,
      members: [...selectedFriends.map((friend) => friend.userId), userId],
    });
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <div className="chat-modal-container">
        <div className="modal-header">
          <div className="modal-title">СОЗДАТЬ НОВЫЙ ЧАТ</div>
          <div className="modal-close" onClick={onClose}>
            &times;
          </div>
        </div>
        <div className="modal-body">
          <div className="modal-form-group">
            <label htmlFor="chatName">Название чата</label>
            <input
              type="text"
              id="chatName"
              placeholder="Введите название чата"
              value={chatName}
              onChange={(e) => setChatName(e.target.value)}
            />
          </div>

          <div className="modal-form-group">
            <label>Пригласить участников</label>
            <div className="chat-search">
              <input
                type="text"
                id="searchParticipants"
                placeholder="Найти по имени"
                value={filterInput}
                onChange={(e) => setFilterInput(e.target.value)}
              />
            </div>

            <div className="participants-list">
              {filteredChatList.map((friend) => (
                <div className="participant-item">
                  <div className="participant-avatar">{friend.name[0]}</div>
                  <div className="participant-info">
                    <div className="participant-name">{friend.name}</div>
                  </div>
                  <div
                    className={`participant-action ${selectedFriends.includes(friend) ? 'added' : ''}`}
                    onClick={() => selectFriend(friend)}
                  >
                    {selectedFriends.includes(friend)
                      ? 'Добавлен/а'
                      : 'Добавить'}
                  </div>
                </div>
              ))}
            </div>
            {selectedFriends.length > 0 && (
              <div className="selected-participants">
                <div className="selected-title">Выбранные участники:</div>
                <div className="selected-list">
                  {selectedFriends.map((friend) => (
                    <div className="selected-user">
                      <div className="selected-user-avatar">
                        {friend.name[0]}
                      </div>
                      <div className="selected-user-name">{friend.name}</div>
                      <div
                        className="selected-user-remove"
                        onClick={() => unSelectFriend(friend)}
                      >
                        &times;
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="modal-footer">
          <button className="modal-button cancel" onClick={onClose}>
            Отмена
          </button>
          <button
            className="modal-button create"
            disabled={selectedFriends.length == 0 || !chatName}
            onClick={createChat}
          >
            Создать чат
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalChatInvite;
