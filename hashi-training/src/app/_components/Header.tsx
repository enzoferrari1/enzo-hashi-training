"use client";
import Image from "next/image";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Authentication from "./Authentication";
import { useAuthContext } from "../_context/AuthProvider";
function Header() {
  const { user } = useAuthContext();
  return (
    <div className="flex justify-between m-4">
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src="/logo.jpg" width={40} height={40} />
          <AvatarFallback>HT</AvatarFallback>
        </Avatar>
        <h2 className="text-bold text-xl">Hashi Training</h2>
      </div>
      {!user ? (
        <Authentication>
          <Button>Get Started!</Button>
        </Authentication>
      ) : (
        <Button>
          <Image
            src={user?.photoURL ?? "/user.svg"}
            alt="userImage"
            width={30}
            height={30}
            className="rounded-full"
          ></Image>
          Dashboard
        </Button>
      )}
    </div>
  );
}

export default Header;
