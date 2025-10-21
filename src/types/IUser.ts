import type { IPost } from './IPost';

export interface IUser {
  name: string;
  friendCount: number;
  photoCount: number;
  subscriberCount: number;
  posts: IPost[];
}

export default interface ProfileProps {
  user: IUser;
}
