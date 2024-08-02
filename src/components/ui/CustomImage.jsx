import { IMAGE_NOT_AVAILABLE_URL } from "@/constants";
import { cn } from "@/utils/cn";
import Image from "next/image";

export const CustomImage = ({ src = null, alt = "", className, ...rest }) => {
  return (
    <Image
      src={src ?? IMAGE_NOT_AVAILABLE_URL}
      alt={alt}
      height={500}
      width={500}
      style={{ height: "auto", width: "auto" }}
      priority
      quality={100}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      {...rest}
      className={cn(
        "text-xs object-cover object-center bg-accent1-10",
        className
      )}
    />
  );
};
