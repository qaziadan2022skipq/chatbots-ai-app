"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";

import {
  BookAIcon,
  Check,
  // Code,
  FileImage,
  ImageDownIcon,
  Mail,
  // MailCheckIcon,
  MessageSquare,
  // Music,
  PenIcon,
  SmileIcon,
  SpeechIcon,
  // VideoIcon,
  Zap,
} from "lucide-react";

import { DialogContent, DialogTitle } from "@/components/ui/dialog";

import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import axios from "axios";
import { useProModal } from "@/hooks/use-pro-modal";

const tools = [
  {
    label: "Chat with Rachel",
    icon: MessageSquare,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
  {
    label: "Easy Learning",
    icon: BookAIcon,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  // {
  //   label: "Music Generation",
  //   icon: Music,
  //   color: "text-emerald-500",
  //   bgColor: "bg-emerald-500/10",
  // },
  {
    label: "Image Generator",
    icon: FileImage,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
  },
  // {
  //   label: "Video Generation",
  //   icon: VideoIcon,
  //   color: "text-orange-700",
  //   bgColor: "bg-orange-700/10",
  // },
  {
    label: "Explore Feelings",
    icon: SmileIcon,
    color: "text-green-700",
    bgColor: "bg-green-700/10",
  },
  {
    label: "Social Captions",
    icon: PenIcon,
    bgColor: "bg-pink-700/10",
    color: "text-pink-400",
  },
  {
    label: "Email Writer",
    icon: Mail,
    bgColor: "bg-cyan-700/10",
    color: "text-cyan-400",
  },
  {
    label: "Text to Speech",
    icon: SpeechIcon,
    color: "text-green-300",
    bgColor: "bg-green-500/10",
  },
  {
    label: "Talk to Image",
    icon: ImageDownIcon,
    color: "text-cyan-700",
    bgColor: "bg-cyan-600/10",
  },
  // {
  //   label: "Cover Letter ",
  //   icon: MailCheckIcon,
  //   color: "text-gray-500",
  //   bgColor: "bg-gray-700/10",
  // },
];

export const ProModal = () => {
  const proModal = useProModal();
  const [loading, setLoading] = useState(false);

  const onSubscribe = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/stripe");
      window.location.href = response.data.url;
    } catch (error) {
      console.log("STRIPE_CLIENT_ERROR", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
            <div className="flex items-center gap-x-2 font-bold py-1">
            Unauthorized User
            
            </div>
          </DialogTitle>
          <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
            <p>Dear User</p>
            <p>You are not allowed by admin to user the website</p>
            <p>Please contact admin to get access</p>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          {/* {!loading ? (
            <Button className="w-full bg-purple-600" onClick={onSubscribe}>
              Upgrade
              <Zap className="w-4 h-4 ml-2 fill-white" />
            </Button>
          ) : (
            <LoaderStripe />
          )} */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};