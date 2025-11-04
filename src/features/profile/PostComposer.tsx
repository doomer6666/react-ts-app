import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import type IPostComposer from '../../types/IPostComposer';
import useSWRMutation from 'swr/mutation';
import poster from '../../api/poster';
import Modal from '../Modal';
import PhotoUploader from '../PhotoUploader';
import { useState } from 'react';


const PostComposer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
  const [uploadedInfo, setUploadedInfo] = useState<any>(null);
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
  } = useForm<IPostComposer>({ resolver: yupResolver(schema) });

  const composerSubmit = async (formData: IPostComposer) => {
    try {
      await trigger(formData);
      console.log(formData);
    } catch {
      console.error('Ошибка отправки');
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
        {errors.content && <p className="error">{errors.content.message}</p>}
      </div>
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
        confirmText="Загрузить"
        cancelText="Отмена"
        onConfirm={() => {
          alert("Удалено!");
          setIsModalOpen(false);
        }}
        onClose={() => setIsModalOpen(false)}
      >
        <PhotoUploader
          onUploadComplete={(data) => {
            console.log("Загружено:", data);
            setUploadedInfo(data);
          }}
        />
      </Modal>
    </form>
  );
};

export default PostComposer;
