/* eslint-disable tailwindcss/no-custom-classname */
import Link from "next/link";
import { ThemeToggle } from ".";
import { Container } from "./Container";
import { Logo } from "./Logo";

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 bg-background">
      <Container className="flex items-center justify-between">
        <Logo />
        <nav className="flex items-center gap-x-4">
          <ul>
            <li>
              <Link
                href={`/`}
                className="animation tracking-wide underline-offset-0 hover:text-accent1 hover:underline hover:underline-offset-4"
              >
                Blog
              </Link>
            </li>
          </ul>
          <ThemeToggle />
        </nav>
      </Container>
    </header>
  );
};
