import React from 'react'

function HomeMain() {
    return (
        <div >
            <div className="heading" >
                <div className="flex gap-2 p-4">
                    <button className="cursor-pointer px-4 py-1 rounded-full bg-white text-black font-medium">
                        All
                    </button>
                    <button className="cursor-pointer px-4 py-1 rounded-full bg-light-background-dark text-white font-medium hover:bg-highlight hover:text-highlight-light transition">
                        Music
                    </button>
                    <button className="cursor-pointer px-4 py-1 rounded-full bg-light-background-dark text-white font-medium hover:bg-highlight hover:text-highlight-light transition">
                        Podcasts
                    </button>
                </div>
            </div>

            

        </div>
    )
}

export default HomeMain