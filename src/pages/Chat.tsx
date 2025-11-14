import { createContext, useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import ChatList from '../features/chat/chatList/ChatList';
import ChatArea from '../features/chat/chatArea/ChatArea';

interface IChatContext {
  activeChat: string | null;
  setActiveChat: React.Dispatch<React.SetStateAction<string | null>>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const ChatContext = createContext<IChatContext | null>(null);

const Chat = () => {
  const [activeItem, setActiveItem] = useState('message');
  const [activeChat, setActiveChat] = useState<string | null>(null);

  return (
    <MainLayout
      pageName={'chat'}
      activeItem={activeItem}
      setActiveItem={setActiveItem}
    >
      <ChatContext.Provider value={{ activeChat, setActiveChat }}>
        <ChatList />
        <ChatArea />
      </ChatContext.Provider>
    </MainLayout>
  );
};

export default Chat;
