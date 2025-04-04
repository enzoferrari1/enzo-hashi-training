"use client";
import React, { useEffect, useRef, useState } from "react";
import { VideoData } from "../../dashboard/_components/VideoList";
import { AbsoluteFill, Img, Sequence, useVideoConfig } from "remotion";
import { convertImagesToBase64 } from "@/app/_common/utils";

interface RemotionCompositionProps {
  videoData: VideoData | null;
  setDurationInFrames: Function;
}

function RemotionComposition({
  videoData,
  setDurationInFrames,
}: RemotionCompositionProps) {
  const [imageList, setImageList] = useState<any[]>();
  const audioData = videoData?.audioData;
  const { fps } = useVideoConfig();

  // Store the last processed videoData reference
  const prevVideoDataRef = useRef<VideoData | null>(null);

  useEffect(() => {
    // Avoid re-running if the same videoData was already processed
    if (!videoData || prevVideoDataRef.current === videoData) return;
    prevVideoDataRef.current = videoData; // Store the reference

    const getImageBlobs = async () => {
      if (!videoData) return;

      const imagesUrl = videoData?.images || [];
      const validImagesUrl = imagesUrl.filter(
        (url): url is string => typeof url === "string"
      );

      try {
        const response = await fetch("/api/convert-images", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ imageUrls: validImagesUrl }),
        });

        const data = await response.json();
        if (response.ok) {
          setImageList(data.images);
        } else {
          console.error("Error fetching images:", data.error);
        }
      } catch (error) {
        console.error("Failed to fetch image base64:", error);
      }
    };
    getImageBlobs();
  }, [videoData]);

  useEffect(() => {
    videoData && getDurationFrame();
  }, [videoData]);

  const getDurationFrame = () => {
    // Por que esto se ejecuta todo el tiempo?
    const totalDuration =
      audioData.alignment.character_end_times_seconds[
        audioData.alignment.character_end_times_seconds.length - 1
      ] * fps;
    setDurationInFrames(totalDuration);
    return totalDuration;
  };
  return (
    <div>
      <AbsoluteFill>
        {imageList?.map((item, index) => {
          const startTime = (index * getDurationFrame()) / imageList?.length;
          const duration = getDurationFrame() / imageList?.length;

          return (
            <Sequence key={index} from={startTime} durationInFrames={duration}>
              <Img
                src={item}
                crossOrigin="anonymous"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Sequence>
          );
        })}
      </AbsoluteFill>
    </div>
  );
}

export default RemotionComposition;
