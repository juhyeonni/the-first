export interface Post {
  id: number;
  title: string;
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
