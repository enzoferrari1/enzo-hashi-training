"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import Authentication from "./Authentication";
import { useAuthContext } from "../provider";

function Hero() {
  const { user } = useAuthContext();
  return (
    <div className="p-4 flex flex-col items-center justify-center gap-4">
      <div className="w-full lg:w-1/2 dark:bg-neutral-900 rounded-lg p-6">
        <h2 className="text-4xl text-bold text-center">
          AI Youtube Short Video Generator
        </h2>
        <p className="mt-4 text-center dark:text-gray-200">
          Create AI generated videos based on your input{" "}
        </p>

        <div className="flex justify-center pt-4 gap-3">
          <Button variant="outline">Explore</Button>
          {!user && (
            <Authentication>
              <Button size="lg"> Get Started</Button>
            </Authentication>
          )}
        </div>
      </div>
    </div>
  );
}

export default Hero;
