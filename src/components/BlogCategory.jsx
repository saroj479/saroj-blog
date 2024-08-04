"use client";

export const BlogCategory = ({ categories = [], size = "sm" }) => {
  if (!categories.length) return null;

  return (
    <div className="mt-1.5 flex flex-wrap justify-start gap-1">
      {categories?.map((category) => (
        <span
          key={category}
          onClick={() => {
            document.location.href = `/blogs?category=${category?.toLowerCase()}`;
          }}
          title={category}
          className={`cursor-pointer text-nowrap rounded-md text-secondary bg-secondary-10 hover:text-accent1 hover:bg-accent1-10 ${size === "lg" ? "px-3 py-1 text-sm" : "px-1.5 py-0.5 text-xs"}`}
        >
          {category}
        </span>
      ))}
    </div>
  );
};
