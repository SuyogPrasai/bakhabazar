import { AppSidebar } from "@/components/layout/app-sidebar"
import Footer from "@/components/layout/footer"
import HomeMain from "@/components/home/home-main"
import HomeNav from "@/components/layout/home-nav"
import SpotlightSlider from "@/components/home/image-slider"
import PlayBar from "@/components/player/play-bar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import StorySpotlight from "@/components/layout/home-spotlight"
import Csrf from "@/components/backend/csrf"
import axios from "axios"
import { findBackend } from "@/helper/findBackend"
import { story_general } from "@/types/models/story"

const API_BASE_URL = findBackend();


export default async function Home() {

  const row1 = await axios.get<story_general[]>(`${API_BASE_URL}/api/story/`)
  const row2 = await axios.get<story_general[]>(`${API_BASE_URL}/api/story/`)

  console.log(row1.data)

  return (
    <SidebarProvider
      className="h-screen w-full bg-sidebar overflow-hidden p-2"
      defaultOpen={false}
    >
      <Csrf />
      {/* Sidebar */}
      <AppSidebar className="bg-sidebar py-5" />

      {/* Main content */}
      <SidebarInset className="flex flex-col bg-background">
        {/* Fixed Navbar at top */}
        <HomeNav />

        {/* Scrollable content */}
        <div className="flex flex-col overflow-y-auto no-scroll gap-6">
          {/* Responsive main + spotlight layout */}
          <div
            id="home-main"
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-3"
          >
            {/* Left column */}
            <div className="lg:col-span-2 flex flex-col gap-6 min-w-[300px]">
              <HomeMain row1={row1.data} row2={row2.data}/>

              <SpotlightSlider />

              <HomeMain row1={row1.data} row2={row2.data}/>

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
                ]}
              />
            </div>
          </div>
        </div>

        <PlayBar />

      </SidebarInset>
    </SidebarProvider>
  )
}
