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
  const [userRequests, setUserRequests] = useState<Friend[]>([]);
  const [userFollowing, setUserFollowing] = useState<Friend[]>([]);
  const [activeTab, setActiveTab] = useState<TabValues>(TabEnum.FRIENDS);
  const userId = Number(localStorage.getItem('id'));
  const handleGetFriendLists = async () => {
    const [userFriendsResponse, userRequestsResponse, userFollowingResponse] = await Promise.all([
      api.get(`friend/${userId}`),
      api.get(`friend/requests/${userId}`),
      api.get(`friend/following/${userId}`),
    ]);
    setUserFriends(userFriendsResponse.data);
    setUserRequests(userRequestsResponse.data);
    setUserFollowing(userFollowingResponse.data);
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
              friends={userRequests}
            />
          </div>
        )}
        {activeTab === TabEnum.FOLLOWERS && (
          <div className="user-list">
            <FriendsUserRow status={TabEnum.FOLLOWERS} friends={userFollowing} />
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Friends;
