import { headingFont } from "@/app/fonts";
import { formatDate } from "@/utils/helpers";
import { urlFor } from "@/utils/sanity";
import Link from "next/link";
import { BlogCategory } from "../BlogCategory";
import { Container, CustomImage, Icon, Section } from "../ui";

export const HighlightedSection = ({ blog }) => {
  return (
    <Section className="bg-accent1-10">
      <Container>
        <article className="mx-auto flex h-auto max-w-3xl flex-col gap-2 overflow-hidden sm:flex-row sm:items-center sm:gap-4 lg:justify-between">
          <div className="order-2 lg:order-1">
            <p className="flex items-center gap-1 text-xs font-normal text-secondary">
              <Icon icon="clock" />
              {formatDate(blog?.publishedAt)}
            </p>
            <div
              className={`text-xl font-bold !leading-tight ${headingFont.className}`}
            >
              {blog?.title}
            </div>
            <BlogCategory categories={blog?.categories} />
            <p className="mt-3 text-sm font-light">{blog?.shortDescription}</p>
            <Link
              href={`/blogs/${blog?.slug}`}
              className="animation mt-6 inline-block rounded-lg border px-4 py-2 font-medium text-accent1 bg-accent1-10 border-accent1-80 hover:border-accent1 hover:bg-accent1 hover:text-background"
            >
              Explore more
            </Link>
          </div>
          <CustomImage
            src={urlFor(blog?.blogImage)}
            alt={blog?.title}
            className="lg:animation order-1 !h-40 !w-full overflow-hidden rounded-lg sm:!h-52 lg:order-2 lg:!h-56 lg:!w-72 lg:!min-w-72"
          />
        </article>
      </Container>
    </Section>
  );
};
