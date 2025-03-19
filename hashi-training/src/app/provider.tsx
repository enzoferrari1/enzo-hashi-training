"use client";
import { ReactNode, useContext, useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/configs/firebaseConfig";
import { AuthContext, AuthContextType } from "./_context/AuthContext";

import { api } from "../../convex/_generated/api";
import { useMutation } from "convex/react";

const Provider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const CreateUser = useMutation(api.users.CreateNewUser);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      console.log(authUser);
      setUser(authUser);
      if (authUser) {
        const result = await CreateUser({
          name: authUser?.displayName || "",
          email: authUser?.email || "",
          pictureUrl: authUser?.photoURL || "",
        });
        console.log(result);
      }
    });
    return () => unsubscribe();
  }, []);
  return (
    <div>
      <AuthContext.Provider value={{ user }}>
        <NextThemesProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </NextThemesProvider>
      </AuthContext.Provider>
    </div>
  );
};

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }

  return context;
};

export default Provider;
