"use client";
import React, { useState } from "react";
import Topic from "./_components/Topic";
import Preview from "./_components/Preview";
import VideoStyle from "./_components/VideoStyle";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import Voices from "./_components/Voices";
import Captions from "./_components/Captions";

export interface FormData {
  title: string;
  topic: string;
  script: string;
  style: string;
  voice: string;
  caption: string;
}

function CreateVideo() {
  const CreateInitialVideoRecord = useMutation(api.videoData.CreateVideoData);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    topic: "",
    script: "",
    style: "",
    voice: "",
    caption: "",
  });

  const onHandleInputChange = (fieldName: string, fieldValue: any) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
    console.log(formData);

    const GenerateVideo = async () => {
      console.log(formData);
      if (
        !formData?.topic ||
        !formData?.script ||
        !formData?.script ||
        !formData.style ||
        !formData.voice
      ) {
        console.log("Error: insert all fields");
        return;
      }
    };
  };
  return (
    <div className="">
      <h2 className="text-xl py-4 mb-2 border-b border-gray-700">
        Create New Video!
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3">
        <div className="col-span-2 py-2 pr-6 border-r border-gray-700 rounded-sm">
          {/* Topic and script */}
          <Topic
            formData={formData}
            onHandleInputChange={onHandleInputChange}
          />
          {/* Video Image Style */}
          <VideoStyle
            formData={formData}
            onHandleInputChange={onHandleInputChange}
          />
          {/* Voice */}
          <Voices
            formData={formData}
            onHandleInputChange={onHandleInputChange}
          />
          <Captions
            formData={formData}
            onHandleInputChange={onHandleInputChange}
          />
        </div>
        <Preview formData={formData} />
      </div>
    </div>
  );
}

export default CreateVideo;
