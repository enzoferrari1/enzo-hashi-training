import React from "react";
import MainProvider from "./provider";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return <MainProvider>{children}</MainProvider>;
};

export default MainLayout;
