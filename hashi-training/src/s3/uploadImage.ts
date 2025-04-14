import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const s3 = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_REGION!,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!,
  },
});

export async function uploadImagesFromUrls(
  imageUrls: string[]
): Promise<string[]> {
  const uploadPromises = imageUrls.map(async (url) => {
    try {
      const response = await axios.get(url, { responseType: "arraybuffer" });
      const buffer = Buffer.from(response.data);
      const contentType = response.headers["content-type"] || "image/png";
      const key = `uploads/images/${uuidv4()}.png`;

      await s3.send(
        new PutObjectCommand({
          Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
          Key: key,
          Body: buffer,
          ContentType: contentType,
        })
      );

      return `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${key}`;
    } catch (err) {
      console.error(`Failed to upload image from ${url}:`, err);
      return null; // or throw, depending on your use case
    }
  });

  const results = await Promise.all(uploadPromises);
  return results.filter((url): url is string => !!url); // remove failed/null ones
}
