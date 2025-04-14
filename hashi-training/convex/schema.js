import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    pictureUrl: v.string(),
    credits: v.number(),
  }),
  videoData: defineTable({
    title: v.string(),
    topic: v.string(),
    script: v.string(),
    imageStyle: v.string(),
    voice: v.string(),
    caption: v.string(),
    images: v.optional(v.any()),
    audioData: v.optional(v.any()),
    uid: v.id("users"),
    createdBy: v.string(),
    status: v.optional(v.string()),
    downloadUrl: v.optional(v.string()),
  }),
});
