import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import Cubes from '../../components/animations/Cubes';
import useEnterKey from '../../hooks/useKeyDown';
import type ISignIn from '../../types/ISignIn';
import { signSchema } from './model/singshema';
import { signSlice } from './model/sign.slice';
import { useAppDispatch, useAppSelector } from '../../shared/redux';
import { submitSign } from './model/submitSign';

const Sign = () => {
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector(signSlice.selectors.isLoading);
  const isError = useAppSelector(signSlice.selectors.isError);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignIn>({ resolver: yupResolver(signSchema) });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit((data: ISignIn) => {
      dispatch(submitSign(data));
    })();
  };

  const onKeyDown = useEnterKey(onSubmit);
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
        <form onSubmit={onSubmit} onKeyDown={onKeyDown}>
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
