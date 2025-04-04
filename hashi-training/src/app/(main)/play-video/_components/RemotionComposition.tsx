"use client";
import React, { useEffect, useRef, useState } from "react";
import { VideoData } from "../../dashboard/_components/VideoList";
import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

interface RemotionCompositionProps {
  videoData: VideoData | null;
  setDurationInFrames: Function;
}

function base64ToBlobUrl(base64: string, mimeType = "audio/mpeg"): string {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  const blob = new Blob([bytes], { type: mimeType });
  return URL.createObjectURL(blob);
}

function RemotionComposition({
  videoData,
  setDurationInFrames,
}: RemotionCompositionProps) {
  const [imageList, setImageList] = useState<any[]>();
  const audioData = videoData?.audioData;
  const [audioSrc, setAudioSrc] = useState<string | undefined>();
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  const prevVideoDataRef = useRef<VideoData | null>(null);

  useEffect(() => {
    // Avoid re-running if the same videoData was already processed
    if (!videoData || prevVideoDataRef.current === videoData) return;
    prevVideoDataRef.current = videoData; // Store the reference

    const decodeAndConvert = async () => {
      if (!audioData) {
        console.log("error decoding, no audioData available");
        return;
      }

      const blobUrl = base64ToBlobUrl(audioData.audio_base64);
      setAudioSrc(blobUrl);
      console.log("audio Url: ", blobUrl);
    };

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
    decodeAndConvert();
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

          const scale = (index: number) =>
            interpolate(
              frame,
              [startTime, startTime + duration / 2, startTime + duration],
              index % 2 == 0 ? [1, 1.4, 1] : [1.4, 1, 1.4],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );

          return (
            <Sequence key={index} from={startTime} durationInFrames={duration}>
              <Img
                src={item}
                crossOrigin="anonymous"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transform: `scale(${scale(index)})`,
                }}
              />
            </Sequence>
          );
        })}
        {audioSrc && <Audio src={audioSrc} />}
      </AbsoluteFill>
    </div>
  );
}

export default RemotionComposition;
