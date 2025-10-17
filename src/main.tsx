import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import NewsFeed from './pages/NewsFeed.tsx';
import mockNews from './mocks/mockNews.ts';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sign from './pages/Sign.tsx';
import Registration from './pages/Registration.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Sign />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/feed" element={<NewsFeed news={mockNews} />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
