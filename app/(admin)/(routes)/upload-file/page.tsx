"use client";

import { User2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import axios from "axios";
import Heading from "@/components/heading";
import { useToast } from "@/hooks/use-toast";
import { useEdgeStore } from "@/lib/edgestore";

const AdminUploadFiles = () => {
  const { toast } = useToast();
  const { edgestore } = useEdgeStore();

  const handleFileChange = async (event: any) => {
    try {
      const file = event.target.files[0] as File;
      if (file) {
        const data = new FormData();
        if (event.target.files.length < 0) return;
        const res = await edgestore.publicFiles.upload({ file });
        // save data to your database
        const response = await axios.post("/api/save-admin-file", {
          url: res.url,
          filename: file.name,
        });
        console.log(response);
        toast({
          variant: "default",
          title: "Success",
          description: "File uploaded Successfully",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please upload file again",
      });
    }
  };
  return (
    <div className="h-[calc(100vh-5.3rem)] border m-3 rounded-lg p-3 shadow-md bg-white">
      <Heading
        title="Upload File"
        description=""
        icon={User2Icon}
        iconColor="text-sky-500"
        bgColor="bg-sky-500/10"
      />
      <div>
        <Input type="file" onChange={handleFileChange} />
      </div>
    </div>
  );
};

export default AdminUploadFiles;
