import React, { useState } from "react";
import { Player } from "@remotion/player";
import RemotionComposition from "./RemotionComposition";
import { VideoData } from "../../dashboard/_components/VideoList";
import { useVideoConfig } from "remotion";

interface RemotionPlayerProps {
  videoData: VideoData | null;
}

function RemotionPlayer({ videoData }: RemotionPlayerProps) {
  const [durationInFrames, setDurationInFrames] = useState<number>(100);
  return (
    <div>
      <Player
        component={RemotionComposition}
        durationInFrames={Number(durationInFrames.toFixed(0)) + 100}
        compositionWidth={720}
        compositionHeight={1280}
        fps={30}
        controls
        style={{
          width: "25vw",
          height: "70vw",
        }}
        inputProps={{
          videoData: videoData,
          setDurationInFrames: setDurationInFrames,
        }}
      />
    </div>
  );
}

export default RemotionPlayer;
