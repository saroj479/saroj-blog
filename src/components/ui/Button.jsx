import { socialMedias } from "@/constants";
import Link from "next/link";
import { CustomImage } from "./CustomImage";

export const SocialButtons = () => {
  return (
    <div className="flex gap-2 px-4 py-2">
      {socialMedias.map(({ title, href }) => (
        <Link key={title} href={href} className="animation hover:scale-110">
          <CustomImage
            src={`/assets/icons/${title}.svg`}
            alt={title}
            className="!w-10"
          />
        </Link>
      ))}
    </div>
  );
};
