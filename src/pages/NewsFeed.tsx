import { useState, type FC } from 'react';
import type INewsFeed from '../types/NewsFeed/INewsFeed';
import MainLayout from '../layouts/MainLayout';

const NewsFeed: FC<INewsFeed> = ({ news }) => {
  const [activeItem, setActiveItem] = useState('feed');
  const [activeCommentsId, setActiveCommentsId] = useState(0);

  const handleOpenComments = (id: number): void => {
    {
      if (activeCommentsId === id) {
        setActiveCommentsId(0);
      } else {
        setActiveCommentsId(id);
      }
    }
  };

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
          {news.map((item) => (
            <div className="post">
              <div className="post-header">
                <div className="post-avatar">М</div>
                <div>
                  <div className="post-user">{item.user}</div>
                  <div className="post-time">2 часа назад</div>
                </div>
              </div>
              <div className="post-content">
                <div className="post-text">{item.text}</div>
                <div className="post-image">
                  <img src={item.image} />
                </div>
              </div>
              <div className="post-footer">
                <div className="post-action action-like">
                  <div className="post-action-icon">❤️</div>
                  <div>{item.likes}</div>
                </div>
                <div className="post-action action-comment">
                  <div
                    className="post-action-icon"
                    onClick={() => handleOpenComments(item.id)}
                  >
                    💬
                  </div>
                  <div>{item.comments.length}</div>
                </div>
              </div>
              {activeCommentsId === item.id && (
                <ul className="comment-list">
                  {item.comments.map((comment) => (
                    <li key={comment}>{comment}</li>
                  ))}
                </ul>
              )}
            </div>
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
