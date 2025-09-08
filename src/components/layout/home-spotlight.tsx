"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { usePodcast } from "@/context/use-podcast";
import { findBackend } from "@/helper/findBackend";
import { story } from "@/types/models/podcast";
import { motion, AnimatePresence } from "framer-motion";

// Fetch API base URL
const API_BASE_URL = findBackend();

export default function StorySpotlight() {
  const { activePodcast } = usePodcast();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activePodcast?.uuid} // Unique key to trigger animation on change
        initial={{ opacity: 0, y: 20 }} // Start state: faded out and slightly offset
        animate={{ opacity: 1, y: 0 }} // End state: fully visible and in place
        exit={{ opacity: 0, y: -20 }} // Exit state: fade out and slide up
        transition={{ duration: 0.3 }} // Animation duration
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
          {activePodcast?.picture && (
            <div className="relative w-full h-56 sm:h-72 lg:h-80 xl:h-96">
              <Image
                src={API_BASE_URL + activePodcast?.picture}
                alt={activePodcast?.title}
                fill
                className="rounded-lg object-cover"
                sizes="(max-width: 640px) 100vw, 
                       (max-width: 1024px) 80vw, 
                       60vw"
                priority
              />
            </div>
          )}
          <h2 className="text-2xl font-bold mt-4 text-secondary">
            {activePodcast?.title}
          </h2>
          <p className="text-gray-300 text-base leading-relaxed mt-2">
            {activePodcast?.synopsis}
          </p>
        </div>

        {/* Entities Section (render only if > 0) */}
        {activePodcast?.entities && activePodcast?.entities.length > 0 && (
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-3 text-highlight-light">
              Entities Mentioned
            </h3>
            <div className="flex flex-col gap-4">
              {activePodcast?.entities.map((entity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }} // Start state for each entity
                  animate={{ opacity: 1, x: 0 }} // End state for each entity
                  transition={{ delay: index * 0.1, duration: 0.2 }} // Staggered animation
                  className="rounded-xl shadow-md p-3 transition-colors duration-200 hover:bg-highlight cursor-pointer"
                >
                  {entity.picture && (
                    <div className="relative w-full h-40">
                      <Image
                        src={entity.picture}
                        alt={entity.name}
                        fill
                        className="rounded-lg object-cover"
                        sizes="(max-width: 640px) 100vw, 
                               (max-width: 1024px) 50vw, 
                               33vw"
                      />
                    </div>
                  )}
                  <h4 className="text-md font-semibold text-secondary mt-3">
                    {entity.name}
                  </h4>
                  <p className="text-gray-300 text-sm leading-snug">
                    {entity.synopsis}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}