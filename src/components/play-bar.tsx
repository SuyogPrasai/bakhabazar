"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Play,
  SkipBack,
  SkipForward,
  Shuffle,
  Volume2,
  Maximize,
  AlignJustify,
} from "lucide-react";
import { VolumeSlider } from "./volume-slider";
import { AudiobookProgress } from "./audio-progress";
import { LucidePlay } from "lucide-react";

function PlayBar() {
  return (
    <div className="flex items-center justify-between px-4 py-4 bg-[#1a1a1a] text-white w-full absolute bottom-0 rounded-b-xl z-20">
      {/* Left Section - Song Info */}
      <div className="flex items-center gap-3 min-w-0">
        <Link href="#home-top" scroll={true}>
          <Image
            src="/icons/thrilling.png"
            alt="Album Art"
            width={48}
            height={48}
            className="rounded-md shrink-0 cursor-pointer"
          />
        </Link>
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
            <LucidePlay className="h-5 w-5" />
          </button>
          <SkipForward className="h-6 w-6 text-highlight-light hover:text-highlight-light cursor-pointer" />
        </div>

        {/* Progress Bar */}
        <AudiobookProgress />
      </div>

      {/* Right Section - Extra Controls */}
      <div className="flex items-center gap-4">
        <AlignJustify className="h-5 w-5 text-highlight-light hover:text-highlight-light cursor-pointer" />
        <Volume2 className="h-5 w-5 text-highlight-light hover:text-highlight-light cursor-pointer" />
        <VolumeSlider />
        <Maximize className="h-5 w-5 text-highlight-light hover:text-highlight-light cursor-pointer" />
      </div>
    </div>
  );
}

export default PlayBar;
