"use client"

import React, { useEffect, useState } from "react"
import Podcasts from "./podcast-row"
import { podcast } from "@/types/models/podcast"
import { usePodcastBackend } from "@/hooks/use-podcast-backend"

interface HomeMainProps {
    rows: podcast[],
    type: string
}

function HomeMain({ rows, type }: HomeMainProps) {

    const { get_podcast } = usePodcastBackend();

    const [displayRows, setDisplayRows] = useState<podcast[]>(rows);

    const [open, setOpen] = useState<"Stories" | "Legends" | "Entities">("Stories")

    useEffect(() => {
        const fetchRows = async () => {
            if (open === "Stories") {
                const result = await get_podcast("story");
                setDisplayRows(result);
            } else if (open === "Legends") {
                const result = await get_podcast("legend");
                setDisplayRows(result);
            } else if ( open === "Entities" ) {
                const result = await get_podcast("entity");
                setDisplayRows(result);
            }
        };
        fetchRows();
    }, [open]);

    const row_top = displayRows.slice(0, 9);

    const row_bottom = displayRows.slice(9, 19);

    return (
        <div className="px-4 md:p-4 flex flex-col gap-4">
            <div className="heading">
                <div className="flex gap-2">
                    {["Stories" , "Legends" , "Entities"].map((tab) => (
                        <button
                            key={tab}
                            className={`cursor-pointer px-4 py-1 rounded-full font-medium transition ${open === tab
                                ? "bg-white text-black"
                                : "bg-light-background-dark text-white hover:bg-highlight hover:text-highlight-light"
                                }`}
                            onClick={() => setOpen(tab as "Stories" | "Legends" | "Entities")}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            <div className="row-1 mt-2 px-3">
                <Podcasts podcasts={row_top} type={type}/>
                
                <Podcasts podcasts={row_bottom} type={type} />
            </div>
        </div>
    )
}

export default HomeMain
