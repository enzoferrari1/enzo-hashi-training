import { generateScript } from "@/configs/openaiConfig";
import { PROMPT_SCRIPT } from "@/constants";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { topic } = await req.json();

    if (!topic) {
      return NextResponse.json({ error: "Topic is required" }, { status: 400 });
    }

    const PROMPT = PROMPT_SCRIPT.replace("{topic}", topic);
    const result = await generateScript(PROMPT);

    try {
      return NextResponse.json(JSON.parse(result || "{}"));
    } catch (parseError) {
      console.log("JSON parse error: ", parseError);
      return NextResponse.json(
        { error: "Invalid response format" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
