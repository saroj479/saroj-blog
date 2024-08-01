import { headingFont } from "@/app/fonts";
import { PARTIAL_BLOGS_QUERY } from "@/constants/sanity-queries";
import { formatDate } from "@/utils/helpers";
import { sanityFetch } from "@/utils/sanity";
import Link from "next/link";
import { BlogCategory } from "../BlogCategory";
import { Container, CustomImage, Icon, Section } from "../ui";

const BlogItem = ({ blog }) => {
  return (
    <article>
      <Link
        href={`/blogs/${blog?.slug}`}
        as={`/blogs/${blog?.slug}`}
        title={blog?.title}
        className="group flex flex-col gap-2 overflow-hidden rounded-xl border p-2 border-secondary-10 md:p-4 lg:flex-row lg:items-center lg:justify-between lg:gap-4"
      >
        <CustomImage className="lg:animation !h-40 !w-full overflow-hidden rounded-lg md:!h-48 lg:!h-32 lg:!w-40 lg:!min-w-40 lg:group-hover:scale-110" />
        <div>
          <p className="flex items-center gap-1 text-[10px] text-secondary-80">
            <Icon icon="clock" />
            {formatDate(blog?.publishedAt)}
          </p>
          <h3
            className={`animation line-clamp-1 font-bold !leading-tight group-hover:text-accent1 lg:text-lg ${headingFont.className}`}
          >
            {blog?.title}
          </h3>
          <BlogCategory categories={blog?.categories} />
          <p className="mt-3 line-clamp-3 text-sm font-light md:line-clamp-4 lg:line-clamp-2">
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
    <Section>
      <Container>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {blogs?.map((blog) => (
            <BlogItem key={blog?.slug} blog={blog} />
          ))}
        </div>
      </Container>
    </Section>
  );
};
