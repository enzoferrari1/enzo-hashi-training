import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { MenuItems } from "@/constants";
import Link from "next/link";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center p-2 px-4 gap-3">
          <Image
            src="/logo.jpg"
            alt="logo"
            width={50}
            height={50}
            className="rounded-lg"
          />
          <h2 className="text-xl">Hashi Training</h2>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <Button className="mx-3 mt-2">+ Create new video!</Button>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>
            <h3 className="ml-1">App</h3>
          </SidebarGroupLabel>
          <SidebarMenu>
            {MenuItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <Link href={item.url}>
                  <SidebarMenuButton>
                    <div className="flex items-center gap-2 mx-2">
                      <item.icon />
                      <span>{item.title}</span>
                    </div>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
