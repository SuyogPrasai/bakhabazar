import { AppSidebar } from "@/components/app-sidebar"
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
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
          </div>
        </header>
      </SidebarInset>
    </SidebarProvider>
  )
}