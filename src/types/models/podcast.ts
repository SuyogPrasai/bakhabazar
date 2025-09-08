export interface podcast {
  title?: string;
  name?: string;
  content?: string;
  synopsis: string;
  alt_name?: string;
  author: string;
  picture: string;
  uuid: string;
  likes: number;
  entities?: podcast[];
  legends?: podcast[];
  stories?: podcast[];
  type?: "story" | "legend" | "entity";
}