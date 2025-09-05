"use client"

import React from 'react'
import Stories from '@/components/home/story-row'
import { useState } from 'react'
import { story_general } from '@/types/models/story'

interface HomeMainProps {
    row1: story_general[];
    row2: story_general[];
}

function HomeMain({ row1, row2 }: HomeMainProps) {
    const [open, setOpen] = useState("All")

    return (
        <div className='px-4 md:p-4 flex flex-col gap-4'>
            <div className="heading">
                <div className="flex gap-2">
                    <button 
                        className={`cursor-pointer px-4 py-1 rounded-full font-medium transition ${
                            open === "All" 
                                ? "bg-white text-black" 
                                : "bg-light-background-dark text-white hover:bg-highlight hover:text-highlight-light"
                        }`}
                        onClick={() => setOpen("All")}
                    >
                        All
                    </button>
                    <button 
                        className={`cursor-pointer px-4 py-1 rounded-full font-medium transition ${
                            open === "Stories" 
                                ? "bg-white text-black" 
                                : "bg-light-background-dark text-white hover:bg-highlight hover:text-highlight-light"
                        }`}
                        onClick={() => setOpen("Stories")}
                    >
                        Stories
                    </button>
                    <button 
                        className={`cursor-pointer px-4 py-1 rounded-full font-medium transition ${
                            open === "Legends" 
                                ? "bg-white text-black" 
                                : "bg-light-background-dark text-white hover:bg-highlight hover:text-highlight-light"
                        }`}
                        onClick={() => setOpen("Legends")}
                    >
                        Legends
                    </button>
                </div>
            </div>
            <div className="row-1 mt-2 px-3">
                <Stories stories={row1} />
                <Stories stories={row2} />
            </div>
        </div>
    )
}

export default HomeMain