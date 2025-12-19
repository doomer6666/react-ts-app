import { useCallback, useEffect, useMemo, useState, type FC } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import api from '../api/axiosInstance';
import { fetcher } from '../api/fetcher';
import { getSipmleProfile } from '../api/getProfie';
import Modal from '../components/Modal';
import type { Friend } from '../utils/getFriendLists';
import type { IChat } from '../features/feed/ModalUser';

interface ModalChatInviteProps {
  onClose: () => void;
  isCreated: boolean;
  chatId?: number;
}

interface SipmleIUser {
  name: string;
  id: number;
  avatarUrl?: string;
}

const ModalChat: FC<ModalChatInviteProps> = ({
  onClose,
  isCreated,
  chatId,
}) => {
  const userId = Number(localStorage.getItem('id'));
  const { data } = useSWR<Friend[]>(`friend/${userId}`, fetcher, {
    revalidateOnFocus: true,
    shouldRetryOnError: false,
  });
  const { mutate } = useSWRConfig();

  const [friendList, setFriendList] = useState<SipmleIUser[]>([]);

  const getFriendsProfile = async (data: Friend[] | undefined) => {
    if (!data) return;

    const profiles = await Promise.all(
      data.map(friend => getSipmleProfile(friend.friend_id))
    );

    setFriendList(
      profiles.filter((p): p is SipmleIUser => p !== null)
    );
  };

  useEffect(() => {
    getFriendsProfile(data);
    fillDataIfCreated();
  }, [data]);

  const [chatName, setChatName] = useState('');
  const [filterInput, setFilterInput] = useState('');
  const [selectedFriends, setSelectedFriends] = useState<SipmleIUser[]>([]);

  const isSelected = useCallback(
    (friend: SipmleIUser) => {
      return selectedFriends.some((f) => f.id === friend.id);
    },
    [selectedFriends],
  );

  const filteredChatList = useMemo(() => {
    return friendList.filter((item) =>
      item.name.toLowerCase().includes(filterInput.toLowerCase().trim()),
    );
  }, [filterInput, friendList]);

  const fillDataIfCreated = async () => {
    if (!isCreated) return;

    const { data } = await api.get<IChat>(`/chats/${chatId}`);
    setChatName(data.name);

    const profiles = await Promise.all(
      data.chatMembers.map(friend =>
        getSipmleProfile(friend.id)
      )
    );

    setSelectedFriends(
      profiles.filter((p): p is SipmleIUser => p !== null)
    );
  };


  const unSelectFriend = (friend: SipmleIUser) => {
    setSelectedFriends(selectedFriends.filter((item) => item !== friend));
  };

  const selectFriend = (friend: SipmleIUser) => {
    if (isSelected(friend)) {
      unSelectFriend(friend);
    } else {
      setSelectedFriends([...selectedFriends, friend]);
    }
  };

  const createChat = async () => {
    await api.post('/chats/', {
      name: chatName,
      members: [...selectedFriends.map((friend) => friend.id), userId],
    });
    onClose();
    await mutate('/chats/');
  };

  const addMembers = async () => {
    await api.post(`/chats/${chatId}/members`, {
      members: selectedFriends.map((friend) => friend.id),
    });
    onClose();
  };
  return (
    <Modal onClose={onClose}>
      <div className="chat-modal-container">
        <div className="modal-header">
          <div className="modal-title">
            {isCreated ? chatName : 'СОЗДАТЬ НОВЫЙ ЧАТ'}
          </div>
          <div className="modal-close" onClick={onClose}>
            &times;
          </div>
        </div>
        <div className="modal-body">
          {!isCreated && (
            <div className="modal-form-group">
              <label htmlFor="chatName">
                {isCreated ? chatName : 'Название чата'}
              </label>
              <input
                type="text"
                id="chatName"
                placeholder="Введите название чата"
                value={chatName}
                onChange={(e) => setChatName(e.target.value)}
              />
            </div>
          )}

          <div className="modal-form-group">
            <label>Пригласить участников</label>
            <div className="chat-search">
              <input
                type="text"
                id="searchParticipants"
                placeholder="Найти по имени"
                value={filterInput}
                onChange={(e) => setFilterInput(e.target.value)}
                disabled={isCreated}
              />
            </div>

            <div className="participants-list">
              {filteredChatList.map((friend) => (
                <div className="participant-item">
                  {friend.avatarUrl !== null ? (
                  <img
                    src={'http://localhost:8000/' + friend.avatarUrl}
                    alt="Avatar"
                    className="participant-avatar"
                  />
                    ) : (
                  <div className="participant-avatar">{friend.name[0]}</div>
                    )}
                  <div className="participant-info">
                    <div className="participant-name">{friend.name}</div>
                  </div>
                  <div
                    className={`participant-action ${isSelected(friend) ? 'added' : ''}`}
                    onClick={() => selectFriend(friend)}
                  >
                    {isSelected(friend) ? 'Добавлен/а' : 'Добавить'}
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
                      {friend.avatarUrl !== null ? (
                      <img
                        src={'http://localhost:8000/' + friend.avatarUrl}
                        alt="Avatar"
                        className="selected-user-avatar"
                      />
                        ) : (
                      <div className="selected-user-avatar">
                        {friend.name[0]}
                      </div>
                      )}
                      <div className="selected-user-name">{friend.name}</div>
                      {!isCreated && (
                        <div
                          className="selected-user-remove"
                          onClick={() => unSelectFriend(friend)}
                        >
                          &times;
                        </div>
                      )}
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
            onClick={isCreated ? addMembers : createChat}
          >
            {isCreated ? 'Добавить участников' : 'Создать чат'}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalChat;
