import Link from "next/link";
import { Container, Logo, SocialButtons } from ".";

export const Footer = () => {
  return (
    <footer
      className="relative"
      style={{
        background: `url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CjxyZWN0IHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0icmdiYSgxMTksIDMyLCAyMzIsIDApIj48L3JlY3Q+CjxyZWN0IHdpZHRoPSI0Mi40MiIgaGVpZ2h0PSI0Mi40MiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzAgMCkgcm90YXRlKDQ1KSIgZmlsbD0icmdiYSgxMjgsIDEwOCwgMjAzLCAwLjA1KSI+PC9yZWN0Pgo8L3N2Zz4=")`,
      }}
    >
      <div className="absolute inset-0 -top-5 bg-gradient-to-r backdrop-blur-sm" />

      <Container className="relative py-8">
        <div className="mb-4">
          <Logo />
          <p className="mt-1">The man on a mission</p>
        </div>
        <SocialButtons />
      </Container>
      <div className="relative rounded-t-xl border-t bg-accent1 text-center text-[#f7f7f7] border-secondary-10">
        <Container>
          <span className="text-xs">
            Designed & Developed with &#10084; by{" "}
            <Link
              href="https://ujjawalshrestha.com.np"
              target="_blank"
              className="animation underline underline-offset-2 hover:underline-offset-4"
            >
              Ujjawal Shrestha
            </Link>
          </span>
        </Container>
      </div>
    </footer>
  );
};
