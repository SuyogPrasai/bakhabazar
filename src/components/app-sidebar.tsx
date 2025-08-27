// app-sidebar.tsx
"use client"

import * as React from "react"
import { Plus, X } from "lucide-react"
import Image from "next/image"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { CommunityHeader } from "./sidebar-community-header"

const communityItems = [
  { title: "Popular Legends", subtitle: "Explore", icon: X },
  { title: "Extraordinary", subtitle: "Explore", icon: X },
  { title: "Scary Entities", subtitle: "Explore", icon: X },
]

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      {...props}
      className="text-white transition-all duration-300 pl-5"
      variant="inset"
      collapsible="icon"
    >
      {/* Header */}
      <SidebarHeader className="py-4 flex flex-row items-center">
        {/* Logo */}
        <Image
          src="/home_logo.png"
          alt="Logo"
          width={80}
          height={80}
          className="object-contain"
          priority
        />

        {/* Title */}
        <h1 className="text-2xl font-bold text-primary uppercase font-lato pt-4 ">
          BAKHABAZAR
        </h1>
      </SidebarHeader>


      {/* Content */}
      <SidebarContent className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent"
      >
        {/* Community Section */}
        <div className="px-2 bg-accent py-5 rounded-xl flex flex-col">
          <div className="upper_section">
            <CommunityHeader />


            <ul className="space-y-2">
              {communityItems.map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 px-2 py-2 cursor-pointer rounded-md transition-colors hover:bg-neutral-700"
                >
                  <div className="w-10 h-10 bg-white flex items-center justify-center">
                    <item.icon className="h-4 w-4 text-black" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{item.title}</span>
                    <span className="text-xs text-gray-400">{item.subtitle}</span>
                  </div>
                </li>
              ))}
            </ul>


          </div>
          {/* Bookmarks Section */}
          <div className="px-2 bg-accent py-4 rounded-xl mt-5">
            <h2 className="text-sm font-medium mb-2 px-2">Your Bookmarks</h2>
            <div className="flex items-center gap-3 px-2 py-2 cursor-pointer rounded-lg transition-colors hover:bg-neutral-700">
              <div className="w-10 h-10 bg-white rounded-lg" />
              <span className="text-sm font-medium">Personal</span>
            </div>
          </div>

        </div>



      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="">
        <NavUser
          user={{
            name: "Suyog Prasai",
            email: "@gamerboy",
            avatar: "",
          }}
        />
      </SidebarFooter>
    </Sidebar>
  )
}
