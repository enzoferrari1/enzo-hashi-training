import { create11Audio } from "@/configs/elevenlabsConfig";
import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  }
);

export const GenerateVideoData = inngest.createFunction(
  { id: "generate-video-data" },
  { event: "generate-video-data" },
  async ({ event, step }) => {
    const { script, topic, title, caption, videoStyle, voice } = event?.data;
    // Generate mp3 audio
    const GenerateAudioFile = await step.run("GenerateAudioFile", async () => {
      return await create11Audio(script, voice);
    });
    return GenerateAudioFile;
  }
);
