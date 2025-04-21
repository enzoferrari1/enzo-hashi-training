import React, { useState, useEffect, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/configs/firebaseConfig";
import { api } from "../../../convex/_generated/api";
import { useMutation } from "convex/react";
import { AuthContext, AuthContextType, ConvexUser } from "./AuthContext";

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<ConvexUser | null>(null);
  const CreateUser = useMutation(api.users.CreateNewUser);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        const result = await CreateUser({
          name: authUser?.displayName || "",
          email: authUser?.email || "",
          pictureUrl: authUser?.photoURL || "",
        });
        setUser(result);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }

  return context;
};

export default AuthProvider;
