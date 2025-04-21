"use client";
import { audioBufferToDataUrl } from "@remotion/media-utils";
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
import { getWordAlignments } from "../../../../app/_common/utils"; //"@/app/_common/utils";

const CAPTION_STYLES = [
  {
    name: "Youtuber",
    style: "font-bold text-yellow-400 text-3xl tracking-tight",
  },
  {
    name: "Supreme",
    style:
      "font-extrabold text-red-500 text-3xl italic font-['Futura',_sans-serif]",
  },
  {
    name: "Neon",
    style:
      "font-extrabold text-3xl text-white animate-pulse [text-shadow:_0_0_5px_#0ff,_0_0_10px_#0ff,_0_0_15px_#0ff,_0_0_20px_#0ff]",
  },
  {
    name: "Glitch",
    style: "font-black bold text-purple-500 text-3xl",
  },
  {
    name: "Fire",
    style:
      "via-red-500 to-red-700 hover:from-yellow-500 hover:via-red-600 hover:to-red-800 font-bold text-orange-400 text-3xl",
  },
  {
    name: "Futuristic",
    style: "font-bold text-blue-500 text-3xl tracking-widest",
  },
];

interface RemotionCompositionProps {
  videoData: VideoData | null;
  // setDurationInFrames: Function;
}

async function base64ToAudioBuffer(audioBase64: string): Promise<AudioBuffer> {
  const audioCtx = new AudioContext();
  const audioData = Uint8Array.from(atob(audioBase64), (c) => c.charCodeAt(0));
  const buffer = await audioCtx.decodeAudioData(audioData.buffer);
  return buffer;
}

function RemotionComposition({
  videoData,
  // setDurationInFrames,
}: RemotionCompositionProps) {
  const [imageList, setImageList] = useState<any[]>([]);
  const audioData = videoData?.audioData;
  const selectedCaptionStyle =
    videoData &&
    CAPTION_STYLES.find((item) => item.name === videoData?.caption);
  const [audioSrc, setAudioSrc] = useState<string | undefined>();
  const [wordAlignments, setWordAlignments] = useState<any[]>([]);
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  const prevVideoDataRef = useRef<VideoData | null>(null);

  useEffect(() => {
    // Avoid re-running if the same videoData was already processed
    if (!videoData || prevVideoDataRef.current === videoData) return;
    prevVideoDataRef.current = videoData; // Store the reference

    const decodeAndConvert = async () => {
      try {
        if (!audioData) {
          console.log("error decoding, no audioData available");
          return;
        }

        const buffer = await base64ToAudioBuffer(audioData.audio_base64);
        const dataUrl = audioBufferToDataUrl(buffer);
        // const blobUrl = base64ToBlobUrl(audioData.audio_base64);
        setAudioSrc(dataUrl);
        console.log("audio Url: ", dataUrl);
      } catch (error) {
        console.error("Error parsing audio: ", error);
      }
    };

    const getImageBlobs = async () => {
      if (!videoData) return;

      const imagesUrl = videoData?.images || [];
      const validImagesUrl = imagesUrl.filter(
        (url): url is string => typeof url === "string"
      );
      setImageList(validImagesUrl);
    };
    decodeAndConvert();
    getImageBlobs();
    setWordAlignments(getWordAlignments(audioData?.alignment));
  }, [videoData]);

  useEffect(() => {
    if (videoData) {
      getDurationFrame();
    }
  }, [videoData]);

  const getDurationFrame = () => {
    // Por que esto se ejecuta todo el tiempo?
    const totalDuration =
      audioData.alignment.character_end_times_seconds[
        audioData.alignment.character_end_times_seconds.length - 1
      ] * fps;
    return totalDuration;
  };
  const getCurrentCaption = () => {
    const currentTime = frame / 5;
    const currentCaption = wordAlignments.find(
      (item) => currentTime >= item?.start && currentTime <= item?.end
    );
    return currentCaption ? currentCaption.word : "";
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
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          bottom: 50,
          height: 200,
          textAlign: "center",
        }}
      >
        <h2 className={`text-6xl ${selectedCaptionStyle?.style}`}>
          {getCurrentCaption()}
        </h2>
      </AbsoluteFill>

      {audioSrc && <Audio src={audioSrc} />}
    </div>
  );
}

export default RemotionComposition;
