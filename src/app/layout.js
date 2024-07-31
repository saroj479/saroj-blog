import { Navbar } from "@/components/ui";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const savedTheme = localStorage.getItem('theme') || 'light';
                document.documentElement.setAttribute('data-theme', savedTheme);
              })();
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
