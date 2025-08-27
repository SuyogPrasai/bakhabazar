"use client";

import React from "react";
import Image from "next/image";
import {
  Play,
  SkipBack,
  SkipForward,
  Shuffle,
  Volume2,
  Maximize,
  AlignJustify,
} from "lucide-react";

function PlayBar() {
  return (
    <div className="flex items-center justify-between px-4 py-4 bg-[#1a1a1a] text-white w-full absolute bottom-0 rounded-b-xl">
      {/* Left Section - Song Info */}
      <div className="flex items-center gap-3 min-w-0">
        <Image
          src="/icons/thrilling.png"
          alt="Album Art"
          width={48}
          height={48}
          className="rounded-md shrink-0"
        />
        <div className="flex flex-col min-w-0">
          <span className="text-sm font-semibold text-highlight-light truncate max-w-[160px]">
            Another One Bites The Dust With A Very Very Long Title
          </span>
          <span className="text-xs text-highlight-light truncate max-w-[160px]">
            Queen
          </span>
        </div>
      </div>

      {/* Middle Section - Controls */}
      <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center w-[40%]">
        {/* Buttons */}
        <div className="flex items-center gap-5 mb-1">
          <Shuffle className="h-5 w-5 text-highlight-light hover:text-highlight-light cursor-pointer" />
          <SkipBack className="h-6 w-6 text-highlight-light hover:text-highlight-light cursor-pointer" />
          <button className="flex cursor-pointer items-center justify-center w-10 h-10 rounded-full bg-highlight-light text-black hover:scale-105 transition">
            <Play className="h-6 w-6" />
          </button>
          <SkipForward className="h-6 w-6 text-highlight-light hover:text-highlight-light cursor-pointer" />
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-2 w-full">
          <span className="text-xs text-highlight-light">0:01</span>
          <div className="relative w-full h-1 bg-[#2a2a2a] rounded-full">
            <div className="absolute left-0 top-0 h-1 bg-highlight-light rounded-full w-1/4"></div>
          </div>
          <span className="text-xs text-highlight-light">3:34</span>
        </div>
      </div>

      {/* Right Section - Extra Controls */}
      <div className="flex items-center gap-4">
        <AlignJustify className="h-5 w-5 text-highlight-light hover:text-highlight-light cursor-pointer" />
        <Volume2 className="h-5 w-5 text-highlight-light hover:text-highlight-light cursor-pointer" />
        <div className="w-24 h-1 bg-[#2a2a2a] rounded-full">
          <div className="h-1 bg-highlight-light w-3/4 rounded-full"></div>
        </div>
        <Maximize className="h-5 w-5 text-highlight-light hover:text-highlight-light cursor-pointer" />
      </div>
    </div>
  );
}

export default PlayBar;
