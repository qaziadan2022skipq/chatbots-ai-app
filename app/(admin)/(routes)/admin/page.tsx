"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { User2Icon } from "lucide-react";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const page = () => {
  const [users, setUsers] = useState<any>([]);
  const { toast } = useToast();

  useEffect(() => {
    getAllUsers();
  }, []);
  const getAllUsers = async () => {
    const signedupUsers = await axios.get("/api/getAllUsersClerk");
    console.log(signedupUsers.data.users.data);
    const currentUsers = signedupUsers.data.users.data.filter((user: any) => {
      if (user.publicMetadata.role !== "admin") {
        return user;
      }
    });
    setUsers(currentUsers);
  };

  const allowUser = async (userId: string) => {
    const response = await axios.post("/api/admin-add-metadata", {
      userId: userId,
      metadata: "user",
    });
    toast({
      variant: "default",
      title: "User Unblocked",
      description: "User is allowed to use website",
    });
  };
  const blockUser = async (userId: string) => {
    const response = await axios.post("/api/admin-add-metadata", {
      userId: userId,
      metadata: "noUser",
    });
    toast({
      variant: "destructive",
      title: "User Blocked",
      description: "User is not allowed to use website",
    });
  };

  const allowUserSalesCases = async (userId: string) => {
    try {
      await axios.post("/api/admin-make-user-pro", {
        userId: userId,
      });

      await axios.post("/api/admin-add-metadata-cases", {
        userId: userId,
        metadata: "allow",
      });

      toast({
        variant: "default",
        title: "User Unblocked",
        description: "User is allowed to use website",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please try again later",
      });
    }
  };
  const blockUserSalesCases = async (userId: string) => {
    try {
      await axios.post("/api/admin-block-user-pro", {
        userId: userId,
      });

      await axios.post("/api/admin-add-metadata-cases", {
        userId: userId,
        metadata: "notAllowed",
      });

      toast({
        variant: "default",
        title: "User Unblocked",
        description: "User is blocked to use website",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please try again later",
      });
    }
  };
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 px-4 md:px-32 overflow-scroll lg:overflow-hidden">
        {users.map((user: any, index: any) => (
          <div key={index}>
            <Card
              onClick={() => ""}
              key={index}
              className="p-3 border-black/20 flex items-start justify-between hover:shadow-md transition cursor-pointer"
            >
              <div className="flex flex-col w-full items-start gap-x-4">
                <div className="flex items-center gap-x-2 justify-between">
                  <div className={cn("p-2 w-ft rounded-md bg-sky-500/90")}>
                    <User2Icon className={cn("w-8 h-8 text-white")} />
                  </div>

                  <div className="font-normal text-sm">
                    <Label className="font-semibold">Email: </Label>
                    {user.emailAddresses[0].emailAddress}
                  </div>
                </div>
                <div className="flex items-center gap-x-2 mt-2">
                  <div className="flex gap-x-2">
                    {user.publicMetadata.role === "" ? (
                      <Button
                        onClick={() => allowUser(user.id)}
                        className="bg-sky-500"
                      >
                        Allow
                      </Button>
                    ) : (
                      <Button
                        onClick={() => blockUser(user.id)}
                        className="bg-sky-500"
                      >
                        Block
                      </Button>
                    )}
                  </div>
                  <div className="flex gap-x-2">
                    <Button
                      onClick={() => allowUserSalesCases(user.id)}
                      className={cn(
                        user.publicMetadata.seeCases === "allow"
                          ? "bg-black/50"
                          : "bg-sky-500"
                      )}
                    >
                      Allow Access To Sales Cases
                    </Button>
                    <Button
                      onClick={() => blockUserSalesCases(user.id)}
                      className={cn(
                        "bg-sky-500",
                        user.publicMetadata.seeCases === "allow"
                          ? "bg-sky-500"
                          : "bg-black/50"
                      )}
                    >
                      Block Access To Sales Cases
                    </Button>
                  </div>
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
