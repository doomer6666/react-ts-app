import { useState, type FC } from 'react';
import type PostProps from '../types/IPost';
import getTimeAgo from '../utils/getTimeAgo';

const Post: FC<PostProps> = ({ item }) => {
  const [isOpemComments, setIsOpenComments] = useState(false);
  const avatarLetter = item.user[0];
  const timeAgo = getTimeAgo(item.postTime);
  return (
    <div className="post">
      <div className="post-header">
        <div className="post-avatar">{avatarLetter}</div>
        <div>
          <div className="post-user">{item.user}</div>
          <div className="post-time">{timeAgo}</div>
        </div>
      </div>
      <div className="post-content">
        <div className="post-text">{item.text}</div>
        {item.image && (
          <div className="post-image">
            <img src={"http://localhost:8000/"+item.image} />
          </div>
        )}
      </div>
      <div className="post-footer">
        <div className="post-action action-like">
          <div className="post-action-icon">
            <img src="/like.svg" />
          </div>
          <div>{item.likes}</div>
        </div>
        <div className="post-action action-comment">
          <div
            className="post-action-icon"
            onClick={() => setIsOpenComments(!isOpemComments)}
          >
            <img src="/comment.svg" />
          </div>
          <div>{item.comments.length}</div>
        </div>
      </div>
      {isOpemComments && (
        <ul className="comment-list">
          {item.comments.map((comment) => (
            <li key={comment}>{comment}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Post;
