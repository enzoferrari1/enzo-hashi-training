"use client";
import { useAuthContext } from "@/app/_context/AuthProvider";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Image from "next/image";
import React from "react";

function AppHeader() {
  const { user } = useAuthContext();
  return (
    <div className="p-4 flex justify-between items-center">
      <SidebarTrigger />
      <Image
        src={user?.photoURL || "/user.svg"}
        alt="user"
        width={30}
        height={30}
        className="rounded-full"
      ></Image>
    </div>
  );
}

export default AppHeader;
