import { create11Audio } from "@/configs/elevenlabsConfig";
import { inngest } from "./client";
import { GENERATE_IMAGES_PROMPT_SCRIPT } from "@/constants";
import { generateImages, generateScript } from "@/configs/openaiConfig";
import { NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../convex/_generated/api";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  }
);

export const GenerateVideoData = inngest.createFunction(
  { id: "generate-video" },
  { event: "generate-video" },
  async ({ event, step }) => {
    const { script, topic, title, caption, videoStyle, voice, recordId } =
      event?.data;
    const convex = new ConvexHttpClient(
      process.env.NEXT_PUBLIC_CONVEX_URL || ""
    );
    // Generate mp3 audio
    const GenerateAudioFile = await step.run("GenerateAudioFile", async () => {
      return await create11Audio(script, voice);
    });
    const GenerateImagesScript = await step.run(
      "GenerateImagesScript",
      async () => {
        const PROMPT = GENERATE_IMAGES_PROMPT_SCRIPT.replace(
          "{script}",
          script
        ).replace("{style}", videoStyle);
        const result = await generateScript(PROMPT);
        try {
          return JSON.parse(result || "{}");
        } catch (parseError) {
          console.log("JSON parse error: ", parseError);
          return { error: "Invalid response format" };
        }
      }
    );
    const GenerateImages = await step.run("GenerateImages", async () => {
      const imagesPrompt = GenerateImagesScript;
      const imagesUrl = generateImages(imagesPrompt);
      return imagesUrl;
    });

    const UpdateDB = await step.run("UpdateDB", async () => {
      console.log("record ID: ", recordId);
      const result = await convex.mutation(api.videoData.UpdateVideoRecord, {
        recordId: recordId,
        audioData: GenerateAudioFile,
        images: GenerateImages,
      });
      return result;
    });
    return UpdateDB;
  }
);
