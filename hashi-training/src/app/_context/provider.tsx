"use client";
import { ReactNode } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import AuthProvider from "./AuthProvider";
import ConvexClientProvider from "./ConvexClientProvider";

const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <ConvexClientProvider>
      <AuthProvider>
        <NextThemesProvider
          attribute="class"
          defaultTheme="dark"
          // enableSystem
          disableTransitionOnChange
        >
          {children}
        </NextThemesProvider>
      </AuthProvider>
    </ConvexClientProvider>
  );
};

export default Provider;
