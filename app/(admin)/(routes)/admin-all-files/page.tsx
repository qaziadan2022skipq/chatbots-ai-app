"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Delete, DeleteIcon, File, Trash2Icon, UploadCloudIcon } from "lucide-react";
import axios from "axios";
import Heading from "@/components/heading";
import { useToast } from "@/hooks/use-toast";

interface File {
  id: string;
  userId: string;
  fileName: string;
  fileUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

const Files = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [adminFiles, setAdminFiles] = useState<File[]>();

  useEffect(() => {
    getAllFiles();
  }, []);
  const getAllFiles = async () => {
    const files = await axios.get("/api/get-all-admin-files");
    console.log(files.data);
    setAdminFiles(files.data.files);
  };

  const handleDeleteFile = async (fileId: string) => {
    try {
      const response = await axios.post("/api/delete-admin-file", {
        fileId: fileId,
      });
      console.log(response.data);
      toast({
        variant: "default",
        title: "Success",
        description: "File deleted Successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "File not deleted. Please try again later",
      });
    }
  };
  return (
    <div className="h-[calc(100vh-5.3rem)] border m-3 rounded-xl p-3 shadow-md bg-white">
      <Heading
        title="Admin Files"
        description="All your uploaded files by admin"
        icon={UploadCloudIcon}
        iconColor="text-sky-500"
        bgColor="bg-sky-500/10"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-4 md:px-2 overflow-hidden">
        {adminFiles?.map((file, index) => (
          <div key={index}>
            <Card
              key={index}
              className="p-2 border-black/20 items-center flex justify-between hover:shadow-md transition cursor-pointer"
            >
              <div className="flex items-center justify-between gap-x-6 w-full">
                <div className="flex items-center justify-between" onClick={() => router.push(file.fileUrl)}>
                  <div className={cn("p-2 w-ft rounded-md")}>
                    <File className={cn("w-6 h-6")} />
                  </div>
                  <div className="font-semibold text-xs">{file.fileName}</div>
                </div>

                <div>
                  <Trash2Icon className="text-red-600 p-1 bg-red-300/40 rounded-lg" onClick={() => handleDeleteFile(file.id)} />
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Files;
