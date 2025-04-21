"use client";
import React, { useCallback, useEffect, useState } from "react";
import RemotionPlayer from "../_components/RemotionPlayer";
import VideoInfo from "../_components/VideoInfo";
import { useConvex } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "../../../../../convex/_generated/dataModel";
import { VideoData } from "../../dashboard/_components/VideoList";

function PlayVideo() {
  const { videoId } = useParams<{ videoId: string }>();
  const convex = useConvex();
  const [videoData, setVideoData] = useState<VideoData | null>(null);

  const getVideoDataById = useCallback(async () => {
    const result = await convex.query(api.videoData.GetVideoById, {
      videoId: videoId as Id<"videoData">,
    });
    console.log(result);
    setVideoData(result);
  }, [convex, videoId]);

  useEffect(() => {
    if (videoId) {
      getVideoDataById();
    }
  }, [videoId, getVideoDataById]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      <div className="">
        <RemotionPlayer videoData={videoData} />
      </div>
      <div className="">
        <VideoInfo videoData={videoData} />
      </div>
    </div>
  );
}

export default PlayVideo;
