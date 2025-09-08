import { legend_general } from "./podcast";
import { story_general } from "./podcast";

export interface entity {
    name: string;
    content: string;
    synopsis: string;
    alt_name: string;
    author: string;
    picture: string;
    uuid: string;
    legends: legend_general[];
    stories: story_general[];
}

export interface entity_general {
    name: string;
    alt_name: string;
    synopsis: string;
    picture: string;
    author: string;
    uuid: string;
    legends: legend_general[];
    stories: story_general[];
}