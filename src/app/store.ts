import { configureStore } from '@reduxjs/toolkit';
import api from '../api/axiosInstance';
import { router } from './router';
import { signSlice } from '../modules/signIn/model/sign.slice';
import { registrationSlice } from '../modules/signUp/model/registration.slice';

export const extraArgument = {
  api,
  storage: localStorage,
  router,
};

export const store = configureStore({
  reducer: {
    [signSlice.name]: signSlice.reducer,
    [registrationSlice.name]: registrationSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: { extraArgument } }),
});
