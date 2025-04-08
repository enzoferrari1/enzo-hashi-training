import React from "react";
import { VideoData } from "../../dashboard/_components/VideoList";
import { ArrowLeft, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface VideoInfoProps {
  videoData: VideoData | null;
}

function VideoInfo({ videoData }: VideoInfoProps) {
  return (
    <div className="p-4 border rounded-md">
      <Link href={"/dashboard"}>
        <h2 className="flex gap-2 items-center">
          <ArrowLeft />
          Back to Dashboard
        </h2>
      </Link>
      <div className="flex flex-col gap-3">
        <h2 className="mt-5">Project name: {videoData?.title}</h2>
        <p className="text-gray-400 text-sm">Script: {videoData?.script}</p>
        <h2 className="">Video Style: {videoData?.imageStyle}</h2>

        <Button disabled={true}>
          <Download /> Export and Download
        </Button>
      </div>
    </div>
  );
}

export default VideoInfo;
