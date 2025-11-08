import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import NewsFeed from './pages/NewsFeed.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sign from './pages/Sign.tsx';
import Registration from './pages/Registration.tsx';
import Profile from './pages/Profile.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Sign />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/feed" element={<NewsFeed />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
