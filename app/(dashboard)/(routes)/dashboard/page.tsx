"use client";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";
import { MessageCircleCodeIcon } from "lucide-react";

const tools = [
  {
    label: "Realestate Bot",
    icon: MessageCircleCodeIcon,
    href: "/conversation",
    color: "text-white",
    bgColor: "bg-sky-500/90",
  },
  {
    label: "Comemrcial Bot",
    icon: MessageCircleCodeIcon,
    href: "/conversation",
    color: "text-white",
    bgColor: "bg-sky-500/90",
  },
  {
    label: "Productive Bot",
    icon: MessageCircleCodeIcon,
    href: "/conversation",
    color: "text-white",
    bgColor: "bg-sky-500/90",
  },
];

const Dashboard = () => {
  const router = useRouter();
  return (
    <>
      <div className="mb-8 flex flex-col items-center space-y-4">
        <Image className="my-4" src="/main-logo.png" width={280} height={100} alt="main" />
        <h2 className="text-2xl md:text-4xl font-bold text-center mt-2">
          Hello 👋
        </h2>
        <p className="text-muted-foreground font-light text-small md:text-lg text-center">
          The Smartest AI Chatbots Here to Help You!
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 px-4 md:px-32 overflow-scroll lg:overflow-hidden">
        {tools.map((tool, index) => (
          <div key={index}>
            <Card
              onClick={() => router.push(tool.href)}
              key={tool.href}
              className="p-3 border-black/20 items-center flex justify-between hover:shadow-md transition cursor-pointer"
            >
              <div className="flex items-center gap-x-4">
                <div className={cn("p-2 w-ft rounded-md", tool.bgColor)}>
                  <tool.icon className={cn("w-8 h-8", tool.color)} />
                </div>
                <div className="font-semibold">{tool.label}</div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </>
  );
};

export default Dashboard;
