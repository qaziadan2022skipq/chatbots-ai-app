"use client";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";
import { Menu, MessageCircleCodeIcon } from "lucide-react";
import Heading from "@/components/heading";

const tools = [
  {
    label: "Voorbereiding Verkoopgesprek",
    icon: MessageCircleCodeIcon,
    href: "/chatbot1",
    color: "text-white",
    bgColor: "bg-sky-500/90",
  },
  {
    label: "Evaluatie Verkoopgesprek",
    icon: MessageCircleCodeIcon,
    href: "/chatbot2",
    color: "text-white",
    bgColor: "bg-sky-500/90",
  },
  {
    label: "Acquisitie",
    icon: MessageCircleCodeIcon,
    href: "/chatbot3",
    color: "text-white",
    bgColor: "bg-sky-500/90",
  },
];

const Dashboard = () => {
  const router = useRouter();
  return (
    <div className="h-[calc(100vh-5.3rem)] border m-3 rounded-xl p-3 shadow-md bg-white">
      <Heading
        title="Dashboard"
        description="The Sales Studios"
        icon={Menu}
        iconColor="text-sky-500"
        bgColor="bg-sky-500/10"
      />
      <div className="mb-8 flex flex-col items-center space-y-4">
        <Image className="my-4" src="/main-logo.png" width={220} height={100} alt="main" />
        {/* <h2 className="text-2xl md:text-4xl font-bold text-center mt-2">
          Hello 👋
        </h2> */}
        <p className="text-muted-foreground font-light text-small md:text-lg text-center">
        Haal het maximale uit je verkoopgesprek.
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
                <div className="font-semibold text-sm">{tool.label}</div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
