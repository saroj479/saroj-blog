import { headingFont } from "@/app/fonts";
import { PARTIAL_BLOGS_QUERY } from "@/constants/sanity-queries";
import { formatDate } from "@/utils/helpers";
import { sanityFetch, urlFor } from "@/utils/sanity";
import Link from "next/link";
import { BlogCategory } from "../BlogCategory";
import { Container, CustomImage, Icon, Section } from "../ui";
import { HighlightedSection } from "./HighlightedSection";

const BlogItem = ({ blog }) => {
  return (
    <article>
      <Link
        href={`/blogs/${blog?.slug}`}
        as={`/blogs/${blog?.slug}`}
        title={blog?.title}
        className="animation flex flex-col gap-2 overflow-hidden rounded-xl border p-2 border-secondary-10 hover:bg-secondary-5 md:p-4 lg:flex-row lg:items-center lg:justify-between lg:gap-4"
      >
        <CustomImage
          src={urlFor(blog?.blogImage)}
          alt={blog?.title}
          className="!h-40 !w-full overflow-hidden rounded-lg md:!h-48 lg:!h-32 lg:!w-40 lg:!min-w-40"
        />
        <div>
          <p className="mb-1 flex items-center gap-x-1 text-xs text-secondary">
            <Icon icon="clock" />
            {formatDate(blog?.publishedAt)}
          </p>
          <h3
            className={`line-clamp-1 font-bold !leading-tight lg:text-lg ${headingFont.className}`}
          >
            {blog?.title}
          </h3>
          <BlogCategory categories={blog?.categories} />
          <p className="mt-3 line-clamp-3 text-sm text-secondary md:line-clamp-4 lg:line-clamp-2">
            {blog?.shortDescription}
          </p>
        </div>
      </Link>
    </article>
  );
};

export const BlogSection = async () => {
  const blogs = await sanityFetch({ query: PARTIAL_BLOGS_QUERY });

  return (
    <>
      <HighlightedSection blog={blogs[1]} />
      <Section>
        <Container>
          <h2 className={`mb-6 text-2xl font-bold ${headingFont.className}`}>
            Recent Blogs
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {blogs?.map((blog) => (
              <BlogItem key={blog?.slug} blog={blog} />
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
};
