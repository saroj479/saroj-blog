import { headingFont } from "@/app/fonts";
import { Container, CustomImage, Section } from "../ui";

export const HeroSection = () => {
  return (
    <Section className="relative">
      <div className="absolute inset-y-0 left-0 hidden w-1/3 bg-fixed bg-blend-multiply !bg-accent1-80 md:block" />
      <div className="absolute inset-y-0 left-0 hidden w-1/3 bg-gradient-to-l from-[rgba(var(--background-color-rgb),1)] backdrop-blur-3xl md:block" />
      <Container className="relative flex flex-col items-center justify-evenly gap-10 sm:flex-row">
        <div>
          <div className="relative inline-block min-w-72 rounded-full border p-3 bg-background-50 border-accent1-60">
            <CustomImage
              src="/assets/saroj-bartaula.webp"
              alt="Saroj Bartaula"
              className="relative z-20 !h-72 !w-72 rounded-full bg-secondary"
            />
            <div className="absolute -left-4 top-1/3 h-32 w-40 -rotate-45 rounded-full bg-accent1" />
            <div className="absolute right-16 top-2 size-6 rounded-full bg-accent1" />
            <div className="absolute bottom-4 right-16 size-4 rounded-full bg-accent1" />
          </div>
        </div>
        <div className="-mt-4">
          <h1
            className={`flex flex-col font-extrabold tracking-wide ${headingFont.className}`}
          >
            <span className="font-outline-2 text-5xl text-transparent md:text-6xl">
              Hi.
            </span>
            <span className="text-3xl md:text-4xl">
              I&apos;m Saroj <span className="text-accent1">Bartaula</span>
            </span>
          </h1>
          <p className="mt-2 font-medium xl:text-lg">Ideas in Motion</p>
          <p className="mt-4 max-w-sm text-balance text-sm text-secondary xl:text-base">
            Hi,I&apos;m Saroj.I live in the Milky Way galaxy.Driven by curiosity,
            i explore the worlds of technology,storytelling and science.
            Here, I share what i learn and create in the hope of inspiring others to see the world a little differently.
          </p>
        </div>
      </Container>
    </Section>
  );
};
