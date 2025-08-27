import { AppSidebar } from "@/components/app-sidebar"
import HomeNav from "@/components/home-nav"
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
    <SidebarProvider
      className="min-h-screen w-full p-3 bg-black"
      defaultOpen={false}
    >
      <AppSidebar className="py-5 bg-black" />
      <SidebarInset className="bg-background">
        <HomeNav />
        <PlayBar />
      </SidebarInset>
    </SidebarProvider>
  )
}