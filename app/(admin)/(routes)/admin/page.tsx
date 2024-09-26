"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { User2Icon } from "lucide-react";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { auth } from "@clerk/nextjs/server";
import { useRouter } from "next/navigation";
import { checkRole } from "@/utils/roles";

const page = () => {
  const [users, setUsers] = useState<any>([]);
  const { toast } = useToast();

  useEffect(() => {
    getAllUsers();
  }, []);
  const getAllUsers = async () => {
    const signedupUsers = await axios.get("/api/getAllUsersClerk");
    setUsers(signedupUsers.data.users.data);
    console.log(signedupUsers.data);
  };

  const allowUser = async (userId: string) => {
    const response = await axios.post("/api/admin-allow-user", {
      userId: userId,
    });
    toast({
      variant: "default",
      title: "User Unblocked",
      description: "User is allowed to use website",
    });
  };
  const blockUser = async (userId: string) => {
    const response = await axios.post("/api/admin-block-user", {
      userId: userId,
    });
    toast({
      variant: "destructive",
      title: "User Blocked",
      description: "User is not allowed to use website",
    });
  };
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 px-4 md:px-32 overflow-scroll lg:overflow-hidden">
        {users.map((user: any, index: any) => (
          <div key={index}>
            <Card
              onClick={() => ""}
              key={index}
              className="p-3 border-black/20 flex items-center justify-between hover:shadow-md transition cursor-pointer"
            >
              <div className="flex w-full items-center justify-between gap-x-4">
                <div className={cn("p-2 w-ft rounded-md bg-sky-500/90")}>
                  <User2Icon className={cn("w-8 h-8 text-white")} />
                </div>

                <div className="font-normal text-sm">
                  <Label className="font-semibold">Email: </Label>
                  {user.emailAddresses[0].emailAddress}
                </div>
                <div className="flex gap-x-2">
                  <Button
                    onClick={() => allowUser(user.id)}
                    className="bg-sky-500"
                  >
                    Allow
                  </Button>
                  <Button
                    onClick={() => blockUser(user.id)}
                    className="bg-sky-500"
                  >
                    Block
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
