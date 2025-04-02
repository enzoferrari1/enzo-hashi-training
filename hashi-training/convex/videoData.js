import { v } from "convex/values";
import { mutation } from "./_generated/server";

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
    });
    return result;
  },
});
