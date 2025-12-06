import { useEffect, useState, type FC } from 'react';
import { TabEnum, type TabValues } from '../../consts/FriendsTabs';
import type { Friend } from '../../utils/getFriendLists';
import { getProfile } from '../../api/getProfie';
import type { IUser } from '../../types/IUser';
import moveToChat from '../../utils/openChat';
import { useNavigate } from 'react-router-dom';
import deleteFriend from '../../api/deleteFriend';
import addFriend from '../../api/addFriend';

interface FriendsUserRowProps {
  status: TabValues;
  friends: Friend[];
}

const FriendsUserRow: FC<FriendsUserRowProps> = ({ status, friends }) => {
  const navigate = useNavigate();
  const [friendList, setFriendList] = useState<IUser[]>([]);
  const getFriendsProfile = async () => {
    setFriendList(
      await Promise.all(friends.map((friend) => getProfile(friend.friend_id))),
    );
    console.log(friendList);
  };

  useEffect(() => {
    console.log(friends);
    getFriendsProfile();
  }, [friends]);

  const handleDeleteFriend = async (id: number | undefined) => {
    if (id) {
      await deleteFriend(id);
      await getFriendsProfile();
    }
  };

  const handleAddFriend = async (id: number | undefined) => {
    if (id) {
      await addFriend(id);
      await getFriendsProfile();
    }
  };
  return (
    <>
      {friendList.map((friend, key) => (
        <div className="user-row" key={key}>
          <a href="#" className="user-avatar-link">
            <div className="user-avatar">{friend.name[0]}</div>
          </a>
          <div className="user-info">
            <a href="#" className="user-name">
              {friend.name}
            </a>
            {/* <div className="user-status">Хочет добавить вас в друзья</div> */}
          </div>
          <div className="user-actions">
            {status === TabEnum.FOLLOWERS && (
              <button
                className="action-btn primary"
                onClick={() => handleAddFriend(friend.userId)}
              >
                <img src="/accept.svg" />
                <span>Принять</span>
              </button>
            )}

            <button
              className="action-btn primary"
              onClick={() =>
                moveToChat(friend.name, navigate, Number(friend.userId))
              }
              title="Написать сообщение"
            >
              <img src="/message.svg" />
            </button>

            {status === TabEnum.FRIENDS && (
              <button
                className="action-btn destructive"
                onClick={() => handleDeleteFriend(friend.userId)}
                title="Удалить из друзей"
              >
                <img src="/close.svg" />
              </button>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default FriendsUserRow;
