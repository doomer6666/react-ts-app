const PostComposer = () => {
  return (
    <div className="post-composer">
      <div className="composer-header">
        <div className="composer-avatar">А</div>
        <div className="composer-input">Что у вас нового?</div>
      </div>
      <div className="composer-actions">
        <div className="composer-tools">
          <div className="composer-tool">
            <img src="/photo.svg" />
            Фото/видео
          </div>
          <div className="composer-tool">
            <img src="/emoj.svg" />
            Чувства
          </div>
        </div>
        <button className="composer-submit">Опубликовать</button>
      </div>
    </div>
  );
};

export default PostComposer;
