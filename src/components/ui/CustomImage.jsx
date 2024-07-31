"use client";

import { IMAGE_NOT_AVAILABLE_URL } from "@/constants";
import { cn } from "@/utils/cn";
import Image from "next/image";
import { forwardRef, useState } from "react";

export const CustomImage = forwardRef(function CustomImage(
  { src = "", fallbackSrc, alt = "", className, ...rest },
  ref
) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      ref={ref}
      src={imgSrc}
      alt={alt}
      onError={() => setImgSrc(IMAGE_NOT_AVAILABLE_URL)}
      height={80}
      width={100}
      style={{ height: "auto", width: "auto" }}
      priority
      {...rest}
      className={cn(
        "text-xs object-cover object-center bg-accent1-10",
        className
      )}
    />
  );
});
