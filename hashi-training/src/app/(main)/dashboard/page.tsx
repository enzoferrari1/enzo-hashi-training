"use client";

import { VideoList } from "./_components/VideoList";

export default function VideosPage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Videos</h1>
          <p className="text-muted-foreground">
            Manage your AI-generated video shorts
          </p>
        </div>

        <VideoList />
      </div>
    </div>
  );
}
