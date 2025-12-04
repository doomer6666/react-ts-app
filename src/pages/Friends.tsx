import { useEffect, useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import FriendsHeader from '../features/friends/FriendsHeader';
import FriendsUserRow from '../features/friends/FriendsUserRow';
import { TabEnum, type TabValues } from '../consts/FriendsTabs';
import api from '../api/axiosInstance';
import type { Friend } from '../utils/getFriendLists';

const Friends = () => {
  const [activeItem, setActiveItem] = useState('friends');
  const [userFriends, setUserFriends] = useState<Friend[]>([]);
  const [userSubscribers, setUserSubscribers] = useState<Friend[]>([]);
  const [activeTab, setActiveTab] = useState<TabValues>(TabEnum.FRIENDS);
  const userId = Number(localStorage.getItem('id'));
  const handleGetFriendLists = async () => {
    const [userFriendsResponse, userSubscribersResponse] = await Promise.all([
      api.get(`friend/${userId}`),
      api.get(`friend/subscribers/${userId}`),
    ]);
    setUserFriends(userFriendsResponse.data);
    setUserSubscribers(userSubscribersResponse.data);
  };
  useEffect(() => {
    handleGetFriendLists();
  }, []);

  return (
    <MainLayout
      pageName={'friends'}
      activeItem={activeItem}
      setActiveItem={setActiveItem}
    >
      <div className="main-content">
        <FriendsHeader activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === TabEnum.FRIENDS && (
          <div className="user-list">
            <FriendsUserRow status={TabEnum.FRIENDS} friends={userFriends} />
          </div>
        )}
        {activeTab === TabEnum.REQUESTS && (
          <div className="user-list">
            <FriendsUserRow
              status={TabEnum.REQUESTS}
              friends={userSubscribers}
            />
          </div>
        )}
        {activeTab === TabEnum.FOLLOWERS && (
          <div className="user-list">
            <FriendsUserRow status={TabEnum.FOLLOWERS} friends={[]} />
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Friends;
