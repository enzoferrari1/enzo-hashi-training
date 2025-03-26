import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const CreateNewUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    pictureUrl: v.string(),
  },
  handler: async (ctx, args) => {
    // if user already exists
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .collect();

    if (!user[0]?.email) {
      // if not, create new user
      const userData = {
        name: args.name,
        email: args.email,
        pictureUrl: args?.pictureUrl,
        credits: 4,
      };
      const result = await ctx.db.insert("users", userData);
      return userData;
    }
    return user[0];
  },
});
