import { IBM_Plex_Mono } from "next/font/google";

/** Logo only — do not use outside `Logo`. */
export const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});
