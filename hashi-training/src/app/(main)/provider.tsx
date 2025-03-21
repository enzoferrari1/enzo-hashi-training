"use client";
import { SidebarProvider } from "@/components/ui/sidebar";
import React, { useEffect } from "react";
import { AppSidebar } from "./_components/AppSidebar";
import AppHeader from "./_components/AppHeader";
import { useAuthContext } from "../_context/AuthProvider";
import { useRouter } from "next/navigation";

const MainProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthContext();
  const router = useRouter();
  useEffect(() => {
    CheckUserAuthenticated();
  }, [user]);
  const CheckUserAuthenticated = () => {
    if (!user) {
      router.replace("/");
    }
  };
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full">
        <AppHeader />
        {children}
      </div>
    </SidebarProvider>
  );
};

export default MainProvider;
