import { ImageResponse } from "next/og";
import type { ReactElement } from "react";
import { getOgHeadingFont, getOgBodyFont, OG_FONT_FAMILY, OG_BODY_FONT_FAMILY } from "./font";
import { OG_SIZE } from "./template";

export async function renderOgImage(jsx: ReactElement) {
  const [headingFont, bodyFont] = await Promise.all([getOgHeadingFont(), getOgBodyFont()]);

  const fonts: NonNullable<ConstructorParameters<typeof ImageResponse>[1]>["fonts"] = [
    { name: OG_FONT_FAMILY, data: headingFont, style: "normal", weight: 400 },
  ];
  if (bodyFont) {
    fonts.push({ name: OG_BODY_FONT_FAMILY, data: bodyFont, style: "normal", weight: 500 });
  }

  return new ImageResponse(jsx, { ...OG_SIZE, fonts });
}
