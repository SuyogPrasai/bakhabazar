"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import StoryCard from "./story-card"; // adjust the path if needed

const Stories = () => {
    const scrollRef = useRef<HTMLDivElement>(null);

    // Demo data
    const stories = Array.from({ length: 7 }, (_, i) => ({
        id: i,
        title: `Story ${i + 1}`,
        imageUrl: "",
    }));

    const scroll = (direction: "left" | "right") => {
        if (!scrollRef.current) return;
        const { clientWidth } = scrollRef.current;
        scrollRef.current.scrollBy({
            left: direction === "left" ? -clientWidth : clientWidth,
            behavior: "smooth",
        });
    };

    return (
        <div className="text-white p-6 rounded-lg w-full relative flex-1 min-w-0 h-[300px] mb-10">
            <h2 className="text-xl font-semibold mb-4">Stories</h2>

            <div className="relative  h-[250px]">
                <div
                    ref={scrollRef}
                    className="flex gap-3 h-full overflow-x-auto no-scroll pb-5 min-w-0 max-w-full"
                >

                    {stories.map((story) => (
                        <StoryCard key={story.id} {...story} />
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
