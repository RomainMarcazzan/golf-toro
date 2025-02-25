"use client";

import { LayoutDashboard, Upload, CloudSunRain, Sun, Moon } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { usePathname, useRouter } from "next/navigation";
import { Switch } from "@/components/ui/switch";
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
            <SidebarMenuItem key={item.href}>
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
            <div className="flex items-center px-3 py-2">
              <Sun className="h-4 w-4 mr-2" />
              <Switch
                checked={theme === "dark"}
                onCheckedChange={(checked) =>
                  setTheme(checked ? "dark" : "light")
                }
              />
              <Moon className="h-4 w-4 ml-2" />
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
