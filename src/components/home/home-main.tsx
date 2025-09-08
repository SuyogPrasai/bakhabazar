"use client"

import React, { useEffect, useState } from "react"
import Stories from "@/components/home/story-row"
import { story_general } from "@/types/models/story"

function HomeMain() {
    const [open, setOpen] = useState<"All" | "Stories" | "Legends">("All")
    const [rows, setRows] = useState<story_general[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function getStories() {
            try {
                const res = await fetch("http://192.168.1.66/api/story/", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })

                if (!res.ok) {
                    throw new Error(`Failed to fetch: ${res.status}`)
                }

                const data: story_general[] = await res.json()
                setRows(data)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        getStories()
    }, [])

    return (
        <div className="px-4 md:p-4 flex flex-col gap-4">
            <div className="heading">
                <div className="flex gap-2">
                    {["All", "Stories", "Legends"].map((tab) => (
                        <button
                            key={tab}
                            className={`cursor-pointer px-4 py-1 rounded-full font-medium transition ${open === tab
                                    ? "bg-white text-black"
                                    : "bg-light-background-dark text-white hover:bg-highlight hover:text-highlight-light"
                                }`}
                            onClick={() => setOpen(tab as "All" | "Stories" | "Legends")}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            <div className="row-1 mt-2 px-3">
                {loading ? (
                    <p className="text-gray-400">Loading...</p>
                ) : (
                    <>
                        <Stories stories={rows} />
                        <Stories stories={rows} />
                    </>
                )}
            </div>
        </div>
    )
}

export default HomeMain
