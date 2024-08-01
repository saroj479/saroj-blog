export const BlogCategory = ({ categories = [] }) => {
  if (!categories.length) return null;

  return (
    <div className="relative z-10 mt-1 flex flex-wrap justify-start gap-1">
      {categories?.map((category) => (
        <div
          key={category}
          className="text-nowrap rounded-md border px-1.5 py-0.5 text-xs font-normal text-secondary border-secondary-20"
        >
          {category}
        </div>
      ))}
    </div>
  );
};
