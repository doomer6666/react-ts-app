import { type PayloadAction } from '@reduxjs/toolkit';
import { createAppSlice } from '../../../shared/redux';
import type { SignState } from '../../signIn';

const initRegState: SignState = {
  isLoading: false,
  isError: false,
};

export const registrationSlice = createAppSlice({
  name: 'reg',
  initialState: initRegState,
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
