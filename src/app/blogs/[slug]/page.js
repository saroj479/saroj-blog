import { headingFont } from "@/app/fonts";
import { CustomImage, Section } from "@/components/ui";
import { RichText } from "@/components/ui/RichText";
import { BLOG_QUERY } from "@/constants/sanity-queries";
import { sanityFetch, urlFor } from "@/utils/sanity";
import { PortableText } from "next-sanity";

const BlogPage = async ({ params }) => {
  const blog = await sanityFetch({ query: BLOG_QUERY, params });

  return (
    <Section>
      <div className="mx-auto max-w-3xl">
        <h1
          className={`text-balance text-2xl font-extrabold md:text-4xl ${headingFont.className}`}
        >
          {blog?.title}
        </h1>
        <div className="relative mb-8 mt-6 h-56 rounded-lg md:h-72 xl:-mx-14 xl:h-96">
          <CustomImage
            src={urlFor(blog?.blogImage)}
            alt={blog?.title}
            className="absolute !size-full rounded-lg shadow-sm"
          />
        </div>
        <PortableText value={blog?.content} components={RichText} />
      </div>
    </Section>
  );
};

export default BlogPage;
