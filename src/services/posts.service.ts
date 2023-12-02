import { Post, PostPayload } from '@interfaces/post.interface';
import axios from '@axios';
import { createTags } from './tags.service';

export async function createPost(post: PostPayload) {
  if (post.tags) createTags(post.tags);

  const res = await axios.post('/posts', {
    ...post,
    created_at: Date.now(),
    updated_at: Date.now(),
  });
}

export async function getPosts(): Promise<Post[]> {
  const res = await axios.get('/posts');
  return res.data;
}
