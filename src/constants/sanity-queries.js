export const CATEGORIES_QUERY = `*[_type == "category"]{title}`;

export const BLOGS_QUERY = `*[_type == "blog"]{_id, title, 'slug': slug.current, blogImage, 'categories': categories[]->title, publishedAt, content} | order(_createdAt desc)`;

export const PARTIAL_BLOGS_QUERY = `*[_type == "blog"]{title, 'slug': slug.current, shortDescription, blogImage, 'categories': categories[]->title, publishedAt} | order(_createdAt desc)`;

export const BLOG_QUERY = `*[_type == "blog" && slug.current == $slug][0]{..., 'categories': categories[]->title, shortDescription}`;
