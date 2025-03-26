import { User } from "firebase/auth";
import { createContext } from "react";

export type ConvexUser = {
  name: string;
  email: string;
  pictureUrl: string;
  credits: number;
};

export interface AuthContextType {
  user: ConvexUser | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
