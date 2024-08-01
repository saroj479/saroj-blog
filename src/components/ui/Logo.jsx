import Link from "next/link";
import { CustomImage } from "./CustomImage";

export const Logo = () => {
  return (
    <Link href="/">
      <CustomImage
        src="/assets/saroj-bartaula-logo.png"
        alt="Saroj Bartaula Blog logo"
        className="bg-transparent"
      />
    </Link>
  );
};
