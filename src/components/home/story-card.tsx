import React, { useEffect, useState } from "react";
import { Play } from "lucide-react"; // play button icon
import Image from "next/image"

export default function SongCard() {
  const [image, setImage] = useState("");

  useEffect(() => {
    // Fetch a random image from Picsum
    const randomImage = `https://picsum.photos/300?random=${Math.floor(
      Math.random() * 1000
    )}`;
    setImage(randomImage);
  }, []);

  return (
    <div className="flex-shrink-0 w-30 sm:w-38 md:w-46 cursor-pointer p-3 rounded-md hover:bg-highlight transition group">
      {/* Image */}
      <div className="relative aspect-square w-full bg-light-background-dark rounded-md overflow-hidden">
        {image && (
          <Image
            src={image}
            alt="Random Album Art"
            width={500} // set appropriate width
            height={500} // set appropriate height
            className="w-full h-full object-cover"
          />
        )}

        <button className="cursor-pointer absolute bottom-2 right-2 w-10 h-10 rounded-full bg-secondary flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
          <Play className="text-black fill-black" size={20} />
        </button>
      </div>

      {/* Song Info (dummy for now) */}
      <p className="mt-3 text-white font-medium text-sm truncate">
        Random Song
      </p>
      <p className="text-gray-400 text-xs truncate">Random Artist</p>
    </div>
  );
}
