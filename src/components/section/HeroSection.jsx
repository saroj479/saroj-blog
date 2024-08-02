import { headingFont } from "@/app/fonts";
import { Container, CustomImage, Section } from "../ui";

export const HeroSection = () => {
  return (
    <Section>
      <Container className="flex flex-col items-center justify-evenly gap-10 sm:flex-row">
        <div>
          <div className="relative inline-block rounded-full border p-3 border-accent1-60">
            <CustomImage
              src="/assets/saroj-bartaula.jpeg"
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
          <p className="mt-2 font-medium xl:text-lg">AI/ML Engineer</p>
          <p className="mt-4 max-w-sm text-balance text-sm xl:text-base">
            I&apos;m on a journey to create my own story. Along the way,
            I&apos;ve tried various things and will continue to do so. My focus
            is on learning and building something that humanity will cherish.
          </p>
        </div>
      </Container>
    </Section>
  );
};
