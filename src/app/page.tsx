import { AppSidebar } from "@/components/app-sidebar"
import Footer from "@/components/footer"
import HomeMain from "@/components/home-main"
import HomeNav from "@/components/home-nav"
import Stories from "@/components/story-row"
import SpotlightSlider from "@/components/image-slider"
import PlayBar from "@/components/play-bar"
import TopComments from "@/components/top-comments-home"
import Trending from "@/components/trending"

import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import StorySpotlight from "@/components/home-spotlight"

export default function Home() {
  return (
    <SidebarProvider
      className="h-screen w-full bg-black overflow-hidden p-2"
      defaultOpen={false}
    >
      {/* Sidebar */}
      <AppSidebar className="bg-black py-5" />

      {/* Main content */}
      <SidebarInset className="flex flex-col bg-background">
        {/* Fixed Navbar at top */}
        <HomeNav />

        {/* Scrollable content */}
        <div className="flex flex-col overflow-y-auto no-scroll gap-6">
          <SpotlightSlider />

          {/* Responsive main + spotlight layout */}
          <div
            id="home-main"
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-3"
          >
            {/* Left column */}
            <div className="lg:col-span-2 flex flex-col gap-6 min-w-[300px]">
              <div className=" rounded-xs">
                <HomeMain />
              </div>

              <TopComments />
              <div className=" rounded-xs">
                <HomeMain />
              </div>
              <Footer />
            </div>

            {/* Right column (spotlight) */}
            <div className="lg:col-span-1 min-w-[280px] lg:sticky lg:top-4 self-start">
                <StorySpotlight
                  title="The Legend of the Lakhe"
                  description="In the streets of Kathmandu, the Lakhe dances fiercely, guarding traditions and warding off evil spirits."
                  entities={[
                    {
                      name: "Lakhe",
                      description:
                        "A mythical demon-like being in Nepali folklore, known for its fierce dance during festivals and role as a protector against evil spirits.",
                      views: 12450,
                    },
                    {
                      name: "Kathmandu",
                      description:
                        "The capital city of Nepal, known for its vibrant culture, festivals, and deep connection to ancient traditions and myths.",
                      views: 9320,
                    },
                  ]}
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
