import { Inter, Merriweather } from "next/font/google";

export const bodyFont = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const headingFont = Merriweather({
  weight: ["700", "900"],
  subsets: ["latin"],
  display: "swap",
});
