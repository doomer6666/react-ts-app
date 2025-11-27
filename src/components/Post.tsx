import { useState, useRef, type FC } from 'react';
import type PostProps from '../types/IPost';
import getTimeAgo from '../utils/getTimeAgo';
import ModalUser from '../features/feed/ModalUser';
import ModalUploader from '../features/profile/ModalUploader';
import PostComposer from '../features/profile/PostComposer';
import api from '../api/axiosInstance';

const Post: FC<PostProps & { mutate?: () => void | Promise<any> }> = ({ item, openUserInfo, mutate }) => {
  const [openModal, setOpenModal] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [isOpemComments, setIsOpenComments] = useState(false);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);
  const [commentText, setCommentText] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [commentError, setCommentError] = useState<string | null>(null);
  const optionsRef = useRef<HTMLDivElement | null>(null);

  const [likesCount, setLikesCount] = useState<number>(item.likes || 0);
  const [isLiked, setIsLiked] = useState<boolean>(item.isLiked || false);

  const avatarLetter: string = item.user[0];
  const timeAgo = getTimeAgo(item.postTime);

  const handleOpenUserModal = () => {
    if (!openUserInfo) {
      return;
    }
    setOpenModal(true);
  };

  const startEdit = () => {
    setIsOptionsOpen(false);
    setEditError(null);
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditError(null);
  };

  const handleEditComplete = async (payload: { content: string; imgUrl?: string }) => {
    try {
      const body: any = { text: payload.content };
      if (payload.imgUrl) body.image = payload.imgUrl;
      else body.image = null;

      await api.patch('/posts/' + item.id, body);
      if (mutate) await mutate();
      setIsEditing(false);
    } catch (e: any) {
      if (e && e.message) {
        setEditError(e.message);
        return;
      }
      console.error('Failed to update post', e);
    }
  };

  const confirmDelete = async () => {
    setOpenModalDelete(false);
    try {
      await api.delete('/posts/' + item.id);
      if (mutate) await mutate();
    } catch (e) {
      console.error('Failed to delete post', e);
    }
  };

  const submitComment = async () => {
    setCommentError(null);
    if (!commentText.trim()) {
      setCommentError('Введите текст комментария');
      return;
    }
    setIsSubmittingComment(true);
    try {
      await api.post(`/comments`, { postId: item.id, content: commentText.trim() });
      setCommentText('');
      if (mutate) await mutate();
    } catch (err) {
      console.error('Failed to send comment', err);
      setCommentError('Ошибка отправки комментария');
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const toggleLike = async () => {
    const prevLiked = isLiked;
    setIsLiked(!prevLiked);
    setLikesCount((c) => (prevLiked ? c - 1 : c + 1));

    try {
      if (!prevLiked) {
        await api.post(`/likes/`, { postId: item.id });
      } else {
        await api.delete(`/likes/${item.id}`);
      }
      // if (mutate) await mutate();
    } catch (err) {
      setIsLiked(prevLiked);
      setLikesCount((c) => (prevLiked ? c + 1 : c - 1));
      console.error('Failed to toggle like', err);
    }
  };

  return (
    <div className="post">
      <div className="post-header" onClick={handleOpenUserModal}>
        <div className="post-avatar">{avatarLetter}</div>
        <div>
          <div className="post-user">{item.user}</div>
          <div className="post-time">{timeAgo}</div>
        </div>

        <button
          className="post-options-button"
          onClick={() => {
            setIsOptionsOpen((s) => !s);
          }}
          aria-label="Post options"
        >
          ...
        </button>

        {isOptionsOpen && (
          <div className="post-options-menu" ref={optionsRef}>
            <button
              className="post-options-item"
              onClick={() => startEdit()}
            >
              Редактировать
            </button>
            <button
              className="post-options-item delete"
              onClick={() => {
                setIsOptionsOpen(false);
                setOpenModalDelete(true);
              }}
            >
              Удалить
            </button>
          </div>
        )}
      </div>

      <div className="post-content">
        {!isEditing && <div className="post-text">{item.text}</div>}

        {isEditing && (
          <div>
            <PostComposer
              initialContent={item.text}
              initialImgUrl={item.image || undefined}
              onComplete={handleEditComplete}
              onCancel={cancelEdit}
              submitLabel="Сохранить"
              AvatarLetter={avatarLetter}
            />
            {editError && <div className="error">{editError}</div>}
          </div>
        )}

        {!isEditing && item.image && (
          <div className="post-image">
            <img src={'http://localhost:8000/' + item.image} />
          </div>
        )}
      </div>

      <div className="post-footer">
        <div
          className={`post-action action-like ${isLiked ? 'liked' : ''}`}
          onClick={toggleLike}
        >
          <div className="post-action-icon">
            <img src="/like.svg" alt="like" />
          </div>
          <div>{likesCount}</div>
        </div>
        <div className="post-action action-comment" onClick={() => setIsOpenComments(!isOpemComments)}>
          <div className="post-action-icon">
            <img src="/comment.svg" />
          </div>
          <div>{item.comments.length}</div>
        </div>
      </div>

      {isOpemComments && (
        <div className="comments-section">
          <ul className="comment-list">
            {item.comments && item.comments.length > 0 ? (
              item.comments.map((comment: any) => (
                <li className="comment-item" key={comment.id}>
                  <div className="comment-avatar">{comment.username?.[0] || 'A'}</div>
                  <div className="comment-body">
                    <div className="comment-meta">
                      <span className="comment-username">{comment.username}</span>
                      <span className="comment-time">{getTimeAgo(comment.createdAt)}</span>
                    </div>
                    <div className="comment-content">{comment.content}</div>
                  </div>
                </li>
              ))
            ) : (
              <li className="comment-empty">Нет комментариев</li>
            )}
          </ul>

          <form className="comment-form" onSubmit={(e) => { e.preventDefault(); submitComment(); }}>
            <div className="comment-input-wrap">
              <div className="comment-input-avatar">{avatarLetter}</div>
              <input
                className="comment-input"
                placeholder="Написать комментарий..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
            </div>
            <button className="comment-submit" type="button" onClick={(e) => { e.stopPropagation(); submitComment(); }} disabled={isSubmittingComment}>
              {isSubmittingComment ? '...' : 'Отправить'}
            </button>
          </form>
          {commentError && <div className="error">{commentError}</div>}
        </div>
      )}

      {openModal && (
        <ModalUser
          name={item.user}
          avatarLetter={avatarLetter}
          onClose={() => setOpenModal(false)}
        />
      )}

      {openModalDelete && (
        <ModalUploader
          title="Удалить пост"
          confirmText="Удалить"
          cancelText="Отмена"
          onConfirm={confirmDelete}
          onClose={() => {
            setOpenModalDelete(false);
          }}
        >
          <div>Вы уверены, что хотите удалить этот пост?</div>
        </ModalUploader>
      )}
    </div>
  );
};

export default Post;
