"use client";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { MessageCircleCodeIcon, Paperclip } from "lucide-react";
import axios from "axios";

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

const Files = () => {
  const router = useRouter();
  const [files, setFiles] = useState([]);

  useEffect(() => {
    getAllFiles()
  },[])
  const getAllFiles = async () => {
    const files = await axios.get("/api/get-all-files")
    console.log(files.data)
    setFiles(files.data.files)
  }
  return (
    <div className="h-[calc(100vh-5.3rem)] border m-3 rounded-lg pb-3 shadow-md bg-white">
      <div className="mb-8 flex flex-col items-center space-y-4">
        {/* <Image className="my-4" src="/main-logo.png" width={280} height={100} alt="main" /> */}
        <h2 className="text-2xl md:text-4xl font-bold text-center mt-2">
          Hello 👋
        </h2>
        <p className="text-muted-foreground font-light text-small md:text-lg text-center">
          See All Your Files Here
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 px-4 md:px-32 overflow-scroll lg:overflow-hidden">
        {files.map((file, index) => (
          <div key={index}>
            <Card
              onClick={() => router.push(file)}
              key={index}
              className="p-3 border-black/20 items-center flex justify-between hover:shadow-md transition cursor-pointer"
            >
              <div className="flex items-center gap-x-4">
                <div className={cn("p-2 w-ft rounded-md",)}>
                  <Paperclip className={cn("w-8 h-8")} />
                </div>
                <div className="font-semibold">{file + index}</div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Files;
