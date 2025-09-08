"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { legend_general, story_general } from "@/types/models/podcast";
import { findBackend } from "@/helper/findBackend";

// Fetch API base URL
const API_BASE_URL = findBackend();

type PodcastContextType = {
  activePodcast: legend_general | story_general | null;
  setActivePodcast: (podcast: legend_general | story_general | null) => void;
};

const PodcastContext = createContext<PodcastContextType | undefined>(undefined);

export function PodcastProvider({ children }: { children: React.ReactNode }) {
  const [activePodcast, setActivePodcast] = useState<legend_general | story_general | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStory() {
      try {
        const res = await fetch(`${API_BASE_URL}/api/story/?number=1`);
        if (res.ok) {
          const data: legend_general[] | story_general[] = await res.json();
          setActivePodcast(data[0]);
        }
      } catch (err) {
        console.error("Failed to fetch story:", err);
      } finally {
        setLoading(false);
      }
    }

    if (!activePodcast) {
      fetchStory();
    } else {
      setLoading(false);
    }
  }, [activePodcast]);

  return (
    <PodcastContext.Provider value={{ activePodcast, setActivePodcast }}>
      {children}
    </PodcastContext.Provider>
  );
}

export function usePodcast() {
  const context = useContext(PodcastContext);
  if (!context) {
    throw new Error("usePodcast must be used within a PodcastProvider");
  }
  return context;
}
