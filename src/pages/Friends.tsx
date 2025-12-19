import { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import FriendsHeader from '../features/friends/FriendsHeader';
import FriendsUserRow from '../features/friends/FriendsUserRow';
import { TabEnum, type TabValues } from '../consts/FriendsTabs';
import type { Friend } from '../utils/getFriendLists';
import { fetcher } from '../api/fetcher';
import useSWR from 'swr';

const Friends = () => {
  const [activeItem, setActiveItem] = useState('friends');
  const [activeTab, setActiveTab] = useState<TabValues>(TabEnum.FRIENDS);
  const userId = Number(localStorage.getItem('id'));

  const { data: userFriends, mutate: friendsMutate } = useSWR<Friend[]>(
    `friend/${userId}`,
    fetcher,
    {
      revalidateOnFocus: true,
      shouldRetryOnError: false,
    },
  );

  const { data: userRequests, mutate: requestsMutate } = useSWR<Friend[]>(
    `friend/requests/${userId}`,
    fetcher,
    {
      revalidateOnFocus: true,
      shouldRetryOnError: false,
    },
  );

  const { data: userFollowing, mutate: followingMutate } = useSWR<Friend[]>(
    `friend/following/${userId}`,
    fetcher,
    {
      revalidateOnFocus: true,
      shouldRetryOnError: false,
    },
  );

  return (
    <MainLayout
      pageName={'friends'}
      activeItem={activeItem}
      setActiveItem={setActiveItem}
    >
      <div className="main-content">
        <FriendsHeader activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === TabEnum.FRIENDS && (
          <>
            {!userFriends || userFriends.length === 0 ? (
              <div className="empty">У вас пока нет друзей:(</div>
            ) : (
              <div className="user-list">
                <FriendsUserRow
                  status={TabEnum.FRIENDS}
                  friends={userFriends}
                  mutate={friendsMutate}
                />
              </div>
            )}
          </>
        )}
        {activeTab === TabEnum.REQUESTS && (
          <>
            {!userRequests || userRequests.length === 0 ? (
              <div className="empty">У вас пока нет заявок</div>
            ) : (
              <div className="user-list">
                <FriendsUserRow
                  status={TabEnum.REQUESTS}
                  friends={userRequests}
                  mutate={requestsMutate}
                />
              </div>
            )}
          </>
        )}
        {activeTab === TabEnum.FOLLOWERS && (
          <>
            {!userFollowing || userFollowing.length === 0 ? (
              <div className="empty">У вас пока нет подписчиков</div>
            ) : (
              <div className="user-list">
                <FriendsUserRow
                  status={TabEnum.FOLLOWERS}
                  friends={userFollowing}
                  mutate={followingMutate}
                />
              </div>
            )}
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default Friends;
