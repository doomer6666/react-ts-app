import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import type IPostComposer from '../../types/IPostComposer';
import useSWRMutation from 'swr/mutation';
import poster from '../../api/poster';
import Modal from '../Modal';
import PhotoUploader from '../PhotoUploader';
import { useState } from 'react';

interface PostComposerProps {
  mutate: () => void;
}

const PostComposer: React.FC<PostComposerProps> = ({mutate}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadedInfo, setUploadedInfo] = useState<{ filepath?: string } | null>(null);

  const schema = yup.object({
    content: yup
      .string()
      .matches(/^[a-zA-Z0-9а-яА-Я_]+$/, 'Только буквы, цифры и подчеркивания')
      .required('Введите текст'),
  });

  const { trigger, isMutating, error } = useSWRMutation<
    string,
    Error,
    string,
    IPostComposer
  >('/posts/', poster);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IPostComposer>({ resolver: yupResolver(schema) });

  const composerSubmit = async (formData: IPostComposer) => {
    try {
      const payload: IPostComposer = {
        content: formData.content,
        imgUrl: uploadedInfo?.filepath || undefined,
      };

      await trigger(payload);
      console.log("Отправлено:", payload);
      reset();
      setUploadedInfo(null);
      mutate();
    } catch {
      console.error("Ошибка отправки");
    }
  };

  return (
    <form className="post-composer" onSubmit={handleSubmit(composerSubmit)}>
      {error && <div>Ошибка. Зайдите позже</div>}
      <div className="composer-header">
        <div className="composer-avatar">А</div>
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
          <img src={"http://localhost:8000/"+uploadedInfo.filepath}/>
          <button
            type="button"
            className="remove-image"
            onClick={() => setUploadedInfo(null)}
          >
            x
          </button>
        </div>
      )}

      <div className="composer-actions">
        <div className="composer-tools">
          <button className="composer-tool file-upload" onClick={() => setIsModalOpen(true)} type="button">
            <img src="/photo.svg" alt="Загрузить медиа" />
            <span>Фото</span>
          </button>
        </div>

        <button type="submit" className="composer-submit">
          {!isMutating ? 'Опубликовать' : 'Опубликовано'}
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        title="Загрузить фото"
        confirmText="Готово"
        cancelText="Отмена"
        onConfirm={() => setIsModalOpen(false)}
        onClose={() => {
          setIsModalOpen(false)
          setUploadedInfo(null);
        }}
      >
        <PhotoUploader
          onUploadComplete={(data) => {
            console.log("Загружено:", data);
            setUploadedInfo({ filepath: data.filepath });
          }}
        />
      </Modal>
    </form>
  );
};

export default PostComposer;
