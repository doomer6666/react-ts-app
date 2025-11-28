const FriendsUserRow = () => {
  return (
    <div className="user-row">
      <a href="#" className="user-avatar-link">
        <div className="user-avatar">Е</div>
      </a>
      <div className="user-info">
        <a href="#" className="user-name">
          Елена
        </a>
        <div className="user-status">Хочет добавить вас в друзья</div>
      </div>
      <div className="user-actions">
        <button className="action-btn primary">
          <img src="/accept.svg" />
          <span>Принять</span>
        </button>
        <button className="action-btn primary">
          <img src="/message.svg" />
        </button>
        {false && (
          <>
            <button className="action-btn primary">
              <img src="/message.svg" />
              <span>Написать</span>
            </button>
            <button
              className="action-btn destructive"
              title="Удалить из друзей"
            >
              <img src="/close.svg" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default FriendsUserRow;
