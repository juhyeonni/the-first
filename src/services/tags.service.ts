import { baseAxios } from '@axios';
import { Tag } from '@interfaces/tag.interface';

export async function getTags(): Promise<Tag[]> {
  const res = await baseAxios.get(`/tags`);
  return res.data;
}

export async function createTags(tags: string[]) {
  const originTags = await getTags();
  console.log(originTags, tags);

  const newTags = tags.filter((tag) => {
    return !originTags.find((originTag) => originTag.name === tag);
  });

  console.log(newTags);

  newTags.forEach(async (tag) => {
    const res = await baseAxios.post(`/tags`, {
      name: tag,
    });
  });

  return newTags;
}
