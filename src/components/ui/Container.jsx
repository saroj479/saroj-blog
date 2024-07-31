import { cn } from "@/utils/cn";

export const Container = ({ children, className }) => {
  return (
    <div
      className={cn(
        "mx-auto max-w-custom-container bg-red-200 px-4 py-2",
        className
      )}
    >
      {children}
    </div>
  );
};
