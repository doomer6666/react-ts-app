import { useState, type FC } from 'react';
import MainLayout from '../layouts/MainLayout';
import Post from '../components/Post';
import useSWR from 'swr';
import { fetcher } from '../api/fetcher';
import type { IPost } from '../types/IPost';

const NewsFeed: FC = () => {
  const [activeItem, setActiveItem] = useState('feed');

  const { data, error, isLoading } = useSWR<IPost[]>('/posts/', fetcher, {
    revalidateOnFocus: true,
    shouldRetryOnError: false,
  });

  if (error) {
    return <div>Ошибка, зайдите позже</div>;
  }

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
          {data?.map((item) => (
            <Post item={item} openUserInfo={true} />
          ))}
        </div>
      </div>
      {isLoading && <div className="post-text">Идет загрузка</div>}
    </MainLayout>
  );
};

export default NewsFeed;
