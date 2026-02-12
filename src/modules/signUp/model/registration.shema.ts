import * as yup from 'yup';

export const registrationSchema = yup.object({
  username: yup
    .string()
    .required('Введите имя!')
    .min(3, 'Минимум 3 символа')
    .max(50, 'Максимум 50 символов'),
  email: yup
    .string()
    .required('Введите почту!')
    .email('Введите корректный email'),
  password: yup
    .string()
    .required('Введите пароль!')
    .min(3, 'Минимум 8 символов')
    .matches(/[0-9]/, 'Пароль должен содержать хотя бы одну цифру')
    .matches(/[A-Z]/, 'Пароль должен содержать хотя бы одну заглавную букву')
    .matches(/[a-z]/, 'Пароль должен содержать хотя бы одну строчную букву')
    .matches(
      /[^a-zA-Z0-9]/,
      'Пароль должен содержать хотя бы один специальный символ',
    ),
  confirmPassword: yup
    .string()
    .required('Подтвердите пароль!')
    .oneOf([yup.ref('password')], 'Пароли не совппадают'),
});
