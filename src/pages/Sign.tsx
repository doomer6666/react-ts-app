import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import type ISignIn from '../types/ISignIn';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Cubes from '../components/animations/Cubes';
import type React from 'react';
import api from '../api/axiosInstance';
import { useState } from 'react';

interface LoginResponse {
  id: string;
  username: string;
}

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

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(async (formData) => {
      try {
        setIsLoading(!isLoading);
        const response = await api.post('/auth/login/', formData);
        const loginResponse: LoginResponse = response.data;
        localStorage.setItem('id', loginResponse.id);
        localStorage.setItem('name', loginResponse.username);
        navigate('/profile');
      } catch (e) {
        setIsError(true);
        console.error('Error submitting form:', e);
      } finally {
        setIsLoading(!isLoading);
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
            {!isLoading ? 'ВОЙТИ' : 'ВХОД...'}
          </button>
          {isError && <div>Ошибка входа</div>}
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
