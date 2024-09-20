"use client";

import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useEffect, useState } from "react";
import Sidebar from "./dashboard-sidebar";


const MobileSidebar = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="ghost" size="icon" className="md:hidden text-black">
          <Menu className="text-sky-500" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 text-sky-500">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;