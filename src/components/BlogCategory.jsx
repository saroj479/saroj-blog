export const BlogCategory = ({ categories = [] }) => {
  if (!categories.length) return null;

  return (
    <div className="mt-1 flex gap-1">
      {categories?.map((category) => (
        <span
          key={category}
          className="rounded-md border px-1.5 py-0.5 text-xs border-secondary-20 text-secondary-80"
        >
          {category}
        </span>
      ))}
    </div>
  );
};
