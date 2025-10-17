import type ISignIn from './ISignIn';

export default interface ISignUp extends ISignIn {
  email: string;
  confirmPassword: string;
}
