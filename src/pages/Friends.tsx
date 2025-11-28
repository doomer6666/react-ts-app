import { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import FriendsHeader from '../features/friends/FriendsHeader';
import FriendsUserRow from '../features/friends/FriendsUserRow';
import { TabEnum, type TabValues } from '../consts/FriendsTabs';

const Friends = () => {
  const [activeItem, setActiveItem] = useState('friends');
  const [activeTab, setActiveTab] = useState<TabValues>(TabEnum.FRIENDS);
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
            <FriendsUserRow />
          </div>
        )}
        {activeTab === TabEnum.REQUESTS && (
          <div className="user-list">
            <FriendsUserRow />
          </div>
        )}
        {activeTab === TabEnum.FOLLOWERS && (
          <div className="user-list">
            <FriendsUserRow />
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Friends;
