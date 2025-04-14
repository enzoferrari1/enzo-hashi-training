import { create11Audio } from "@/configs/elevenlabsConfig";
import { inngest } from "./client";
import { GENERATE_IMAGES_PROMPT_SCRIPT } from "@/constants";
import { generateImages, generateScript } from "@/configs/openaiConfig";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../convex/_generated/api";
import { getFunctions, renderMediaOnLambda } from "@remotion/lambda/client";
import { uploadImagesFromUrls } from "@/s3/uploadImage";

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
      const imagesUrl = await generateImages(imagesPrompt);
      return imagesUrl;
    });

    const UploadImagesToS3 = await step.run("UploadImagesToS3", async () => {
      const imagesUrl = GenerateImages;
      try {
        const uploadedImagesUrl = await uploadImagesFromUrls(imagesUrl);
        return uploadedImagesUrl;
      } catch (error) {
        return imagesUrl;
      }
    });

    const UpdateDB = await step.run("UpdateDB", async () => {
      console.log("record ID: ", recordId);
      const result = await convex.mutation(api.videoData.UpdateVideoRecord, {
        recordId: recordId,
        audioData: GenerateAudioFile,
        images: UploadImagesToS3,
      });
      return result;
    });
    const RenderVideo = await step.run("RenderVideo", async () => {
      const getDurationFrame = (audioData: any) => {
        const totalDuration = Number(
          (
            audioData.alignment.character_end_times_seconds[
              audioData.alignment.character_end_times_seconds.length - 1
            ] * 5
          ).toFixed(0)
        );
        return totalDuration;
      };
      const durationInFrames = getDurationFrame(GenerateAudioFile);
      const functions = await getFunctions({
        region: "us-east-1",
        compatibleOnly: false,
      });
      const functionName = functions[0].functionName;
      const { renderId, bucketName } = await renderMediaOnLambda({
        region: "us-east-1",
        functionName,
        serveUrl: process.env.NEXT_PUBLIC_REMOTION_AWS_SERVE_URL || "",
        framesPerLambda: 100,
        composition: "videoRender",
        inputProps: {
          videoData: {
            audioData: GenerateAudioFile,
            images: UploadImagesToS3,
            caption: caption,
          },
        },
        frameRange: [0, durationInFrames - 1],
        codec: "h264",
      });
      return {
        result:
          process.env.NEXT_PUBLIC_REMOTION_S3_BUCKET_RESULTS +
          renderId +
          "/out.mp4",
      };
    });

    const UpdateDownloadUrl = await step.run("UpdateDB", async () => {
      console.log("record ID: ", recordId);
      const result = await convex.mutation(api.videoData.UpdateVideoRecord, {
        recordId: recordId,
        audioData: GenerateAudioFile,
        images: UploadImagesToS3,
        downloadUrl: RenderVideo.result,
      });
      return result;
    });

    return RenderVideo;
  }
);
