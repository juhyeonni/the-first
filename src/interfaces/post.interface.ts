export interface Post {
  id: number;
  imgs: string[];
  heart: boolean;
  content: string;
  userId: number;
  tags?: string[];
  created_at: Date;
  updated_at: Date;
}

export interface PostPayload {
  title: string;
  content: string;
  tags?: string[];
}

// 🟡 유저
export interface User {
  id: number;
  email: string;
  username: string;
  name: string;
  avatar: string;
  bio: string;
  password: string;
}

// 🟡 포스트 + 유저
export interface PostAndUser extends Post {
  user: User; //  <- User 추가 🟡
}
