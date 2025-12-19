import useSWRMutation from 'swr/mutation';
import poster from '../../../api/poster';
import { useState } from 'react';
import { useChat } from '../../../context/ChatContext';
import useEnterKey from '../../../hooks/useKeyDown';
import { useSWRConfig } from 'swr';
import ModalUploader from '../../profile/ModalUploader';
import PhotoUploader from '../../profile/PhotoUploader';
import settings from '../../../api/config';

const ChatInput = () => {
  const chatContext = useChat();
  const [inputMessage, setInputMessage] = useState('');
  const { mutate } = useSWRConfig();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadedInfo, setUploadedInfo] = useState<{ filepath: string } | null>(
    null,
  );

  const { trigger, isMutating, error } = useSWRMutation<
    string,
    Error,
    string,
    { content: string }
  >(`/chats/${chatContext?.activeChat}/messages`, poster);

  const onSubmit = async () => {
    const data = { content: inputMessage, imageUrl: uploadedInfo?.filepath };
    await trigger(data);
    setUploadedInfo(null);
    setInputMessage('');
    await mutate('/chats/');
  };

  const onKeyDown = useEnterKey(onSubmit);

  if (error) {
    return;
  }

  return (
    <div className="chat-input-container" onKeyDown={onKeyDown}>
      {uploadedInfo?.filepath && !isModalOpen && (
        <div className="composer-image-preview">
          <img src={settings.apiBaseUrl + uploadedInfo.filepath} />
          <button
            type="button"
            className="remove-image"
            onClick={() => setUploadedInfo(null)}
          >
            <img src="./close.svg" />
          </button>
        </div>
      )}
      <div className="chat-input-wrapper">
        <div className="input-action" onClick={() => setIsModalOpen(true)}>
          📎
        </div>
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
      {isModalOpen && (
        <ModalUploader
          title="Загрузить фото"
          confirmText="Готово"
          cancelText="Отмена"
          onConfirm={() => setIsModalOpen(false)}
          onClose={() => {
            setIsModalOpen(false);
            setUploadedInfo(null);
          }}
        >
          <PhotoUploader
            onUploadComplete={(data) => {
              setUploadedInfo({ filepath: data.filepath });
              
            }}
            isPrivate={true}
          />
        </ModalUploader>
      )}
    </div>
  );
};

export default ChatInput;
