import OpenAI from "openai";
import pLimit from "p-limit";

const client = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY });

export async function generateScript(prompt: string) {
  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: prompt,
        },
      ],
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.log("OpenAI error: ", error);
    throw new Error("Failed to generate script");
  }
}

const limit = pLimit(1); // Allow only one request at a time

export const generateImages = async (prompts: [string]) => {
  const tasks = prompts.map((prompt) =>
    limit(() =>
      client.images.generate({
        model: "dall-e-3",
        prompt,
        n: 1,
        size: "1024x1024",
      })
    )
  );

  const responses = await Promise.all(tasks);
  const imageUrls = responses.map((res) => res.data[0].url);

  console.log(imageUrls);
};
