import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const CreateVideoData = mutation({
  args: {
    title: v.string(),
    topic: v.string(),
    script: v.string(),
    imageStyle: v.string(),
    voice: v.string(),
    caption: v.string(),
    uid: v.id("users"),
    createdBy: v.string(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.insert("videoData", {
      title: args.title,
      topic: args.topic,
      script: args.script,
      imageStyle: args.imageStyle,
      voice: args.voice,
      caption: args.caption,
      uid: args.uid,
      createdBy: args.createdBy,
      status: "pending",
    });
    return result;
  },
});

export const UpdateVideoRecord = mutation({
  args: {
    recordId: v.id("videoData"),
    audioData: v.optional(v.any()),
    images: v.optional(v.any()),
    downloadUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.patch(args.recordId, {
      audioData: args.audioData,
      images: args.images,
      downloadUrl: args.downloadUrl,
      status: "completed",
    });
    return result;
  },
});

export const GetUserVideos = query({
  args: {
    uid: v.id("users"),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("videoData")
      .filter((q) => q.eq(q.field("uid"), args.uid))
      .order("desc")
      .collect();
    return result;
  },
});

export const GetVideoById = query({
  args: {
    videoId: v.id("videoData"),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.get(args.videoId);
    return result;
  },
});
