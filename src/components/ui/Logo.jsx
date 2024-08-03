"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CustomImage } from "./CustomImage";

export const Logo = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted)
    return <div className="animate-pulse rounded px-10 py-8 bg-accent1-10" />;

  return (
    <Link href="/">
      <CustomImage
        src={
          resolvedTheme === "dark"
            ? "/assets/saroj-bartaula-logo-white.png"
            : "/assets/saroj-bartaula-logo.png"
        }
        alt="Saroj Bartaula Blog logo"
        className="!w-20 bg-transparent md:!w-28"
      />
    </Link>
  );
};
