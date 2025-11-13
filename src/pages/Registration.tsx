import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import type ISignUp from '../types/ISignUp';
import Cubes from '../components/animations/Cubes';
import useSWRMutation from 'swr/mutation';
import poster from '../api/poster';
import type ISignIn from '../types/ISignIn';

const Registration = () => {
  const schema = yup.object({
    username: yup
      .string()
      .required('Введите имя!')
      .min(3, 'Минимум 3 символа')
      .max(50, 'Максимум 50 символов'),
    email: yup
      .string()
      .required('Введите почту!')
      .email('Введите корректный email'),
    password: yup.string().required('Введите пароль!'),
    // .min(3, 'Минимум 8 символов')
    // .matches(/[0-9]/, 'Пароль должен содержать хотя бы одну цифру')
    // .matches(/[A-Z]/, 'Пароль должен содержать хотя бы одну заглавную букву')
    // .matches(/[a-z]/, 'Пароль должен содержать хотя бы одну строчную букву')
    // .matches(
    //   /[^a-zA-Z0-9]/,
    //   'Пароль должен содержать хотя бы один специальный символ',
    // )
    confirmPassword: yup
      .string()
      .required('Подтвердите пароль!')
      .oneOf([yup.ref('password')], 'Пароли не совппадают'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUp>({ resolver: yupResolver(schema) });

  const { trigger, isMutating, error } = useSWRMutation<
    ISignIn,
    Error,
    string,
    ISignUp
  >('/auth/register/', poster);

  const navigate = useNavigate();

  const onSubmit = async (formData: ISignUp) => {
    try {
      console.log(formData);
      await trigger(formData);
      navigate('/profile');
    } catch (e) {
      console.error('Error submitting form:', e);
    }
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
        <form onSubmit={handleSubmit(onSubmit)}>
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
            {!isMutating ? 'ЗАРЕГИСТРИРОВАТЬСЯ' : 'РЕГИСТРАЦИЯ...'}
          </button>
          {error && <div>Ошибка регистрации</div>}
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
