// App.tsx
import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Registration from '../modules/signUp/Registration.tsx';
import Profile from '../modules/profile/Profile.tsx';
import Chat from '../modules/chat/Chat.tsx';
import Friends from '../modules/friends/Friends.tsx';
import NewsFeed from '../modules/feed/NewsFeed.tsx';
import Gallery from '../modules/gallery/Gallery.tsx';
import Settings from '../modules/settings/Settings.tsx';
import Sign from '../modules/signIn/Sign.tsx';

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
        <Route path="/gallery/:userId" element={<Gallery />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
