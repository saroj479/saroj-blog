import Link from "next/link";
import { Container, Logo, SocialButtons } from ".";

export const Footer = () => {
  return (
    <footer className="bg-accent1-5">
      {/* <div className="absolute inset-0 -top-5 bg-gradient-to-r backdrop-blur-sm" /> */}

      <Container className="py-8">
        <div className="mb-4">
          <Logo />
          <p className="mt-1">The Man on a Mission</p>
        </div>
        <SocialButtons />
      </Container>
      <div className="relative rounded-t-xl border-t bg-accent1 text-center text-background border-secondary-10">
        <Container>
          <span className="text-xs">
            Designed & Developed with &#10084; by{" "}
            <Link
              href="https://ujjawalshrestha.com.np"
              target="_blank"
              className="animation font-medium underline underline-offset-2 hover:underline-offset-4"
            >
              Ujjawal Shrestha
            </Link>
          </span>
        </Container>
      </div>
    </footer>
  );
};
