const Blog = ({ params }) => {
  return (
    <div>
      <h1>ID: {params.id}</h1>
      <h2>Slug: {params.slug}</h2>
    </div>
  );
};

export default Blog;
