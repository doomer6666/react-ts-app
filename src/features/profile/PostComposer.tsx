import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import type IPostComposer from '../../types/IPostComposer';
import useSWRMutation from 'swr/mutation';
import poster from '../../api/poster';

const PostComposer = () => {
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
          <label className="composer-tool file-upload">
            <input type="file" hidden />
            <img src="/photo.svg" alt="Загрузить медиа" />
            <span>Фото</span>
          </label>
        </div>

        <button type="submit" className="composer-submit">
          {!isMutating ? 'Опубликовать' : 'Опубликовано'}
        </button>
      </div>
    </form>
  );
};

export default PostComposer;
