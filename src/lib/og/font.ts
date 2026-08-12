import { readFile } from "fs/promises";
import path from "path";

export const OG_FONT_FAMILY = "Revamped";
export const OG_BODY_FONT_FAMILY = "Inter";

let cachedHeadingFont: Buffer | null = null;

export async function getOgHeadingFont() {
  if (!cachedHeadingFont) {
    cachedHeadingFont = await readFile(path.join(process.cwd(), "src/lib/og/fonts/Revamped.otf"));
  }
  return cachedHeadingFont;
}

// Satori only knows about fonts explicitly passed to it — once ANY custom
// font is registered, text with no matching fontFamily has nothing else to
// fall back to. So body copy needs its own real font too, or it renders in
// the display font as well. Reuses the site's existing body typeface (Inter).
let cachedBodyFont: ArrayBuffer | null = null;

export async function getOgBodyFont(): Promise<ArrayBuffer | null> {
  if (cachedBodyFont) return cachedBodyFont;
  try {
    const css = await fetch("https://fonts.googleapis.com/css2?family=Inter:wght@500", {
      headers: {
        // An old UA gets a single plain woff file per subset instead of woff2,
        // which is simpler for satori to parse (no brotli decompression step).
        "User-Agent":
          "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36",
      },
    }).then((res) => res.text());

    // Pick the "latin" subset specifically (unicode-range starting at U+0000) —
    // the first @font-face block is "cyrillic-ext" and lacks basic Latin glyphs.
    const latinBlock = css.split("@font-face").find((block) => /unicode-range:\s*U\+0000-00FF/.test(block));
    const urlMatch = latinBlock?.match(/src: url\(([^)]+)\)/);
    if (!urlMatch) return null;

    const fontRes = await fetch(urlMatch[1]);
    cachedBodyFont = await fontRes.arrayBuffer();
    return cachedBodyFont;
  } catch {
    return null;
  }
}
