import { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import ChatList from '../features/chat/chatList/ChatList';
import ChatArea from '../features/chat/chatArea/ChatArea';
import { useLocation } from 'react-router-dom';
import { ChatProvider } from '../context/ChatProvider';

const Chat = () => {
  const location = useLocation();
  const state = location.state;
  const [activeItem, setActiveItem] = useState('message');

  return (
    <MainLayout
      pageName={'chat'}
      activeItem={activeItem}
      setActiveItem={setActiveItem}
    >
      <ChatProvider chatId={state.chatId}>
        <ChatList />
        <ChatArea />
      </ChatProvider>
    </MainLayout>
  );
};

export default Chat;
