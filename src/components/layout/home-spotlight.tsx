"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

interface Entity {
  name: string;
  description: string;
  views: number;
  imageUrl?: string;
}

interface StorySpotlightProps {
  title: string;
  description: string;
  entities: Entity[];
}

export default function StorySpotlight({
  title,
  description,
  entities,
}: StorySpotlightProps) {
  const [coverImage, setCoverImage] = useState("");

  // Fetch random cover image from Picsum
  useEffect(() => {
    setCoverImage(`https://picsum.photos/seed/${Math.random()}/800/400`);
  }, []);

  return (
    <div
      className="
    flex flex-col 
    h-full 
    max-h-[calc(100vh-10rem)] 
    overflow-y-auto 
    p-4 
    space-y-6 
    pb-20
    custom-scroll
  "
    >
      {/* Story Section */}
      <div>
        {coverImage && (
          <div className="relative w-full h-56 sm:h-72 lg:h-80 xl:h-96">
            <Image
              src={coverImage}
              alt={title}
              fill
              className="rounded-lg object-cover"
              sizes="(max-width: 640px) 100vw, 
                     (max-width: 1024px) 80vw, 
                     60vw"
              priority
            />
          </div>
        )}
        <h2 className="text-2xl font-bold mt-4 text-secondary">{title}</h2>
        <p className="text-gray-300 text-base leading-relaxed mt-2">
          {description}
        </p>
      </div>

      {/* Entities Section */}
      <div className="flex-1">
        <h3 className="text-lg font-bold mb-3 text-highlight-light">
          Entities Mentioned
        </h3>
        <div className="flex flex-col gap-4">
          {entities.map((entity, index) => (
            <div
              key={index}
              className="rounded-xl shadow-md p-3 transition-colors duration-200 hover:bg-highlight cursor-pointer"
            >
              <div className="relative w-full h-40">
                <Image
                  src={
                    entity.imageUrl ||
                    `https://picsum.photos/seed/${entity.name}/400/250`
                  }
                  alt={entity.name}
                  fill
                  className="rounded-lg object-cover"
                  sizes="(max-width: 640px) 100vw, 
                         (max-width: 1024px) 50vw, 
                         33vw"
                />
              </div>
              <h4 className="text-md font-semibold text-secondary mt-3">
                {entity.name}
              </h4>
              <p className="text-gray-400 text-xs mb-1">
                {entity.views.toLocaleString()} views
              </p>
              <p className="text-gray-300 text-sm leading-snug">
                {entity.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
