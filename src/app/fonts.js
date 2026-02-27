// eslint-disable-next-line camelcase
import { Inter, Merriweather, Noto_Sans_Devanagari } from "next/font/google";

export const bodyFont = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const headingFont = Merriweather({
  weight: ["700", "900"],
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const nepaliFont = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-nepali",
});
