import { AppSidebar } from "@/components/layout/app-sidebar";
import Footer from "@/components/layout/footer";
import HomeMain from "@/components/home/home-main";
import HomeNav from "@/components/layout/home-nav";
import SpotlightSlider from "@/components/home/image-slider";
import PlayBar from "@/components/player/play-bar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import StorySpotlight from "@/components/layout/home-spotlight";
import Csrf from "@/components/backend/csrf";
import { PodcastProvider } from "@/context/use-podcast";
import { findBackend } from "@/helper/findBackend";
import { podcast } from "@/types/models/podcast";

// Fetch API base URL
const API_BASE_URL = findBackend();

export default async function Home() {

  const res = await fetch(`${API_BASE_URL}/api/story/?number=20`);

  const rows: podcast[] = await res.json();

  return (
    <SidebarProvider className="h-screen w-full bg-sidebar overflow-hidden p-2" defaultOpen={false}>

      <Csrf />

      {/* Sidebar */}
      <AppSidebar className="bg-sidebar py-5" />

      {/* Main content */}
      <PodcastProvider>

        <SidebarInset className="flex flex-col bg-background">
          {/* Fixed Navbar at top */}
          <HomeNav />

          {/* Scrollable content */}
          <div className="flex flex-col overflow-y-auto no-scroll gap-6">
            {/* Responsive main + spotlight layout */}
            <div id="home-main" className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-3">
              {/* Left column */}
              <div className="lg:col-span-2 flex flex-col gap-6 min-w-[300px]">
                <HomeMain 
                  rows={rows}
                  type="story"
                />

                <SpotlightSlider />

                <Footer />
              </div>

              {/* Right column (spotlight) */}
              <div className="lg:col-span-1 min-w-[280px] lg:sticky lg:top-4 self-start">
                <StorySpotlight />
              </div>
            </div>
          </div>

          <PlayBar />
        </SidebarInset>
      </PodcastProvider>
    </SidebarProvider>
  );
}
