import React from "react";
import { Play } from "lucide-react"; // using lucide-react for icons

function SongCard() {
  return (
    <div className="w-50 cursor-pointer p-3 rounded-md hover:bg-highlight transition group">
      {/* Image placeholder */}
      <div className="relative w-44 h-44 bg-light-background-dark rounded-md overflow-hidden">
        {/* Play button (appears on hover) */}
        <button className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-green-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
          <Play className="text-black fill-black" size={20} />
        </button>
      </div>

      {/* Song title */}
      <p className="mt-3 text-white font-medium text-sm truncate">Papercuts</p>

      {/* Artist name */}
      <p className="text-gray-400 text-xs truncate">Linkin Park</p>
    </div>
  );
}

export default SongCard;
