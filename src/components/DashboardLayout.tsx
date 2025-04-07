
import { Outlet } from "react-router-dom";
import { MainNav } from "@/components/MainNav";
import { DashboardSidebar } from "@/components/DashboardSidebar";

export function DashboardLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <div className="flex flex-1">
        <DashboardSidebar />
        <main className="flex-1 md:ml-64 pt-16 md:pt-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
