export interface IPost {
  id: number;
  user: string;
  postTime: string;
  text: string;
  image?: string;
  likes: number;
  isLiked: boolean;
  comments: string[];
}

export default interface PostProps {
  item: IPost;
  openUserInfo?: boolean;
}
