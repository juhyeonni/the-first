import { User } from './user.interface';

export interface Post {
  id: number;
  photos: string[];
  heart: boolean;
  content: string;
  userId: number;
  tags?: string[];
  created_at: Date;
  updated_at: Date;
}

export interface PostPayload {
  content: string;
  photos: File[];
  userId: number;
  placeId: number;
  tags?: string[];
}

// 🟡 포스트 + 유저
export interface PostWithUser extends Post {
  user: User; //  <- User 추가 🟡
}
