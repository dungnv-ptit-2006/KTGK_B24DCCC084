export interface Post {
  id: number;
  title: string;
  author: string;
  content: string;
  thumbnail: string;
  category: string;
  createdAt: string;
  excerpt: string;
}

export interface PostFormData {
  title: string;
  author: string;
  content: string;
  thumbnail: string;
  category: string;
}