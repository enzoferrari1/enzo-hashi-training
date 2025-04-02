import React from "react";
import { FormData } from "../page";
import { CAPTION_STYLES } from "@/constants";

interface CaptionsProps {
  formData: FormData;
  onHandleInputChange: (fieldName: string, fieldValue: any) => void;
}

function Captions({ formData, onHandleInputChange }: CaptionsProps) {
  return (
    <div className="py-4">
      <h2 className="">Captions</h2>

      <p className="text-sm text-gray-600 pb-2">Select caption style</p>
      <div className="py-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {CAPTION_STYLES.map((style) => (
          <button
            key={style.name}
            onClick={() => {
              onHandleInputChange("caption", style.name);

              console.log(formData.caption);
            }}
            className={`
                h-16 rounded-lg flex items-center justify-center transition-all
                ${style.style}
                border-2 ${
                  formData.caption === style.name
                    ? "border-blue-500"
                    : "border-transparent hover:border-blue-300"
                }`}
          >
            {style.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Captions;
