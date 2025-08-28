import { AppSidebar } from "@/components/app-sidebar"
import HomeNav from "@/components/home-nav"
import SpotlightSlider from "@/components/image-slider"
import PlayBar from "@/components/play-bar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default function Home() {
  return (
    <SidebarProvider className="h-screen w-full bg-black overflow-hidden p-2" 
    // defaultOpen={false}
    >
      <AppSidebar className="py-5 bg-black" />
      <SidebarInset className="bg-background flex flex-col h-[95vh]">
        {/* Navbar fixed at top */}
        <HomeNav />

        {/* Scrollable content */}
        <div className="flex flex-col overflow-y-auto custom-scroll">
          <SpotlightSlider />
          <div className="min-h-screen"></div>
          {/* more scrollable stuff here */}
        </div>

        {/* Fixed Playbar at bottom */}
        <div className="shrink-0">
          <PlayBar />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
