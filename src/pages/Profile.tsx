import { useState, type FC } from 'react';
import useSWR from 'swr';
import { fetcher } from '../api/fetcher';
import MainLayout from '../layouts/MainLayout';
import ProfileHeader from '../features/profile/ProfileHeader';
import PostComposer from '../features/profile/PostComposer';
import Post from '../components/Post';
import type { IUser } from '../types/IUser';
import mockUserData from '../mocks/mockUserData.ts';

const Profile: FC = () => {
  const [activeItem, setActiveItem] = useState('profile');

  const {data, error, isLoading} = useSWR<IUser>(
    '/auth/profile/',
    fetcher,
    {
      revalidateOnFocus: true,
      shouldRetryOnError: false,
    }
  );

  if (isLoading) {
  }

  if (error) {
  }

  if (!data) {
  }
  
  const user: IUser = data ?? mockUserData;

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
            <PostComposer />
            <div className="feed">
              {user.posts.map((item) => (
                <Post item={item} />
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
