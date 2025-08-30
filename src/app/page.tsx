import { AppSidebar } from "@/components/app-sidebar"
import HomeMain from "@/components/home-main"
import HomeNav from "@/components/home-nav"
import HomeSpotlight from "@/components/home-spotlight"
import SpotlightSlider from "@/components/image-slider"
import PlayBar from "@/components/play-bar"
import Trending from "@/components/trending"

import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

export default function Home() {
  return (
    <SidebarProvider className="h-screen w-full bg-black overflow-hidden p-2">
      {/* Sidebar */}
      <AppSidebar className="bg-black py-5" />

      {/* Main content area */}
      <SidebarInset className="flex flex-col bg-background">

        {/* Fixed Navbar at top */}
        <HomeNav />

        {/* Scrollable content */}
        <div className="flex flex-col overflow-y-auto no-scroll px-4 py-4 gap-4">
          <SpotlightSlider />

          <div className="flex gap-4 pt-3"  id="home-main">
            {/* Left column */}
            <div className="w-2/3 flex flex-col gap-4">
              <div className="h-[500px] bg-light-background rounded-xl">
                <HomeMain />
              </div>
              {/* More content so scroll exists */}
              <div className="h-[1500px] rounded-xl" >

              </div>
            </div>

            {/* Right column — sticks while left side scrolls */}
            <div className="w-1/3 rounded-xl h-[500px] bg-light-background sticky top-0 self-start">
              <HomeSpotlight />
            </div>
          </div>

          {/* Placeholder for more scrollable content */}
          <div className="min-h-screen" />
        </div>
        {/* Fixed Playbar at bottom */}
        <div className="shrink-0">
          <PlayBar />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
