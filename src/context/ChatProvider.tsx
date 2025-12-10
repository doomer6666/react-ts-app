import { type FC, type ReactNode, useEffect, useState } from 'react';
import { ChatContext } from './ChatContext';

interface ChatProviderProps {
  children: ReactNode;
  chatId?: number;
}
export const ChatProvider: FC<ChatProviderProps> = ({
  children,
  chatId = null,
}) => {
  const [activeChat, setActiveChat] = useState<number | null>(chatId);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveChat(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <ChatContext.Provider value={{ activeChat, setActiveChat }}>
      {children}
    </ChatContext.Provider>
  );
};
