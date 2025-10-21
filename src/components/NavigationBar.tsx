import type { FC } from 'react';
import type INavigationBar from '../types/INavigationBar';
import { useNavigate } from 'react-router-dom';

const NavigationBar: FC<INavigationBar> = ({ activeItem, setActiveItem }) => {
  const navigate = useNavigate();
  const items = [
    { key: 'profile', name: 'Профиль', icon: '/profile.svg' },
    { key: 'feed', name: 'Лента', icon: '/feed.svg' },
    { key: 'message', name: 'Сообщения', icon: '/chat.svg' },
    { key: 'music', name: 'Музыка', icon: '/music.svg' },
    { key: 'settings', name: 'Настройки', icon: '/setting.svg' },
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
