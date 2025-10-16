import type { FC } from 'react';
import type INavigationBar from '../types/INavigationBar';

const NavigationBar: FC<INavigationBar> = ({ activeItem, setActiveItem }) => {
  const items = [
    { key: 'profile', name: 'Профиль', icon: '👤' },
    { key: 'feed', name: 'Лента', icon: '🔱' },
    { key: 'message', name: 'Сообщения', icon: '✉️' },
    { key: 'music', name: 'Музыка', icon: '🎵' },
    { key: 'settings', name: 'Настройки', icon: '⚙️' },
  ];

  return (
    <div className="sidebar">
      <div className="logo">ПОДЗЕМЕЛЬЕ</div>
      {items.map((item) => (
        <div
          key={item.key}
          className={`menu-item ${item.key === activeItem ? 'active' : ''}`}
          onClick={() => setActiveItem(item.key)}
        >
          <div className="menu-icon">{item.icon}</div>
          <div className="menu-text">{item.name}</div>
        </div>
      ))}
    </div>
  );
};

export default NavigationBar;
