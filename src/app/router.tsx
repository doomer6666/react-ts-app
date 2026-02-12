import { createBrowserRouter } from 'react-router-dom';
import Registration from '../modules/signUp/Registration';
import Chat from '../modules/chat/Chat';
import Friends from '../modules/friends/Friends';
import Profile from '../modules/profile/Profile';
import NewsFeed from '../modules/feed/NewsFeed';
import Gallery from '../modules/gallery/Gallery';
import Settings from '../modules/settings/Settings';
import Sign from '../modules/signIn/Sign';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Sign />,
  },
  {
    path: '/registration',
    element: <Registration />,
  },
  {
    path: '/feed',
    element: <NewsFeed />,
  },
  {
    path: '/profile/:profileId',
    element: <Profile />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/friends',
    element: <Friends />,
  },
  {
    path: '/message',
    element: <Chat />,
  },
  {
    path: '/settings',
    element: <Settings />,
  },
  {
    path: '/gallery/:userId',
    element: <Gallery />,
  },
]);
