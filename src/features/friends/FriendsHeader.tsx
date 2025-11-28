import type { FC } from 'react';
import { TabEnum, type TabValues } from '../../consts/FriendsTabs';

interface FriendsHeaderProps {
  activeTab: string;
  setActiveTab: (tab: TabValues) => void;
}

const FriendsHeader: FC<FriendsHeaderProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="header-controls">
      <div className="tabs">
        <div
          className={`tab ${activeTab === TabEnum.FRIENDS && 'active'}`}
          onClick={() => setActiveTab(TabEnum.FRIENDS)}
        >
          Все друзья
        </div>
        <div
          className={`tab ${activeTab === TabEnum.REQUESTS && 'active'}`}
          onClick={() => setActiveTab(TabEnum.REQUESTS)}
        >
          Заявки
        </div>
        <div
          className={`tab ${activeTab === TabEnum.FOLLOWERS && 'active'}`}
          onClick={() => setActiveTab(TabEnum.FOLLOWERS)}
        >
          Подписчики
        </div>
      </div>
    </div>
  );
};

export default FriendsHeader;
