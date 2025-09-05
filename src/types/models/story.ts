import { entity_general } from "./entitiy";

export interface story {
    title: string;
    content: string;
    synopsis: string;
    likes: string;
    author: string;
    picture: string;
    uuid: string;
    entities: entity_general[]
}
export interface story_general {
    title: string;
    synopsis: string;
    author: string;
    picture: string;
    likes: string;
    uuid: string;
    entities: entity_general[]
}