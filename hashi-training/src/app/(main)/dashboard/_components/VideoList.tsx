"use client";

import Image from "next/image";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useConvex } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { useAuthContext } from "@/app/_context/AuthProvider";
import { Id } from "../../../../../convex/_generated/dataModel";

export interface VideoData {
  _id: Id<"videoData">; // Convex ID type for "videoData" collection
  title: string;
  topic: string;
  script: string;
  imageStyle: string;
  voice: string;
  caption: string;
  uid: Id<"users">;
  createdBy: string;
  status?: string;
  images?: string[]; // Optional array of image URLs
  audioData?: string;
  _creationTime: number;
}

export function VideoList() {
  const [videoList, setVideoList] = useState<VideoData[]>([]);
  const convex = useConvex();
  const { user } = useAuthContext();

  useEffect(() => {
    user && GetUserVideoList();
  }, [user]);

  const GetUserVideoList = async () => {
    const result = await convex.query(api.videoData.GetUserVideos, {
      uid: user?._id,
    });
    setVideoList(result);
    const isPendingVideo = result?.find((item) => item.status == "pending");
    isPendingVideo && GetPendingVideoStatus(isPendingVideo);
  };

  const GetPendingVideoStatus = (pendingVideo: any) => {
    const intervalId = setInterval(async () => {
      const result = await convex.query(api.videoData.GetVideoById, {
        videoId: pendingVideo?._id,
      });

      if (result?.status == "completed") {
        clearInterval(intervalId);
        console.log("Video Process completed");
        GetUserVideoList();
      }
      console.log("still pending");
    }, 5000);
  };

  return (
    <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {videoList.map((video) => (
        <Link
          key={video._id}
          href={`/videos/${video._id}`}
          className="block relative rounded-lg overflow-hidden aspect-[9/16] group hover:opacity-95 transition-opacity"
        >
          {video.status === "pending" ? (
            <div className="flex items-center justify-center h-full bg-muted">
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">Generating</p>
              </div>
            </div>
          ) : video.images && video.images.length > 0 ? (
            <>
              <Image
                src={
                  video.images[0] ||
                  "https://placeholder.pics/svg/300x400/FFFFFF"
                }
                alt={video.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <h3 className="font-medium text-white line-clamp-1">
                  {video.title}
                </h3>
                <p className="text-xs text-white/80 line-clamp-1">
                  {video.topic}
                </p>
                {video._creationTime && (
                  <p className="text-xs text-white/60 mt-1">
                    {new Date(video._creationTime).toLocaleDateString(
                      undefined,
                      {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </p>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full bg-muted">
              <p className="text-sm text-muted-foreground">No image</p>
            </div>
          )}
        </Link>
      ))}
    </div>
  );
}
