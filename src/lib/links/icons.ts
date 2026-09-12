import { Briefcase, Globe, Mail, Video, Link as LinkIcon } from "lucide-react";
import {
  SiInstagram,
  SiX,
  SiGoogleforms,
  SiWhatsapp,
  SiYoutube,
  SiDiscord,
  SiTelegram,
  SiGithub,
} from "@icons-pack/react-simple-icons";
import { LinkIcon as LinkIconType } from "./types";

// Icons are stored on a link as a string key (DB can't hold a component
// reference) and resolved to a component here. Add new options by adding a
// key below — it becomes selectable in the admin icon picker automatically.
export const ICON_MAP: Record<string, LinkIconType> = {
  globe: Globe,
  mail: Mail,
  briefcase: Briefcase,
  video: Video,
  link: LinkIcon,
  instagram: SiInstagram,
  x: SiX,
  "google-forms": SiGoogleforms,
  whatsapp: SiWhatsapp,
  // simple-icons removed the LinkedIn mark after LinkedIn's 2023 takedown request
  linkedin: Briefcase,
  youtube: SiYoutube,
  discord: SiDiscord,
  telegram: SiTelegram,
  github: SiGithub,
};

export const ICON_KEYS = Object.keys(ICON_MAP);

export function resolveIcon(key: string | null | undefined): LinkIconType | undefined {
  if (!key) return undefined;
  return ICON_MAP[key];
}
