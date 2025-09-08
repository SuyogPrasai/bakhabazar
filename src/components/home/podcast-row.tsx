"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PodcastCard from "@/components/home/podcast-card";
import { podcast } from "@/types/models/podcast";

interface PodcastsProps {
    podcasts: podcast[];
    type: string;
}

const Podcasts = ({ podcasts }: PodcastsProps) => {
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
                {podcasts.length === 0 ? (
                    <div className="flex items-center justify-center h-46">
                        <p className="text-neutral-400 text-lg">No podcast available</p>
                    </div>
                ) : (
                    <>
                        <div
                            ref={scrollRef}
                            className="flex gap-1 h-full overflow-x-auto no-scroll"
                        >
                            {podcasts.map((podcast: podcast) => (
                                <PodcastCard
                                    key={podcast.uuid}
                                    podcast={podcast}
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
                    </>
                )}
            </div>
        </div>
    );
};

export default Podcasts;