import React, { useState } from "react";
import { Player } from "@remotion/player";
import RemotionComposition from "./RemotionComposition";
import { VideoData } from "../../dashboard/_components/VideoList";
import { useVideoConfig } from "remotion";

interface RemotionPlayerProps {
  videoData: VideoData | null;
}

function RemotionPlayer({ videoData }: RemotionPlayerProps) {
  console.log(videoData);
  return (
    <div>
      <Player
        component={RemotionComposition}
        durationInFrames={
          Number(
            (
              videoData?.audioData.alignment.character_end_times_seconds[
                videoData?.audioData.alignment.character_end_times_seconds
                  .length - 1
              ] * 5
            ).toFixed(0)
          ) || 1
        }
        compositionWidth={720}
        compositionHeight={1280}
        fps={5}
        controls
        style={{
          width: "25vw",
          height: "70vw",
        }}
        inputProps={{
          videoData: videoData,
        }}
      />
    </div>
  );
}

export default RemotionPlayer;
