"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

import { Montserrat } from "next/font/google";
import { MenuIcon, MessageCircleCodeIcon, UploadCloud, User2Icon } from "lucide-react";

const monserrat = Montserrat({ weight: "500", subsets: ["latin"] });

const sidebarLinks = [
  {
    label: "Dashboard",
    icon: MenuIcon,
    href: "/dashboard",
    color: "text-[#FFFFFF]",
  },
  {
    label: "Voorbereiding Verkoopgesprek",
    icon: MessageCircleCodeIcon,
    href: "/chatbot1",
    color: "text-[#FFFFFF]",
  },
  {
    label: "Evaluatie Verkoopgesprek",
    icon: MessageCircleCodeIcon,
    href: "/chatbot2",
    color: "text-[#FFFFFF]",
  },
  {
    label: "Acquisitie",
    icon: MessageCircleCodeIcon,
    href: "/chatbot3",
    color: "text-[#FFFFFF]",
  },
  {
    label: "Uplaoded Files",
    icon: UploadCloud,
    href: "/files",
    color: "text-[#FFFFFF]",
  },
  {
    label: "Manage Account",
    icon: User2Icon,
    href: "/manage-account",
    color: "text-[#FFFFFF]",
  },
];

const Sidebar = () => {
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
export default Sidebar;
