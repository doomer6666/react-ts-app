import { type FC, type ReactNode, useState } from 'react';
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
  return (
    <ChatContext.Provider value={{ activeChat, setActiveChat }}>
      {children}
    </ChatContext.Provider>
  );
};
