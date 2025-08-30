import { AppSidebar } from "@/components/app-sidebar"
import Footer from "@/components/footer"
import HomeMain from "@/components/home-main"
import HomeNav from "@/components/home-nav"
import HomeSpotlight from "@/components/home-spotlight"
import SpotlightSlider from "@/components/image-slider"
import PlayBar from "@/components/play-bar"
import TopComments from "@/components/top-comments-home"
import Trending from "@/components/trending"

import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

export default function Home() {
  return (
    <SidebarProvider className="h-screen w-full bg-black overflow-hidden p-2"
    defaultOpen={false}
    >
      {/* Sidebar */}
      <AppSidebar className="bg-black py-5" />

      {/* Main content area */}
      <SidebarInset className="flex flex-col bg-background">

        {/* Fixed Navbar at top */}
        <HomeNav />

        {/* Scrollable content */}
        <div className="flex flex-col overflow-y-auto no-scroll px-4 py-4 gap-4">
          <SpotlightSlider />

          <div className="flex gap-4 pt-3" id="home-main">
            {/* Left column */}
            <div className="w-2/3 flex flex-col gap-4">
              <div className="bg-light-background rounded-xl">
                <HomeMain />
              </div>
              
              <TopComments />
                <HomeMain />
              <Footer />
            </div>

            {/* Right column — sticks while left side scrolls */}
            <div className="w-1/3 h-[500px]  sticky top-0 self-start">
              <HomeSpotlight
                songTitle="Dirty Livin'"
                artist="KISS"
                about="Rooted in the campy theatrics of Alice Cooper and the sleazy hard rock of glam rockers the New York Dolls, Kiss became a favorite of American teenagers in the '70s..."
                monthlyListeners={16472722}
              />
            </div>
          </div>

        </div>
        {/* Fixed Playbar at bottom */}
        <div className="shrink-0">
          <PlayBar />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
