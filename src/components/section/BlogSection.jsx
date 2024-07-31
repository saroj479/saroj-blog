import { createSlug } from "@/utils/helpers";
import Link from "next/link";
import { Container, CustomImage, Section, Skeleton } from "../ui";

const BlogItem = () => {
  return (
    <article>
      <Link
        href={`/blogs/${1}/${createSlug("When Business Becomes Family: Our Inspirational Startup Journey")}`}
        className="group flex flex-col gap-2 rounded-xl border p-2 border-secondary-10 md:p-4 lg:flex-row lg:items-center lg:justify-between lg:gap-4"
      >
        <CustomImage className="lg:animation !h-40 !w-full overflow-hidden rounded-lg md:!h-48 lg:!h-32 lg:!w-40 lg:!min-w-40 lg:group-hover:scale-110" />
        <div>
          <h3 className="animation line-clamp-2 font-bold !leading-tight group-hover:text-accent1 lg:text-lg">
            When Business Becomes Family: Our Inspirational Startup Journey
          </h3>
          <p className="mt-1 text-xs text-secondary-80">26 July 2024</p>
          <p className="mt-3 line-clamp-3 text-sm font-light md:line-clamp-4 lg:line-clamp-2">
            They say that starting a business is like having a child. Well, let
            me tell you, it’s true. Our startup has become our child, and we
            have become its parents. When we embarked on this journey, it was
            filled with excitement and a sense of adventure. We were ready to do
            whatever it takes to make it thrive, just like new parents eagerly
            preparing for their little one’s arrival.
          </p>
        </div>
      </Link>
    </article>
  );
};

export const BlogSection = () => {
  return (
    <Section>
      <Container>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <BlogItem />
          <BlogItem />
          <Skeleton />
        </div>
      </Container>
    </Section>
  );
};
