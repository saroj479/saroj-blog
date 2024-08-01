/* eslint-disable tailwindcss/no-custom-classname */
import Link from "next/link";
import { ThemeToggle } from ".";
import { Container } from "./Container";
import { Logo } from "./Logo";

export const Navbar = () => {
  return (
    <header>
      <Container className="flex items-center justify-between">
        <Logo />
        <nav className="flex items-center gap-x-4">
          <ul>
            <li>
              <Link href={`/`}>Blog</Link>
            </li>
          </ul>
          <ThemeToggle />
        </nav>
      </Container>
    </header>
  );
};
