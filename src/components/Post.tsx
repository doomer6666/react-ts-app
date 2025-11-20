import { useState, type FC } from 'react';
import type PostProps from '../types/IPost';
import getTimeAgo from '../utils/getTimeAgo';
import ModalUser from '../features/feed/ModalUser';
import ModalUploader from '../features/profile/ModalUploader';
import api from '../api/axiosInstance';

const Post: FC<PostProps & { mutate?: () => void | Promise<any> }> = ({ item, openUserInfo, mutate }) => {
  const [openModal, setOpenModal] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [isOpemComments, setIsOpenComments] = useState(false);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const avatarLetter: string = item.user[0];
  const timeAgo = getTimeAgo(item.postTime);

  const handleOpenUserModal = () => {
    if (!openUserInfo) {
      return;
    }
    setOpenModal(true);
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
          <div className="post-options-menu">
            <button
              className="post-options-item"
              onClick={() => {
                console.log('Delete post', item.id);
                setIsOptionsOpen(false);
                setOpenModalDelete(true);
              }}
            >
              Редактировать
            </button>
            <button
              className="post-options-item delete"
              onClick={() => {
                console.log('Delete post', item.id);
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
        <div className="post-text">{item.text}</div>
        {item.image && (
          <div className="post-image">
            <img src={'http://localhost:8000/' + item.image} />
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
          onConfirm={async () => {
            setOpenModalDelete(false);
            try {
              await api.delete('/posts/' + item.id);
              if (mutate) {
                await mutate();
              }
            } catch (e) {
              console.error('Failed to delete post', e);
            }
          }}
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
