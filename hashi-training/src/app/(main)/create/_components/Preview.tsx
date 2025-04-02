import React from "react";
import { FormData } from "../page";
import { CAPTION_STYLES, VIDEO_STYLES } from "@/constants";
import Image from "next/image";

interface PreviewProps {
  formData: FormData;
}
function Preview({ formData }: PreviewProps) {
  const selectVideoStyle =
    formData && VIDEO_STYLES.find((item) => item.name === formData?.style);
  const selectCaptionStyle =
    formData && CAPTION_STYLES.find((item) => item.name === formData?.caption);
  return (
    <div className="p-4 rounded-sm">
      {selectVideoStyle?.image && (
        <div className="relative">
          <h2 className="mb-4 text-xl">Preview</h2>
          <Image
            src={selectVideoStyle?.image}
            alt={selectVideoStyle?.name}
            width={1000}
            height={300}
            className="rounded-lg w-full h-[70vh] object-cover"
          />
          <h2
            className={`${selectCaptionStyle?.style} absolute w-full bottom-8 text-center`}
          >
            {selectVideoStyle?.name}
          </h2>
        </div>
      )}
    </div>
  );
}

export default Preview;
