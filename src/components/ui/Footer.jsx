import { T } from "@/components/T";
import { Container, Logo, SocialButtons } from ".";

export const Footer = () => {
  return (
    <footer className="bg-accent1-5">
      <Container className="grid place-content-center py-8">
        <div className="mb-4 flex flex-col items-center">
          <Logo />
          <T
            k="footer.tagline"
            fallback="The Man on a Mission"
            as="p"
            className="mt-1 font-medium"
          />
        </div>
        <SocialButtons />
      </Container>
      <Container className="rounded-t-2xl py-1 text-center bg-background-80">
            <div className="flex flex-col items-center">
              <T
                k="footer.copyright"
                fallback="Copyright © 2024. Saroj Bartaula."
                as="span"
                className="text-sm"
              />
              <a
                href="https://milkywaymarket.shop/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 text-sm text-accent1 underline"
              >
                <T k="footer.shopLink" fallback="Shop at Milky Way Market" />
              </a>
            </div>
      </Container>
    </footer>
  );
};
