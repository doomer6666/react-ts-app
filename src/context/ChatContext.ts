import { createContext, useContext } from 'react';

interface IChatContext {
  activeChat: number | null;
  setActiveChat: React.Dispatch<React.SetStateAction<number | null>>;
}

export const ChatContext = createContext<IChatContext | null>(null);

export const useChat = () => {
  const context = useContext(ChatContext);

  if (!context) {
    throw new Error('useChat must be used within a ChatContext.Provider');
  }
  return context;
};
