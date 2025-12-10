import { useMemo, useState, type FC } from 'react';
import MainLayout from '../layouts/MainLayout';
import Post from '../components/Post';
import useSWR from 'swr';
import { fetcher } from '../api/fetcher';
import type { IPost } from '../types/IPost';

const NewsFeed: FC = () => {
  const [activeItem, setActiveItem] = useState('feed');
  const [filterInput, setFilterInput] = useState('');
  const { data, error, isLoading, mutate } = useSWR<IPost[]>(
    '/posts/',
    fetcher,
    {
      revalidateOnFocus: true,
      shouldRetryOnError: false,
    },
  );

  const filteredData: IPost[] = useMemo(() => {
    return (
      data?.filter(
        (item) =>
          item.text.toLowerCase().includes(filterInput.toLowerCase().trim()) ||
          item.user.toLowerCase().includes(filterInput.toLowerCase().trim()),
      ) || []
    );
  }, [data, filterInput]);

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
            <input
              type="text"
              placeholder="Поиск"
              value={filterInput}
              onChange={(e) => setFilterInput(e.target.value)}
            />
          </div>
        </div>
        <div className="feed">
          {filteredData?.map((item) => (
            <Post item={item} mutate={mutate} />
          ))}
          {filteredData.length === 0 && data && data.length > 0 && (
            <div>Ничего не найдено по запросу "{filterInput}"</div>
          )}
        </div>
      </div>
      {isLoading && <div className="post-text">Идет загрузка</div>}
    </MainLayout>
  );
};

export default NewsFeed;
