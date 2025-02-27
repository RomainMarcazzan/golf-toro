"use client";

import {
  LayoutDashboard,
  Upload,
  CloudSunRain,
  Sun,
  Moon,
  Laptop,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { usePathname, useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
  },
  {
    title: "Upload Data",
    icon: Upload,
    href: "/upload",
  },
  {
    title: "Weather Data",
    icon: CloudSunRain,
    href: "/weather",
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  return (
    <Sidebar>
      <SidebarHeader>
        <h2 className="px-6 text-lg font-semibold">Golf Toro</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href} className="my-2">
              <SidebarMenuButton
                onClick={() => router.push(item.href)}
                isActive={pathname === item.href}
              >
                <item.icon className="h-4 w-4 mr-2" />
                {item.title}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
          <SidebarMenuItem>
            <div className="px-3 py-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    {theme === "light" ? (
                      <Sun className="h-[1.2rem] w-[1.2rem]" />
                    ) : theme === "dark" ? (
                      <Moon className="h-[1.2rem] w-[1.2rem]" />
                    ) : (
                      <Laptop className="h-[1.2rem] w-[1.2rem]" />
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setTheme("light")}>
                    <Sun className="h-4 w-4 mr-2" />
                    Light
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")}>
                    <Moon className="h-4 w-4 mr-2" />
                    Dark
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("system")}>
                    <Laptop className="h-4 w-4 mr-2" />
                    System
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
