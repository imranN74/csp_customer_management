import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Navbar } from "@/components/nav-bar";
import { Outlet } from "react-router-dom";

export function MasterPage() {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <header className="sticky flex top-0 h-16 items-center border-b px-6 sm:px-1 justify-between bg-white">
          <SidebarTrigger />
          <div className="mr-4">
            <Navbar />
          </div>
        </header>

        <main className="">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
