import { urlFor } from "@/utils/sanity";
import Link from "next/link";
import { CustomImage, Icon } from ".";

export const RichText = {
  types: {
    image: ({ value }) => {
      return (
        <div className="my-4">
          <div className="h-44 rounded-lg sm:h-48">
            <CustomImage
              src={urlFor(value)}
              alt={value.alt}
              className={`mx-auto !size-full rounded-lg shadow-lg`}
            />
          </div>
          {value?.caption && <small>{value?.caption}</small>}
        </div>
      );
    },
  },

  block: {
    h1: ({ children }) => <h1 className="text-xl">{children}</h1>,
    blockquote: ({ children }) => (
      <blockquote className="relative mx-auto my-8 max-w-sm rounded-lg border px-8 py-4 text-center italic border-accent1-40">
        <span className="absolute -top-3 left-2 bg-background p-0.5 text-accent1">
          <Icon icon="quote" />
        </span>
        {children}
      </blockquote>
    ),
    p: ({ children }) => (
      <p className="mt-6 text-sm lg:text-base">{children}</p>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const selfLink = value.href.startsWith("/");
      const rel = !selfLink ? "noreferrer noopener" : undefined;
      const target = !selfLink ? "_blank" : "";
      return (
        <Link
          href={value.href}
          rel={rel}
          target={target}
          className="animation font-medium text-accent1 underline-offset-0 hover:underline hover:underline-offset-2"
        >
          {children}
        </Link>
      );
    },
  },
};
