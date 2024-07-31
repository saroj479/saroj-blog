import Image from "next/image";

export const CustomImage = ({ src = "", alt = "", ...rest }) => {
  return (
    <Image
      src={src}
      alt={alt}
      height={80}
      width={100}
      style={{ height: "auto", width: "auto" }}
      className="text-xs"
      {...rest}
    />
  );
};
