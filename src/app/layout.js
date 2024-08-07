import { Footer, Navbar } from "@/components/ui";
import Theme from "@/providers/ThemeProvider";
import { Analytics } from '@vercel/analytics/react';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { bodyFont } from "./fonts";
import "./globals.css";

export const metadata = {
  title: {
    template: "%s | Saroj Bartaula",
    default: "Saroj Bartaula: A personal blog",
  },
  description:
    "Welcome to my blog, a space where I share my insights on various topics including science, technology, Effective Accelerationism, machine learning, space travel, startup experiences, and personal stories. Each post offers a glimpse into my mind and my journey.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={bodyFont.className}>
        <ToastContainer />
        <Theme>
          <Navbar />
          <main>{children}</main>
          <Analytics />
          <Footer />
        </Theme>
      </body>
    </html>
  );
}
