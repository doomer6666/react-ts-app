import { useContext } from 'react';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';
import { ChatContext } from '../../../pages/Chat';

const ChatArea = () => {
  const chatContext = useContext(ChatContext);
  return (
    <div className="chat-area">
      {chatContext?.activeChat ? (
        <>
          <ChatHeader name="Олег" />

          <div className="chat-messages">
            {/* <div className="message-date">Сегодня</div> */}
            <ChatMessage
              direction={'sent'}
              name={'Уээ'}
              message={'УЭээээээээ'}
              time={'2025-10-13T09:45:00.000Z'}
            />
          </div>
          <ChatInput />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ChatArea;
