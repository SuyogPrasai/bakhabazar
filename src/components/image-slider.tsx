"use client";

import React, { useState } from "react";
import { ArrowLeft, ArrowRight, PlayCircle, Clock, Calendar, BookOpen } from "lucide-react";

const spotlightData = [
  {
    id: 1,
    title: "The Tale of the Big Foot",
    date: "24th Dec, 2025",
    duration: "24 min",
    category: "Legend",
    description:
      "The Bigfoot, a towering mystery of forests, inspires legends. Hidden in shadows, it roams silently, leaving giant footprints and endless questions about nature's greatest untold secret.",
  },
  {
    id: 2,
    title: "Secrets of the Ocean",
    date: "15th Jan, 2026",
    duration: "32 min",
    category: "Nature",
    description:
      "Dive deep into the mysteries of the ocean, uncovering creatures and phenomena that remain hidden beneath the waves.",
  },
];

function SpotlightSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % spotlightData.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? spotlightData.length - 1 : prev - 1
    );
  };

  const current = spotlightData[currentIndex];

  return (
    <div className="relative bg-neutral-800 text-white p-6 rounded-md flex justify-between items-end min-h-1/2">
      {/* Left Content */}
      <div className="max-w-xl">
        <p className="text-xs text-gray-400 mb-1"># {current.id} Spotlight</p>
        <h2 className="text-2xl font-bold mb-2">{current.title}</h2>

        {/* Meta Info */}
        <div className="flex items-center gap-4 text-sm text-gray-300 mb-3">
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" /> {current.duration}
          </span>
          <span className="flex items-center gap-1">
            <BookOpen className="w-4 h-4" /> {current.category}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" /> {current.date}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-300 mb-4">{current.description}</p>

        {/* Button */}
        <button className="flex items-center gap-2 bg-white text-black font-semibold px-4 py-2 rounded-full hover:bg-gray-200">
          <PlayCircle className="w-5 h-5" /> Watch Now
        </button>
      </div>
    </div>
  );
}

export default SpotlightSlider;
