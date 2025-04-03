import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";

export async function POST(req: any) {
  const formData = await req.json();

  const result = await inngest.send({
    name: "generate-video",
    data: { ...formData },
  });
  return NextResponse.json({ result: result });
}
