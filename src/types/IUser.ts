import type { IPost } from './IPost';

export default interface IUser {
  name: string;
  friendCount: number;
  photoCount: number;
  subscriberCount: number;
  posts: IPost[];
  userId?: number;
}
