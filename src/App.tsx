// App.tsx
import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sign from './pages/Sign.tsx';
import Registration from './pages/Registration.tsx';
import Profile from './pages/Profile.tsx';
import Chat from './pages/Chat.tsx';
import Friends from './pages/Friends.tsx';
import Settings from './pages/Settings.tsx';
import NewsFeed from './pages/NewsFeed.tsx';

function App() {
  useEffect(() => {
    const theme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', theme);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Sign />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/feed" element={<NewsFeed />} />
        <Route path="/profile/:profileId" element={<Profile />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/message" element={<Chat />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
