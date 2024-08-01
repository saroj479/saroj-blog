const BlogPage = ({ params }) => {
  return (
    <div>
      <h2>Slug: {params.slug}</h2>
    </div>
  );
};

export default BlogPage;
