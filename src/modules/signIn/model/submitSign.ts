import type { AppThunk } from '../../../shared/redux';
import type ISignIn from '../../../types/ISignIn';
import { signSlice, type LoginResponse, type SettingsRead } from './sign.slice';
export const submitSign =
  (formData: ISignIn): AppThunk<Promise<void>> =>
  async (dispatch, _, { storage, api, router }) => {
    try {
      console.log(formData);
      dispatch(signSlice.actions.setLoading(true));
      const response = await api.post('/auth/login/', formData);
      const loginResponse: LoginResponse = response.data;
      storage.setItem('id', loginResponse.id);
      storage.setItem('name', loginResponse.username);

      const settingsResponse = await api.get<SettingsRead>(`/settings`);
      const settings = settingsResponse.data;
      storage.setItem(
        'notifications_enabled',
        String(settings.notifications_enabled),
      );
      storage.setItem('theme', settings.theme);
      await router.navigate('/profile');
    } catch (e) {
      dispatch(signSlice.actions.setError(true));
      console.error('Error submitting form:', e);
    } finally {
      dispatch(signSlice.actions.setLoading(false));
    }
  };
