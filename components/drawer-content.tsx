"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Menu } from "lucide-react";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export function DrawerDemo() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (path: string) => {
    router.push(path);
    setOpen(false);
  };

  const isActive = (path: string) => pathname === path;

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-50"
        onClick={() => setOpen(true)}
      >
        <Menu className="h-4 w-4" />
      </Button>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Navigation</DrawerTitle>
          </DrawerHeader>
          <div className="p-4 space-y-2">
            <Button
              variant={isActive("/dashboard") ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => handleNavigation("/dashboard")}
            >
              Dashboard
            </Button>
            <Button
              variant={isActive("/upload") ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => handleNavigation("/upload")}
            >
              Upload Data
            </Button>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
