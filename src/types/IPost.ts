export interface IPost {
  id: number;
  userId: number;
  user: string;
  postTime: string;
  text: string;
  image?: string;
  likes: number;
  isLiked: boolean;
  comments: IComment[];
}

interface IComment {
  content: string;
  createdAt: string;
  id: number;
  postId: number;
  userId: number;
  username?: string;
}

export default interface PostProps {
  item: IPost;
  openUserInfo?: boolean;
}
