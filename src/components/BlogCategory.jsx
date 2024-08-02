export const BlogCategory = ({ categories = [], size = "sm" }) => {
  if (!categories.length) return null;

  return (
    <div className="relative z-10 mt-1.5 flex flex-wrap justify-start gap-1">
      {categories?.map((category) => (
        <div
          key={category}
          className={`text-nowrap rounded-md font-normal text-secondary bg-secondary-10 ${size === "lg" ? "px-3 py-1 text-sm" : "px-1.5 py-0.5 text-xs"}`}
        >
          {category}
        </div>
      ))}
    </div>
  );
};
