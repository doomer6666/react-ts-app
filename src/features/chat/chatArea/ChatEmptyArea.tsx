const ChatEmptyArea = () => {
  return (
    <div className="empty-chat">
      <img src="./letter.svg" />
      <div className="empty-chat-text">Выберите чат или создайте новый</div>
      <button className="create-chat-btn">Создать чат</button>
    </div>
  );
};

export default ChatEmptyArea;
