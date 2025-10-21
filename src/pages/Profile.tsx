import { useState, type FC } from 'react';
import MainLayout from '../layouts/MainLayout';
import ProfileHeader from '../features/profile/ProfileHeader';
import PostComposer from '../features/profile/PostComposer';
import Post from '../components/Post';
import type ProfileProps from '../types/IUser';

const Profile: FC<ProfileProps> = ({ user }) => {
  const [activeItem, setActiveItem] = useState('profile');
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
