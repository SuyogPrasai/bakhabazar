import { entity_general } from "./entity";

export interface podcast {
  title: string;
  content: string;
  synopsis: string;
  likes: number;
  author: string;
  picture: string;
  uuid: string;
  entities: entity_general[];
}

export interface podcast_general {
  title: string;
  synopsis: string;
  author: string;
  picture: string;
  uuid: string;
  likes: number;
  entities: entity_general[];
}

export interface legend extends podcast {}

export interface legend_general extends podcast_general {}

export interface story extends podcast {}

export interface story_general extends podcast_general {}