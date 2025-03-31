"use client";
import React, { useState } from "react";
import Topic from "./_components/Topic";
import Preview from "./_components/Preview";
import VideoStyle from "./_components/VideoStyle";

interface FormData {
  title: string;
  topic: string;
  script: string;
  style: string;
}

function CreateVideo() {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    topic: "",
    script: "",
    style: "",
  });

  const onHandleInputChange = (fieldName: string, fieldValue: any) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
    console.log(formData);
  };
  return (
    <div className="">
      <h2 className="text-xl py-4 mb-2 border-b border-gray-700">
        Create New Video!
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3">
        <div className="col-span-2 px-2">
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
          {/* Captions */}
        </div>
        <Preview />
      </div>
    </div>
  );
}

export default CreateVideo;
