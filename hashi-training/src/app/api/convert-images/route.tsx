import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { imageUrls } = await req.json();

    if (!Array.isArray(imageUrls)) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const convertImageToBase64 = async (url: string): Promise<string> => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to fetch ${url}`);

        const buffer = await response.arrayBuffer();
        const base64 = Buffer.from(buffer).toString("base64");

        // Extract the content type from response headers
        const contentType = response.headers.get("content-type") || "image/png";

        return `data:${contentType};base64,${base64}`;
      } catch (error) {
        console.error("Error converting image:", url, error);
        return "";
      }
    };

    const base64Images = await Promise.all(imageUrls.map(convertImageToBase64));

    return NextResponse.json({ images: base64Images });
  } catch (error) {
    return NextResponse.json(
      { error: `Internal Server Error: ${error}` },
      { status: 500 }
    );
  }
}
