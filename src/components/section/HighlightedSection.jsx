import { headingFont } from "@/app/fonts";
import { formatDate } from "@/utils/helpers";
import { urlFor } from "@/utils/sanity";
import { BlogCategory } from "../BlogCategory";
import { Container, CustomImage, Icon, Section } from "../ui";

export const HighlightedSection = ({ blog }) => {
  return (
    <Section className="bg-accent1-5">
      <Container>
        <article className="mx-auto flex max-w-3xl flex-col gap-2 overflow-hidden lg:flex-row lg:items-center lg:justify-between lg:gap-4">
          <div>
            <p className="flex items-center gap-1 text-[10px] font-normal text-secondary">
              <Icon icon="clock" />
              {formatDate(blog?.publishedAt)}
            </p>
            <h3
              className={`font-bold !leading-tight lg:text-xl ${headingFont.className}`}
            >
              {blog?.title}
            </h3>
            <BlogCategory categories={blog?.categories} />
            <p className="mt-3 font-light">{blog?.shortDescription}</p>
            <button className="animation mt-6 rounded-lg border px-4 py-2 font-medium text-accent1 bg-accent1-10 border-accent1-80 hover:border-accent1 hover:bg-accent1 hover:text-background">
              Explore more
            </button>
          </div>
          <CustomImage
            src={urlFor(blog?.blogImage)}
            alt={blog?.title}
            className="lg:animation !h-40 !w-full overflow-hidden rounded-lg md:!h-48 lg:!h-56 lg:!w-72 lg:!min-w-72"
          />
        </article>
      </Container>
    </Section>
  );
};
