import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import type IPostComposer from '../../types/IPostComposer';
import useSWRMutation from 'swr/mutation';
import poster from '../../api/poster';
import { useState, useEffect } from 'react';
import PhotoUploader from './PhotoUploader';
import ModalUploader from './ModalUploader';

interface PostComposerProps {
  mutate?: () => void;
  initialContent?: string;
  initialImgUrl?: string;
  onComplete?: (payload: IPostComposer) => void | Promise<any>;
  onCancel?: () => void;
  submitLabel?: string;
  AvatarLetter?: string;
}

const PostComposer: React.FC<PostComposerProps> = ({
  mutate,
  initialContent,
  initialImgUrl,
  onComplete,
  onCancel,
  submitLabel,
  AvatarLetter,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadedInfo, setUploadedInfo] = useState<{
    filepath?: string;
  } | null>(null);

  useEffect(() => {
    if (initialImgUrl) {
      setUploadedInfo({ filepath: initialImgUrl });
    }
  }, [initialImgUrl]);

  const schema = yup.object({
    content: yup
      .string()
      .matches(/^[a-zA-Z0-9а-яА-Я_ !,.?]+$/, 'Только буквы, цифры и подчеркивания')
      .required('Введите текст'),
  });

  const { trigger, isMutating, error } = useSWRMutation<string, Error, string, IPostComposer>('/posts/', poster);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IPostComposer>({ resolver: yupResolver(schema), defaultValues: { content: initialContent || '' } });

  const composerSubmit = async (formData: IPostComposer) => {
    try {
      const payload: IPostComposer = {
        content: formData.content,
        imgUrl: uploadedInfo?.filepath || undefined,
      };

      if (onComplete) {
        await onComplete(payload);
        reset();
        setUploadedInfo(null);
        if (onCancel) onCancel();
        return;
      }

      await trigger(payload);
      reset();
      setUploadedInfo(null);
      if (mutate) mutate();
    } catch (err) {
      console.error('Ошибка отправки', err);
    }
  };

  return (
    <form className="post-composer" onSubmit={handleSubmit(composerSubmit)}>
      {error && <div>Ошибка. Зайдите позже</div>}
      <div className="composer-header">
        <div className="composer-avatar">{AvatarLetter || 'A'}</div>
        <textarea
          className="composer-input"
          placeholder="Что у вас нового?"
          id="content"
          {...register('content')}
        />
      </div>

      {errors.content && <p className="error">{errors.content.message}</p>}

      {uploadedInfo?.filepath && !isModalOpen && (
        <div className="composer-image-preview">
          <img src={'http://localhost:8000/' + uploadedInfo.filepath} />
          <button
            type="button"
            className="remove-image"
            onClick={() => setUploadedInfo(null)}
          >
            <img src="./close.svg" />
          </button>
        </div>
      )}

      <div className="composer-actions">
        <div className="composer-tools">
          <button
            className="composer-tool file-upload"
            onClick={() => setIsModalOpen(true)}
            type="button"
          >
            <img src="/photo.svg" alt="Загрузить медиа" />
            <span>Фото</span>
          </button>
        </div>

        <div>
          {onCancel && (
            <button type="button" className="btn-cancel" onClick={() => { reset(); setUploadedInfo(null); if (onCancel) onCancel(); }}>
              Отмена
            </button>
          )}

          <button type="submit" className="composer-submit">
            {submitLabel ? submitLabel : !isMutating ? 'Опубликовать' : 'Опубликовано'}
          </button>
        </div>
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
          />
        </ModalUploader>
      )}
    </form>
  );
};

export default PostComposer;
