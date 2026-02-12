import {
  asyncThunkCreator,
  buildCreateSlice,
  combineSlices,
  createAsyncThunk,
  createSelector,
  type ThunkAction,
  type UnknownAction,
} from '@reduxjs/toolkit';
import { useDispatch, useSelector, useStore } from 'react-redux';
import type { extraArgument, store } from '../app/store';

export const rootReducer = combineSlices();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AppState = any;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<R = void> = ThunkAction<
  R,
  AppState,
  typeof extraArgument,
  UnknownAction
>;

export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<AppState>();
export const useAppStore = useStore.withTypes<AppState>();
export const createAppSelector = createSelector.withTypes<AppState>();
export const createAppAsyncThunk = createAsyncThunk.withTypes<AppState>();

export type ExtraArgument = typeof extraArgument;

export const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});
