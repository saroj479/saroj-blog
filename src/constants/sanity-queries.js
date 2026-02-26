export const CATEGORIES_QUERY = `*[_type == "category"]{title}`;

export const BLOGS_QUERY = `*[_type == "blog"]{_id, title, 'slug': slug.current, blogImage, 'categories': categories[]->title, publishedAt, content} | order(publishedAt desc)`;

export const PARTIAL_BLOGS_QUERY = `*[_type == "blog"]{title, 'slug': slug.current, shortDescription, blogImage, 'categories': categories[]->title, publishedAt} | order(publishedAt desc)`;

export const POPULAR_BLOGS_QUERY = `*[_type == "blog"]{title, 'slug': slug.current, shortDescription, blogImage, 'categories': categories[]->title, publishedAt} | order(publishedAt asc)`;

export const BLOG_QUERY = `*[_type == "blog" && slug.current == $slug][0]{..., 'categories': categories[]->title, shortDescription}`;

export const BLOG_BY_CATEGORY_QUERY = `*[_type == "blog" && categories[]->title match $category]{..., 'slug': slug.current, 'categories': categories[]->title, shortDescription} | order(publishedAt desc)`;

export const BLOG_BY_CATEGORY_POPULAR_QUERY = `*[_type == "blog" && categories[]->title match $category]{..., 'slug': slug.current, 'categories': categories[]->title, shortDescription} | order(publishedAt asc)`;
