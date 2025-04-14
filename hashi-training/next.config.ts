import type { NextConfig } from "next";
import { webpack } from "next/dist/compiled/webpack/webpack";

const nextConfig: NextConfig = {
  webpack(config) {
    config.module.rules.push(
      {
        test: /\.md$/,
        type: "asset/resource",
      },
      {
        test: /\.d\.ts$/,
        use: "null-loader",
      }
    );

    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /bundle\.ts$/,
        contextRegExp: /@remotion\/renderer/,
      }),
      new webpack.IgnorePlugin({
        resourceRegExp: /\.monorepo/,
      })
    );

    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /^@remotion\/compositor.*$/,
      })
    );

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "oaidalleapiprodscus.blob.core.windows.net",
        pathname: "/private/**",
      },
      {
        protocol: "https",
        hostname: "placeholder.pics",
        pathname: "/svg/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/a/**",
      },
      {
        protocol: "https",
        hostname: "hashi-training-storage.s3.us-east-1.amazonaws.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
