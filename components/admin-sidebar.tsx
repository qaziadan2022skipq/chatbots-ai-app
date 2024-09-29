"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { File, MenuIcon, MessageCircleCodeIcon, UploadCloud, User2Icon } from "lucide-react";

const sidebarLinks = [
  {
    label: "Dashboard",
    icon: MenuIcon,
    href: "/admin",
    color: "text-[#FFFFFF]",
  },
  {
    label: "Upload Files",
    icon: File,
    href: "/upload-file",
    color: "text-[#FFFFFF]",
  },
  {
    label: "Sales Call Preparation",
    icon: MessageCircleCodeIcon,
    href: "/sales-bot",
    color: "text-[#FFFFFF]",
  },
  {
    label: "Sales Call Evaluation",
    icon: MessageCircleCodeIcon,
    href: "/sales-call-bot",
    color: "text-[#FFFFFF]",
  },
  {
    label: "Acquisition",
    icon: MessageCircleCodeIcon,
    href: "/acquisition-bot",
    color: "text-[#FFFFFF]",
  },
  {
    label: "Sales Cases",
    icon: UploadCloud,
    href: "/admin-all-files",
    color: "text-[#FFFFFF]",
  },
];

const AdminSidebar = () => {
  const pathname = usePathname();
  return (
    <div className="space-y-4 py-3 flex flex-col h-full bg-[#FFFFFF] text-white border rounded-xl shadow-md">
      <div className="flex flex-col gap-y-3 px-4 py-2">
        <Link
          href="/chat"
          className="flex justify-center mb-2 text-xl font-bold"
        >
          
          <Image src={'/main-logo.png'} width={130} height={80} alt="mainlogo" />
        </Link>
        <div className="flex flex-col gap-y-2 drop-shadow-md">
          {sidebarLinks.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-xs group flex p-2 w-full justify-start font-medium cursor-pointer hover:text-black hover:bg-white/90 hover:drop-shadow-sm hover:rounded-lg transition",
                pathname === route.href
                  ? "text-black ring-1 rounded-lg"
                  : "text-[#2a3133] rounded-lg"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-6 w-6 rounded-full p-1 mr-3 bg-sky-500", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      {/* <FreeCounter isPro={isPro} apiLimitCount={apiLimitCount} /> */}
    </div>
  );
};
export default AdminSidebar;
