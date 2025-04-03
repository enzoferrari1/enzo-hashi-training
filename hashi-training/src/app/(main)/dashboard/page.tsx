import { VideoList } from "./_components/VideoList";

// This is a mock function - replace with your actual data fetching logic
async function getVideos() {
  // Example data
  return [
    {
      id: "1",
      title: "How to Cook Pasta",
      topic: "Cooking",
      imageStyle: "Realistic",
      voice: "Female",
      images: ["/placeholder.svg?height=600&width=400"],
      uid: "user123",
      createdBy: "John Doe",
      status: "completed",
    },
    {
      id: "2",
      title: "Top 10 Travel Destinations",
      topic: "Travel",
      imageStyle: "Cinematic",
      voice: "Male",
      uid: "user123",
      createdBy: "John Doe",
      status: "pending",
    },
    {
      id: "3",
      title: "Beginner's Guide to Photography",
      topic: "Photography",
      imageStyle: "Artistic",
      voice: "Female",
      images: ["/placeholder.svg?height=600&width=400"],
      uid: "user123",
      createdBy: "John Doe",
      status: "completed",
    },
    {
      id: "4",
      title: "Morning Routine Tips",
      topic: "Lifestyle",
      imageStyle: "Natural",
      voice: "Female",
      images: ["/placeholder.svg?height=600&width=400"],
      uid: "user123",
      createdBy: "John Doe",
      status: "completed",
    },
    {
      id: "5",
      title: "Home Workout Guide",
      topic: "Fitness",
      imageStyle: "Energetic",
      voice: "Male",
      images: ["/placeholder.svg?height=600&width=400"],
      uid: "user123",
      createdBy: "John Doe",
      status: "completed",
    },
  ];
}

export default async function VideosPage() {
  const videos = await getVideos();

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
