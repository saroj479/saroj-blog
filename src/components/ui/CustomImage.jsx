import { IMAGE_NOT_AVAILABLE_URL } from "@/constants";
import { cn } from "@/utils/cn";
import Image from "next/image";

export const CustomImage = ({ src = null, alt = "", className, ...rest }) => {
  return (
    <Image
      src={src ?? IMAGE_NOT_AVAILABLE_URL}
      alt={alt}
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
};
