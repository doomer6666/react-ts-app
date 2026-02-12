import type { AppThunk } from '../../../shared/redux';
import type ISignUp from '../../../types/ISignUp';
import { registrationSlice } from './registration.slice';

type RegistrationResponse = {
  id: string;
};

export const submitRegistration =
  (formData: ISignUp): AppThunk<Promise<void>> =>
  async (dispatch, __, { storage, api, router }) => {
    try {
      console.log(formData);
      dispatch(registrationSlice.actions.setLoading(true));
      const response = await api.post('/auth/register/', formData);
      const regResponse: RegistrationResponse = response.data;
      storage.setItem('id', regResponse.id);
      router.navigate('/profile');
    } catch (e) {
      dispatch(registrationSlice.actions.setError(true));
      console.error('Error submitting form:', e);
    } finally {
      dispatch(registrationSlice.actions.setLoading(false));
    }
  };
