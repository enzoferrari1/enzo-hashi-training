import { VIDEO_STYLES } from "@/constants";
import Image from "next/image";
import React from "react";

interface VideoStyleProps {
  formData: { title: string; topic: string; script: string; style: string };
  onHandleInputChange: (fieldName: string, fieldValue: any) => void;
}

function VideoStyle({ formData, onHandleInputChange }: VideoStyleProps) {
  return (
    <div className="py-4">
      <h2 className="">Video Styles</h2>
      <p className="text-sm text-gray-600 pb-2">Select Video style</p>

      <div className="grid grid-cols-3 lg:grid-cols-5 gap-4">
        {VIDEO_STYLES.map((style, index) => (
          <div
            className="relative"
            onClick={() => {
              onHandleInputChange("style", style.name);
            }}
          >
            <Image
              src={style.image}
              alt={style.name}
              key={index}
              width={200}
              height={250}
              className={`object-cover rounded-xl w-[100px] sm:w-[150px] hover:border-2 ${formData.style == style.name ? "border-blue-500" : "border-neutral-400"}`}
            />
            <h2 className="absolute bottom-1 text-center w-full text-neutral-200 lg:text-xl">
              {style.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VideoStyle;
