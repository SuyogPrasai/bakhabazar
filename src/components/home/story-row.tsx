"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import StoryCard from "@/components/home/story-card";
import { story_general } from "@/types/models/story";

interface StoriesProps {
    stories: story_general[];
}

const Stories = ({ stories }: StoriesProps) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (!scrollRef.current) return;
        const { clientWidth } = scrollRef.current;
        scrollRef.current.scrollBy({
            left: direction === "left" ? -clientWidth : clientWidth,
            behavior: "smooth",
        });
    };

    return (
        <div className="text-white rounded-lg w-full relative flex-1 min-w-0">
            <div className="relative">
                <div
                    ref={scrollRef}
                    className="flex gap-1 h-full overflow-x-auto no-scroll"
                >
                    {stories.map((story: story_general) => (
                        <StoryCard
                            story={story}
                        />
                    ))}
                </div>

                {/* Left Arrow */}
                <button
                    onClick={() => scroll("left")}
                    className="absolute -left-2 top-1/2 -translate-y-1/2 cursor-pointer bg-neutral-800 hover:bg-neutral-600 text-white p-2 rounded-lg shadow-lg"
                >
                    <ChevronLeft size={18} />
                </button>

                {/* Right Arrow */}
                <button
                    onClick={() => scroll("right")}
                    className="absolute -right-2 top-1/2 -translate-y-1/2 cursor-pointer bg-neutral-800 hover:bg-neutral-600 text-white p-2 rounded-lg shadow-lg"
                >
                    <ChevronRight size={18} />
                </button>
            </div>
        </div>
    );
};

export default Stories;