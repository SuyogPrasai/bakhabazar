"use client"

import { findBackend } from "@/helper/findBackend"
import { podcast } from "@/types/models/podcast";

const API_BASE_URL = findBackend();


export function usePodcastBackend() {

    const get_podcast = async ( type: string ) => {
        if ( type === "all" ) type = "story";
        const url = `${API_BASE_URL}/api/${type}`;
        
        const res = await fetch(url);

        const podcasts: podcast[] = res.ok ? await res.json() : [];

        return podcasts
    }

    return {
        get_podcast
    }
}
