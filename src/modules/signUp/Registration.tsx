import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import type ISignUp from '../../types/ISignUp';
import Cubes from '../../components/animations/Cubes';
import { registrationSchema } from './model/registration.shema';
import { useAppDispatch, useAppSelector } from '../../shared/redux';
import { registrationSlice } from './model/registration.slice';
import { submitRegistration } from './model/submitRegistration';

const Registration = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(registrationSlice.selectors.isLoading);
  const isError = useAppSelector(registrationSlice.selectors.isError);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUp>({ resolver: yupResolver(registrationSchema) });

  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit((formData: ISignUp) => {
      dispatch(submitRegistration(formData));
    })();
  };

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
      <div className="sign-container sing-up-container">
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
              placeholder="Выберите имя пользователя"
              {...register('username')}
            />
            {errors.username && (
              <p className="error">{errors.username.message}</p>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Электронная почта
            </label>
            <input
              className="form-input"
              type="email"
              id="email"
              placeholder="Введите вашу почту"
              {...register('email')}
            />
            {errors.email && <p className="error">{errors.email.message}</p>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="password">
                Пароль
              </label>
              <input
                className="form-input"
                type="password"
                id="password"
                placeholder="Создайте пароль"
                {...register('password')}
              />
              {errors.password && (
                <p className="error">{errors.password.message}</p>
              )}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="confirm-password">
                Подтверждение
              </label>
              <input
                className="form-input"
                type="password"
                id="confirm-password"
                placeholder="Повторите пароль"
                {...register('confirmPassword')}
              />
              {errors.confirmPassword && (
                <p className="error">{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>

          <button type="submit" className="btn">
            {!isLoading ? 'ЗАРЕГИСТРИРОВАТЬСЯ' : 'РЕГИСТРАЦИЯ...'}
          </button>
          {isError && <div>Ошибка регистрации</div>}
          <div className="policy-text">
            Регистрируясь, вы соглашаетесь с{' '}
            <a href="#">Условиями использования</a> и{' '}
            <a href="#">Политикой конфиденциальности</a>
          </div>
        </form>
        <div className="divider"></div>
        <div className="register-footer">
          Уже есть аккаунт? <a onClick={() => navigate('/')}>Войти</a>
        </div>
      </div>
    </Cubes>
  );
};

export default Registration;
