export interface StoryContentType {
  id: number;
  name: string;
  img: string;
}

export interface StoryType {
  id: number;
  name: string;
  img: string;
  content: StoryContentType[];
}
