export default interface INewsFeed {
  news: {
    id: number;
    user: string;
    postTime: string;
    text: string;
    image: string;
    likes: number;
    comments: string[];
  }[];
}
