import { useState, type FC } from 'react';
import MainLayout from '../layouts/MainLayout';
import Post from '../components/Post';
import type FeedProps from '../types/IFeed';

const NewsFeed: FC<FeedProps> = ({ posts }) => {
  const [activeItem, setActiveItem] = useState('feed');
  return (
    <MainLayout
      activeItem={activeItem}
      setActiveItem={setActiveItem}
      pageName="news-feed"
    >
      <div className="content-area">
        <div className="header">
          <div className="search-bar">
            <span className="search-icon">🔍</span>
            <input type="text" placeholder="Поиск" />
          </div>
        </div>
        <div className="feed">
          {posts.map((item) => (
            <Post item={item} />
          ))}
        </div>
      </div>

      {/* <div className="sidebar-right">
        <div className="trending-header">
          <span className="trending-header-icon">✨</span>
          ПРОРОЧЕСТВА
        </div>

        <div className="trending-item">
          <div className="trending-tag">#Тартар</div>
          <div className="trending-title">Новые комнаты испытаний от Аида</div>
          <div className="trending-stats">666 упоминаний</div>
        </div>

        <div className="trending-item">
          <div className="trending-tag">#Олимп</div>
          <div className="trending-title">
            Зевс объявил о новых дарах смертным
          </div>
          <div className="trending-stats">432 упоминания</div>
        </div>

        <div className="trending-item">
          <div className="trending-tag">#Битвы</div>
          <div className="trending-title">
            Лучшее оружие для прохождения Асфодела
          </div>
          <div className="trending-stats">789 упоминаний</div>
        </div>

        <div className="trending-item">
          <div className="trending-tag">#Нектар</div>
          <div className="trending-title">
            Кому дарить подарки: рейтинг благосклонности
          </div>
          <div className="trending-stats">321 упоминание</div>
        </div>
      </div> */}
    </MainLayout>
  );
};

export default NewsFeed;
