import { SEGMENT_EXPLORER_SIMULATED_ERROR_MESSAGE } from 'next/dist/next-devtools/userspace/app/segment-explorer-node'
import React from 'react'
import Stories from '@/components/home/story-row'

function HomeMain() {
    return (
        <div className='px-4 md:p-4 flex flex-col gap-4'>
            <div className="heading" >
                <div className="flex gap-2">
                    <button className="cursor-pointer px-4 py-1 rounded-full bg-white text-black font-medium">
                        All
                    </button>
                    <button className="cursor-pointer px-4 py-1 rounded-full bg-light-background-dark text-white font-medium hover:bg-highlight hover:text-highlight-light transition">
                        Stories
                    </button>
                    <button className="cursor-pointer px-4 py-1 rounded-full bg-light-background-dark text-white font-medium hover:bg-highlight hover:text-highlight-light transition">
                        Legends
                    </button>
                </div>
            </div>
            <div className="row-1 mt-2 px-3">
                <Stories />
                <Stories />
            </div>
        </div>
    )
}

export default HomeMain