"use client";
import React, { useState } from "react";
import Topic from "./_components/Topic";
import Preview from "./_components/Preview";

interface FormData {
  title: string;
  topic: string;
}

function CreateVideo() {
  const [formData, setFormData] = useState<FormData>({ title: "", topic: "" });

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
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="col-span-2">
          {/* Topic and script */}
          <Topic
            formData={formData}
            onHandleInputChange={onHandleInputChange}
          />
          {/* Video Image Style */}
          {/* Voice */}
          {/* Captions */}
        </div>
        <Preview />
      </div>
    </div>
  );
}

export default CreateVideo;
