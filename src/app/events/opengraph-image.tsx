import { ImageResponse } from "next/og";
import { ogTemplate, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og/template";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return new ImageResponse(
    ogTemplate({
      title: "Events",
      description:
        "Ideathons, seminars, quizzes, debates, and more — explore what's next.",
      tags: ["Ideathons", "Seminars", "Competitions"],
    }),
    { ...size },
  );
}
