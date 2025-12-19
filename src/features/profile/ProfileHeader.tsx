import type { FC } from 'react';
import type IUser from '../../types/IUser';
interface ProfileProps {
  user: IUser;
}
const ProfileHeader: FC<ProfileProps> = ({ user }) => {
  const avavarLetter = user.name[0];
  const avatarUrl = user.avatarUrl || '';
  return (
    <div className="header">
      <div className="profile-header">
        <div className="profile-cover"></div>
        <div className="profile-avatar-container">
          {avatarUrl ? (
            <img src={"http://localhost:8000/" + avatarUrl} alt="Avatar" className="profile-avatar" />
          ) : (
            <div className="profile-avatar">{avavarLetter}</div>
          )}
        </div>
      </div>
      <div className="profile-info">
        <div className="profile-name-container">
          <h1 className="profile-name">{user.name}</h1>
        </div>
        <div className="profile-stats">
          <div className="profile-stat">
            <div className="profile-stat-value">{user.friendCount}</div>
            <div className="profile-stat-label">Друзей</div>
          </div>
          <div className="profile-stat">
            <div className="profile-stat-value">{user.photoCount}</div>
            <div className="profile-stat-label">Фото</div>
          </div>
          <div className="profile-stat">
            <div className="profile-stat-value">{user.subscriberCount}</div>
            <div className="profile-stat-label">Подписчиков</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
