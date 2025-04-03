"use client";
import React, { useState } from "react";
import Topic from "./_components/Topic";
import Preview from "./_components/Preview";
import VideoStyle from "./_components/VideoStyle";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import Voices from "./_components/Voices";
import Captions from "./_components/Captions";
import { Button } from "@/components/ui/button";
import { Clapperboard, Loader2Icon } from "lucide-react";
import { useAuthContext } from "@/app/_context/AuthProvider";
import axios from "axios";

export interface FormData {
  title: string | null;
  topic: string | null;
  script: string | null;
  style: string | null;
  voice: string | null;
  caption: string | null;
}

function CreateVideo() {
  const CreateInitialVideoRecord = useMutation(api.videoData.CreateVideoData);
  const [loadingSending, setLoadingSending] = useState(false);

  const { user } = useAuthContext();

  const [formData, setFormData] = useState<FormData>({
    title: null,
    topic: null,
    script: null,
    style: null,
    voice: null,
    caption: null,
  });

  const isFormValid = (data: FormData): boolean => {
    return Object.values(data).every((value) => value !== null);
  };

  const onHandleInputChange = (fieldName: string, fieldValue: any) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
    console.log(formData);
  };
  const GenerateVideo = async () => {
    setLoadingSending(true);
    console.log(formData);
    if (
      !formData?.title ||
      !formData?.topic ||
      !formData?.script ||
      !formData?.caption ||
      !formData?.style ||
      !formData?.voice
    ) {
      console.log("Error: insert all fields");
      return;
    } else {
      const resp = await CreateInitialVideoRecord({
        title: formData.title,
        topic: formData.topic,
        script: formData.script,
        caption: formData.caption,
        imageStyle: formData.style,
        voice: formData.voice,
        uid: user?._id,
        createdBy: user?.email || "",
      });
      console.log(resp);

      const result = await axios.post("/api/generate-video-data", {
        ...formData,
        recordId: resp,
      });
      console.log(result);
      setLoadingSending(false);
    }
  };

  return (
    <div className="">
      <h2 className="text-xl py-4 mb-2 border-b border-gray-700">
        Create New Video!
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="flex flex-col col-span-2 py-2 pr-6 border-r border-gray-700 rounded-sm">
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
          {isFormValid(formData) && (
            <Button
              className="flex items-center mb-4 mx-8"
              onClick={() => {
                GenerateVideo();
              }}
              disabled={loadingSending}
            >
              {loadingSending ? (
                <Loader2Icon className="animate-spin" />
              ) : (
                <Clapperboard />
              )}
              Create video
            </Button>
          )}
        </div>
        <Preview formData={formData} />
      </div>
    </div>
  );
}

export default CreateVideo;
