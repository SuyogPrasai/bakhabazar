"use client";
import React, { useEffect, useState } from "react";

interface SpotlightProps {
  songTitle: string;
  artist: string;
  about: string;
  monthlyListeners: number;
}

export default function HomeSpotlight({
  songTitle,
  artist,
  about,
  monthlyListeners,
}: SpotlightProps) {
  const [albumCover, setAlbumCover] = useState("");
  const [artistImage, setArtistImage] = useState("");

  // Fetch random images from Picsum
  useEffect(() => {
    setAlbumCover(`https://picsum.photos/seed/${Math.random()}/500/500`);
    setArtistImage(`https://picsum.photos/seed/${Math.random()}/800/400`);
  }, []);

  return (
    <div className="flex flex-col h-full overflow-y-auto p-4 space-y-4 custom-scroll">
      {/* Album Section */}
      <div>
        {albumCover && (
          <img
            src={albumCover}
            alt={songTitle}
            className="rounded-lg w-full"
          />
        )}
        <h2 className="text-xl font-bold mt-3 text-secondary">{songTitle}</h2>
        <p className="text-secondary">{artist}</p>
      </div>

      {/* Artist Section */}
      <div>
        <h3 className="text-lg font-bold mb-2 text-highlight-light">About the artist</h3>
        {artistImage && (
          <img
            src={artistImage}
            alt={artist}
            className="rounded-lg mb-3 w-full"
          />
        )}
        <h4 className="text-md font-bold text-secondary">{artist}</h4>
        <p className="text-gray-400 text-sm mb-2">
          {monthlyListeners.toLocaleString()} monthly listeners
        </p>
        <p className="text-gray-300 text-sm leading-relaxed">{about}</p>
      </div>
    </div>
  );
}
