import { useState, type FC } from 'react';
import useSWR from 'swr';
import { fetcher } from '../api/fetcher';
import MainLayout from '../layouts/MainLayout';
import ProfileHeader from '../features/profile/ProfileHeader';
import PostComposer from '../features/profile/PostComposer';
import Post from '../components/Post';
import type { IUser } from '../types/IUser';
import { useParams } from 'react-router-dom';

const Profile: FC = () => {
  const [activeItem, setActiveItem] = useState('profile');
  const params = useParams();
  const userId = Number(localStorage.getItem('id'));
  let profileUrl = '/profile/';
  if (params.profileId) {
    profileUrl = `/profile/${params.profileId}`;
  }
  const { data, error, isLoading, mutate } = useSWR<IUser>(
    profileUrl,
    fetcher,
    {
      revalidateOnFocus: true,
      shouldRetryOnError: false,
      refreshInterval: 100,
    },
  );

  if (error) {
    return <div>Ошибка, зайдите позже</div>;
  }

  if (!data) {
    return;
  }

  const user: IUser = data;
  const postsSorted = user.posts.toSorted(
    (a, b) => new Date(b.postTime).getTime() - new Date(a.postTime).getTime(),
  );

  return (
    <MainLayout
      activeItem={activeItem}
      setActiveItem={setActiveItem}
      pageName="profile"
    >
      <div className="profile-container">
        <ProfileHeader user={user} />
        <div className="profile-content">
          <div className="profile-feed">
            {user.userId === userId && (
              <PostComposer mutate={mutate} AvatarLetter={user.name[0]} />
            )}

            <div className="feed">
              {isLoading && <div>Загрузка...</div>}
              {postsSorted.map((item) => (
                <Post item={item} mutate={mutate} isFromProfile={true} />
              ))}
            </div>

            {/*вернуться когда будет логика <div className="post-options">
                  <img src="/option.svg" />
                </div> */}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
