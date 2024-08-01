import Link from "next/link";
import { CustomImage } from "./CustomImage";

export const Logo = () => {
  return (
    <Link href="/">
      <CustomImage
        src="/assets/saroj-bartaula-logo.png"
        alt="Saroj Bartaula Blog logo"
        className="!w-20 bg-transparent md:!w-auto"
      />
    </Link>
  );
};
