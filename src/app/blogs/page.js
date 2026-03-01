import { BlogCategoryItem } from "@/components/BlogCategory";
import { BlogSortFilter } from "@/components/BlogSortFilter";
import { BlogItem } from "@/components/section";
import { T } from "@/components/T";
import { Container, Section } from "@/components/ui";
import {
    BLOG_BY_CATEGORY_POPULAR_QUERY,
    BLOG_BY_CATEGORY_QUERY,
    CATEGORIES_QUERY,
    PARTIAL_BLOGS_QUERY,
    POPULAR_BLOGS_QUERY,
} from "@/constants/sanity-queries";
import { sanityFetch } from "@/utils/sanity";
import { Suspense } from "react";
import { headingFont } from "../fonts";

const Blogs = async ({ searchParams }) => {
  let blogs = [];
  const { category, sort = "recent" } = searchParams;
  const isPopular = sort === "popular";
  const categoryRegex = `^${category}$`;

  const categories = await sanityFetch({ query: CATEGORIES_QUERY });

  if (category) {
    blogs = await sanityFetch({
      query: isPopular ? BLOG_BY_CATEGORY_POPULAR_QUERY : BLOG_BY_CATEGORY_QUERY,
      params: { category: categoryRegex },
    });
  } else {
    blogs = await sanityFetch({
      query: isPopular ? POPULAR_BLOGS_QUERY : PARTIAL_BLOGS_QUERY,
    });
  }

  return (
    <Section>
      <Container>
        <h1
          className={`mb-6 text-2xl font-bold capitalize ${headingFont.className}`}
        >
          {category ?? "Recent"} blogs
        </h1>

        {/* Sort filter: Recent / Popular */}
        <Suspense fallback={null}>
          <BlogSortFilter category={category} />
        </Suspense>

        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
          <div className="grid w-full grid-cols-1 gap-4 sm:w-2/3">
            {blogs?.length === 0 && (
              <div className="w-full">
                <T k="blog.notAvailable" fallback="Blogs are not available" />
              </div>
            )}
            {blogs?.map((blog) => (
              <BlogItem key={blog?.slug} blog={blog} />
            ))}
          </div>
          <div className="sticky top-20 w-full rounded-xl border p-4 border-secondary-10 bg-accent1-5 sm:w-1/3">
            <h2 className="mb-4 text-lg font-bold">
              <T k="blog.exploreCategories" fallback="Explore Categories" />
            </h2>
            <div className="flex flex-wrap gap-2">
              {categories?.map(({ title }) => (
                <BlogCategoryItem key={title} category={title} size="lg" />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default Blogs;
