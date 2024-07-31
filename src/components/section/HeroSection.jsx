import { Container, CustomImage, Section } from "../ui";

export const HeroSection = () => {
  return (
    <Section className="bg-red-300">
      <Container>
        <div className="relative inline-block rounded-full border p-3 border-accent1-60">
          <CustomImage
            src="/assets/saroj-bartaula.webp"
            className="relative z-20 !w-64 rounded-full bg-secondary"
          />
          <div className="absolute -left-4 top-1/3 h-32 w-40 -rotate-45 rounded-full bg-accent1" />
          <div className="absolute right-12 top-2 size-6 rounded-full bg-accent1" />
          <div className="absolute bottom-2 right-16 size-4 rounded-full bg-accent1" />
        </div>
      </Container>
    </Section>
  );
};
