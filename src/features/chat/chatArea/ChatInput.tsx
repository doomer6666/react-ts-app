import useSWRMutation from 'swr/mutation';
import poster from '../../../api/poster';
import { useState } from 'react';
import { useChat } from '../../../context/ChatContext';

const ChatInput = () => {
  const chatContext = useChat();
  const [inputMessage, setInputMessage] = useState('');
  const { trigger, isMutating, error } = useSWRMutation<
    string,
    Error,
    string,
    { content: string }
  >(`/chats/${chatContext?.activeChat}/messages`, poster);

  if (error) {
    return;
  }

  const onSubmit = async () => {
    const data = { content: inputMessage };
    await trigger(data);
    setInputMessage('');
  };
  return (
    <div className="chat-input-container">
      <div className="chat-input-wrapper">
        {/* <div className="input-action">📎</div> */}
        <input
          type="text"
          className="chat-input"
          placeholder="Напишите сообщение..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button
          className="send-button"
          onClick={onSubmit}
          disabled={!inputMessage?.trim()}
        >
          {isMutating ? 'Отправка...' : 'Отправить'}
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
