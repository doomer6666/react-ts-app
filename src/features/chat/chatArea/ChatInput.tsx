import useSWRMutation from 'swr/mutation';
import poster from '../../../api/poster';
import { useState } from 'react';
import { useChat } from '../../../context/ChatContext';
import useEnterKey from '../../../hooks/useKeyDown';
import { useSWRConfig } from 'swr';

const ChatInput = () => {
  const chatContext = useChat();
  const [inputMessage, setInputMessage] = useState('');
  const { mutate } = useSWRConfig();

  const { trigger, isMutating, error } = useSWRMutation<
    string,
    Error,
    string,
    { content: string }
  >(`/chats/${chatContext?.activeChat}/messages`, poster);

  const onSubmit = async () => {
    const data = { content: inputMessage };
    await trigger(data);
    setInputMessage('');
    await mutate('/chats/');
  };

  const onKeyDown = useEnterKey(onSubmit);

  if (error) {
    return;
  }

  return (
    <div className="chat-input-container" onKeyDown={onKeyDown}>
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
