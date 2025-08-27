"use client"

import { Plus, BookOpen, Feather, Boxes } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SidebarTrigger } from "./ui/sidebar"

export function CommunityHeader() {
    return (
        <div className="community-header flex items-center justify-between px-3 mb-3">
            <div className="flex items-center gap-2">
                <SidebarTrigger />
                <h2 className="text-base font-semibold">Community</h2>
            </div>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button
                        type="button"
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-highlight text-sm font-bold text-white shadow-sm hover:bg-highlight/90 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Create</span>
                    </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                    align="start"
                    side="right"
                    sideOffset={6}
                    className="w-72 rounded-xl border border-gray-800 bg-accent shadow-lg p-1"
                >
                    <DropdownMenuLabel className="px-3 py-2 text-xs text-gray-400">
                        Choose type
                    </DropdownMenuLabel>

                    <DropdownMenuSeparator className="bg-gray-700" />

                    <DropdownMenuItem className="cursor-pointer flex flex-col items-start gap-1 px-3 py-2 rounded-md hover:bg-gray-700/50 transition-colors">
                        <div className="flex items-center gap-2">
                            <BookOpen className="h-4 w-4 text-white" />
                            <span className="font-medium text-white">Legend</span>
                        </div>
                        <span className="text-xs text-gray-400 leading-snug break-words">
                            Share myths, folklore, or timeless tales passed through generations.
                        </span>
                    </DropdownMenuItem>

                    <DropdownMenuItem className="cursor-pointer flex flex-col items-start gap-1 px-3 py-2 rounded-md hover:bg-gray-700/50 transition-colors">
                        <div className="flex items-center gap-2">
                            <Feather className="h-4 w-4 text-white" />
                            <span className="font-medium text-white">Story</span>
                        </div>
                        <span className="text-xs text-gray-400 leading-snug break-words">
                            Create a narrative — personal, fictional, or historical.
                        </span>
                    </DropdownMenuItem>

                    <DropdownMenuItem className="cursor-pointer flex flex-col items-start gap-1 px-3 py-2 rounded-md hover:bg-gray-700/50 transition-colors">
                        <div className="flex items-center gap-2">
                            <Boxes className="h-4 w-4 text-white" />
                            <span className="font-medium text-white">Entity</span>
                        </div>
                        <span className="text-xs text-gray-400 leading-snug break-words">
                            Define a character, place, or object that shapes the community world.
                        </span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
