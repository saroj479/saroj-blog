export const BlogCategory = ({ categories = [] }) => {
  if (!categories.length) return null;

  return categories?.map((category) => (
    <span
      key={category}
      className="relative z-10 mr-1 mt-1 rounded-md border px-1.5 py-0.5 text-xs border-secondary-40 text-secondary-80 hover:border-accent1 hover:text-accent1"
    >
      {category}
    </span>
  ));
};
