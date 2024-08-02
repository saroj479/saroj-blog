"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import { CustomImage } from "./CustomImage";

export const Logo = () => {
  const { resolvedTheme } = useTheme();

  const imgSrc =
    resolvedTheme === "dark"
      ? "/assets/saroj-bartaula-logo-white.png"
      : "/assets/saroj-bartaula-logo.png";

  return (
    <Link href="/">
      <CustomImage
        src={imgSrc}
        alt="Saroj Bartaula Blog logo"
        className="!w-20 bg-transparent md:!w-auto"
      />
    </Link>
  );
};
