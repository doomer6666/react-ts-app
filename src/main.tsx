import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import NewsFeed from './pages/NewsFeed.tsx';
import mockNews from './mocks/mockNews.ts';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sign from './pages/Sign.tsx';
import Registration from './pages/Registration.tsx';
import Profile from './pages/Profile.tsx';
import mockUserData from './mocks/mockUserData.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Sign />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/feed" element={<NewsFeed posts={mockNews} />} />
        <Route path="/profile" element={<Profile user={mockUserData} />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
