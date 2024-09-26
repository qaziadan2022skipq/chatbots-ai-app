import AdminSidebar from "@/components/admin-sidebar";
import Navbar from "@/components/dashboard-navbar";
import { ModalProvider } from "@/components/modal-provider";
import { Toaster } from "@/components/ui/toaster";
import { EdgeStoreProvider } from "@/lib/edgestore";
import { cn } from "@/lib/utils";
import { checkRole } from "@/utils/roles";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const { sessionClaims } = auth();
  
  if (!checkRole("admin")) {
    // router.push("/dashboard");
    redirect("/dashboard")
  }
  return (
    <div className={cn("h-full relative bg-[#fafafa]")}>
      <div className="hidden h-[100%-0.5rem] md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 rounded-br-lg rounded-tr-lg my-4 ml-2">
        <AdminSidebar />
      </div>
      <main className={cn("md:pl-72 md:ml-2")}>
        <Navbar />
        <div className="max-h-screen rounded-tl-lg ">
          <EdgeStoreProvider>
            <ModalProvider />
            {children}
          </EdgeStoreProvider>
        </div>
      </main>
      <Toaster />
    </div>
  );
};

export default DashboardLayout;
