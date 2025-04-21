import React from "react";
import { FormData } from "../page";
import { DEFAULT_VOICES_ID } from "@/constants";

interface VoicesProps {
  formData: FormData;
  onHandleInputChange: (fieldName: string, fieldValue: unknown) => void;
}

function Voices({ formData, onHandleInputChange }: VoicesProps) {
  return (
    <div className="py-4">
      <h2 className="">Default Voices</h2>
      <p className="text-sm text-gray-600 pb-2">Select voice style</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {DEFAULT_VOICES_ID.map((voice) => (
          <button
            key={voice.name}
            type="button"
            className={`p-3 rounded-lg border text-left ${formData.voice === voice.name ? "border-primary bg-primary/5" : "border-border"}`}
            onClick={() => {
              onHandleInputChange("voice", voice.name);
            }}
          >
            {voice.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Voices;
