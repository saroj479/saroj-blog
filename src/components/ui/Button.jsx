import { socialMedias } from "@/constants";
import Link from "next/link";
import { CustomImage } from "./CustomImage";

export const SocialButtons = () => {
  return (
    <div className="flex gap-2 py-2">
      {socialMedias.map(({ title, href }) => (
        <Link
          key={title}
          href={href}
          target="_blank"
          className="animation hover:scale-110"
        >
          <CustomImage
            src={`/assets/icons/${title}.svg`}
            alt={title}
            className="!w-6 bg-transparent"
          />
        </Link>
      ))}
    </div>
  );
};
