const ChatInput = () => {
  return (
    <div className="chat-input-container">
      <div className="chat-input-wrapper">
        {/* <div className="input-action">📎</div> */}
        <input
          type="text"
          className="chat-input"
          placeholder="Напишите сообщение..."
        />
        <button className="send-button">Отправить</button>
      </div>
    </div>
  );
};

export default ChatInput;
