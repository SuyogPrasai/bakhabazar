import { entity_general } from "./entitiy";

export interface legend {
    title: string;
    content: string;
    synopsis: string;
    likes: number;
    author: string;
    picture: string;
    uuid: string;
    entities: entity_general[]
}

export interface legend_general {
    title: string;
    synopsis: string;
    author: string;
    picture: string;
    uuid: string;
    likes: number;
    entities: entity_general[]
}
