"use client";

import React from "react";
import { Play } from "lucide-react";
import Image from "next/image";
import { podcast } from "@/types/models/podcast";
import { findBackend } from "@/helper/findBackend";
import { usePodcast } from "@/context/use-podcast";

// Fetch API base URL
const API_BASE_URL = findBackend();

interface PodcastCardProps {
  podcast:  podcast;
}

export default function PodcastCard({ podcast }: PodcastCardProps) {
  const { activePodcast, setActivePodcast } = usePodcast();

  const handlePlayClick = () => {
    // Update the global active podcast
    setActivePodcast({
      ...podcast,
    });
  };

  return (
    <div className="flex-shrink-0 w-30 sm:w-38 md:w-46 cursor-pointer p-3 rounded-md hover:bg-highlight transition group"
      onClick={handlePlayClick }>
        {/* Image */ }
        < div className="relative aspect-square w-full bg-light-background-dark rounded-md overflow-hidden">
      {podcast.picture && (
        <Image
          src={API_BASE_URL + podcast.picture}
          alt={podcast?.title || "Podcast"}
          width={500}
          height={500}
          className="w-full h-full object-cover"
        />
      )}

      <button

        className="cursor-pointer absolute bottom-2 right-2 w-10 h-10 rounded-full bg-secondary flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
      >
        <Play className="text-black fill-black" size={20} />
      </button>
    </div>

      {/* Podcast Info */ }
      <p className="mt-3 text-white font-medium text-sm truncate">
        {podcast.title}
      </p>
      <p className="text-gray-400 text-xs truncate">{podcast.author}</p>
    </div >
  );
}
