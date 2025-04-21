import { User } from "firebase/auth";
import { createContext } from "react";
import { Id } from "../../../convex/_generated/dataModel";

export type ConvexUser = {
  _id?: any;
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
