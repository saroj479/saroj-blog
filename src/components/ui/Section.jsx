import { cn } from "@/utils/cn";

export const Section = ({ children, className }) => {
  return (
    <section className={cn("py-8 sm:py-10 px-2 md:py-14", className)}>
      {children}
    </section>
  );
};
