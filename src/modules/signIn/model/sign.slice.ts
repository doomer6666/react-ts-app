import { type PayloadAction } from '@reduxjs/toolkit';
import { createAppSlice } from '../../../shared/redux';

export type LoginResponse = {
  id: string;
  username: string;
};

export interface SettingsRead {
  user_id: number;
  notifications_enabled: boolean;
  theme: string;
}

export type SignState = {
  isLoading: boolean;
  isError: boolean;
};

const initSignState: SignState = {
  isLoading: false,
  isError: false,
};
export const signSlice = createAppSlice({
  name: 'sign',
  initialState: initSignState,
  selectors: {
    isLoading: (state) => state.isLoading,
    isError: (state) => state.isError,
  },
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.isError = action.payload;
    },
  },
});
