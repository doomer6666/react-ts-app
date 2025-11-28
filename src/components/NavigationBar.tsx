import type { FC } from 'react';
import type INavigationBar from '../types/INavigationBar';
import { useNavigate } from 'react-router-dom';
import { GlobalTabEnum } from '../consts/DungeonTabs';

const NavigationBar: FC<INavigationBar> = ({ activeItem, setActiveItem }) => {
  const navigate = useNavigate();
  const items = [
    { key: GlobalTabEnum.PROFILE, name: 'Профиль', icon: '/profile.svg' },
    { key: GlobalTabEnum.FEED, name: 'Лента', icon: '/feed.svg' },
    { key: GlobalTabEnum.MESSAGE, name: 'Сообщения', icon: '/chat.svg' },
    { key: GlobalTabEnum.FRIENDS, name: 'Друзья', icon: '/friends.svg' },
    { key: GlobalTabEnum.MUSIC, name: 'Музыка', icon: '/music.svg' },
    { key: GlobalTabEnum.SETTINGS, name: 'Настройки', icon: '/setting.svg' },
  ];

  return (
    <div className="sidebar">
      <div className="logo">ПОДЗЕМЕЛЬЕ</div>
      {items.map((item) => (
        <div
          key={item.key}
          className={`menu-item ${item.key === activeItem ? 'active' : ''}`}
          onClick={() => {
            setActiveItem(item.key);
            navigate(`/${item.key}`);
          }}
        >
          <div className="menu-icon">
            <img src={item.icon} />
          </div>
          <div className="menu-text">{item.name}</div>
        </div>
      ))}
    </div>
  );
};

export default NavigationBar;
