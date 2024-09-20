import Navbar from "@/components/dashboard-navbar";
import Sidebar from "@/components/dashboard-sidebar";

import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";


const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={cn("h-full relative bg-white")}>
      <div className="hidden h-full md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 rounded-br-lg rounded-tr-lg mt-4 mb-4 ml-2">
        <Sidebar />
      </div>
      <main className={cn("md:pl-64 md:ml-2")}>
        <Navbar />
        <div className="max-h-screen rounded-tl-lg bg-white">{children}</div>
      </main>
      <Toaster />
    </div>
  );
};

export default DashboardLayout;