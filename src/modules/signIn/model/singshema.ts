import * as yup from 'yup';

export const signSchema = yup.object({
  username: yup.string().required('Введите имя!'),
  password: yup.string().required('Введите пароль!'),
});
