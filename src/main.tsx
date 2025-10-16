import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import NewsFeed from './pages/NewsFeed.tsx';
import mockNews from './mocks/mockNews.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NewsFeed news={mockNews} />
  </StrictMode>,
);
