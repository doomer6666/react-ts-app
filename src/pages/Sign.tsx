import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import type ISignIn from '../types/ISignIn';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Cubes from '../components/animations/Cubes';
import useSWRMutation from 'swr/mutation';
import poster from '../api/poster';
import type React from 'react';

const Sign = () => {
  const schema = yup.object({
    username: yup.string().required('Введите имя!'),
    password: yup.string().required('Введите пароль!'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignIn>({ resolver: yupResolver(schema) });

  const { trigger, isMutating, error } = useSWRMutation<
    string,
    Error,
    string,
    ISignIn
  >('/auth/login/', poster);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(async (formData) => {
      try {
        console.log(formData);
        await trigger(formData);
        navigate('/profile');
      } catch (e) {
        console.error('Error submitting form:', e);
      }
    })();
  };

  const navigate = useNavigate();

  return (
    <Cubes
      gridSize={10}
      maxAngle={180}
      radius={8}
      autoAnimate={true}
      rippleSpeed={3}
      rippleColor="#b6a3cc"
      rippleOnClick={true}
      trackGlobalEvents={true}
    >
      <div className="sign-container">
        <div className="logo">ПОДЗЕМЕЛЬЕ</div>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="username">
              Имя пользователя
            </label>
            <input
              className="form-input"
              type="text"
              id="username"
              placeholder="Введите имя пользователя"
              {...register('username')}
            />
            {errors.username && (
              <p className="error">{errors.username.message}</p>
            )}
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="password">
              Пароль
            </label>
            <input
              className="form-input"
              type="password"
              id="password"
              placeholder="Введите пароль"
              {...register('password')}
            />
            {errors.password && (
              <p className="error">{errors.password.message}</p>
            )}
            <div className="forgot-password">
              <a href="#">Забыли пароль?</a>
            </div>
          </div>
          <button type="submit" className="btn">
            {!isMutating ? 'ВОЙТИ' : 'ВХОД...'}
          </button>
          {error && <div>Ошибка входа</div>}
        </form>
        <div className="divider"></div>
        <div className="login-footer">
          Нет аккаунта?{' '}
          <a onClick={() => navigate('/registration')}>Зарегистрироваться</a>
        </div>
      </div>
    </Cubes>
  );
};

export default Sign;
